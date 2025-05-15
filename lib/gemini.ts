import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "AIzaSyAWSI6sjt5r8mBBtfdU7de--aXRvmXFFBI");

export async function generateInterviewQuestions(category: string, difficulty: string) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
  
  const prompt = `Generate 5 ${difficulty} level interview questions for ${category} position.
    Format each question exactly like this example:
    
    Q1: What is your experience with React?
    A1: I have 3 years of experience with React, including building complex single-page applications and implementing state management with Redux.
    E1: This question tests the candidate's practical experience with React and their ability to communicate their expertise.
    
    Q2: [Next question]
    A2: [Answer]
    E2: [Explanation]
    
    And so on for all 5 questions.`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text().trim();
    
    // Parse the text response into structured format
    const questions = [];
    const lines = text.split('\n');
    let currentQuestion = null;
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line.startsWith('Q')) {
        if (currentQuestion) {
          questions.push(currentQuestion);
        }
        currentQuestion = {
          question: line.substring(line.indexOf(':') + 1).trim(),
          answer: '',
          explanation: ''
        };
      } else if (line.startsWith('A') && currentQuestion) {
        currentQuestion.answer = line.substring(line.indexOf(':') + 1).trim();
      } else if (line.startsWith('E') && currentQuestion) {
        currentQuestion.explanation = line.substring(line.indexOf(':') + 1).trim();
      }
    }
    
    if (currentQuestion) {
      questions.push(currentQuestion);
    }

    // Validate the response
    if (questions.length === 0) {
      throw new Error('No questions were generated');
    }

    // Ensure each question has all required fields
    const validQuestions = questions.filter(q => 
      q.question && q.answer && q.explanation
    );

    if (validQuestions.length === 0) {
      throw new Error('Generated questions are missing required fields');
    }

    return validQuestions;
  } catch (error) {
    console.error('Error in generateInterviewQuestions:', error);
    throw new Error('Failed to generate interview questions. Please try again.');
  }
}

export async function analyzeAnswer(question: string, answer: string) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
  
  const prompt = `Analyze this interview answer:
    Question: ${question}
    Answer: ${answer}
    
    Provide:
    1. A score out of 100
    2. 2-3 strengths
    3. 2-3 areas for improvement
    4. A suggested better answer`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text().trim();
  
  // Parse the text response into structured format
  const lines = text.split('\n');
  const analysis = {
    score: 0,
    strengths: [] as string[],
    improvements: [] as string[],
    suggestedAnswer: ''
  };
  
  let currentSection = '';
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith('1.')) {
      currentSection = 'score';
      const scoreMatch = trimmed.match(/\d+/);
      if (scoreMatch) {
        analysis.score = parseInt(scoreMatch[0]);
      }
    } else if (trimmed.startsWith('2.')) {
      currentSection = 'strengths';
    } else if (trimmed.startsWith('3.')) {
      currentSection = 'improvements';
    } else if (trimmed.startsWith('4.')) {
      currentSection = 'suggested';
    } else if (trimmed && currentSection === 'strengths') {
      analysis.strengths.push(trimmed);
    } else if (trimmed && currentSection === 'improvements') {
      analysis.improvements.push(trimmed);
    } else if (trimmed && currentSection === 'suggested') {
      analysis.suggestedAnswer = trimmed;
    }
  }
  
  return analysis;
}

export async function generateFollowUpQuestion(question: string, answer: string) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
  
  const prompt = `Based on this interview Q&A, generate a relevant follow-up question:
    Question: ${question}
    Answer: ${answer}`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text().trim();
}

export async function getInterviewTips(category: string) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
  
  const prompt = `Provide 5 specific tips for ${category} interviews.
    Format as a simple numbered list.`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text().trim();
  
  // Parse the numbered list into an array
  return text.split('\n')
    .map(line => line.trim())
    .filter(line => line.match(/^\d+\./))
    .map(line => line.replace(/^\d+\.\s*/, ''));
}

export interface MCQQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export async function generateMCQQuestions(topic: string): Promise<MCQQuestion[]> {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
  
  const prompt = `Generate 5 multiple choice questions about ${topic}.
    Format each question exactly like this:
    Q: [Question text]
    A) [Option A]
    B) [Option B]
    C) [Option C]
    D) [Option D]
    Correct: [A/B/C/D]
    E: [Explanation why this is correct]

    Make sure the questions test different aspects of ${topic}.`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text().trim();
    
    const questions: MCQQuestion[] = [];
    const lines = text.split('\n');
    let currentQuestion: Partial<MCQQuestion> = {};
    let options: string[] = [];

    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed.startsWith('Q:')) {
        if (Object.keys(currentQuestion).length > 0) {
          questions.push(currentQuestion as MCQQuestion);
          currentQuestion = {};
          options = [];
        }
        currentQuestion.question = trimmed.substring(2).trim();
      } else if (trimmed.match(/^[A-D]\)/)) {
        options.push(trimmed.substring(2).trim());
        if (options.length === 4) {
          currentQuestion.options = options;
        }
      } else if (trimmed.startsWith('Correct:')) {
        const correctLetter = trimmed.substring(8).trim();
        const index = correctLetter.charCodeAt(0) - 'A'.charCodeAt(0);
        currentQuestion.correctAnswer = options[index];
      } else if (trimmed.startsWith('E:')) {
        currentQuestion.explanation = trimmed.substring(2).trim();
      }
    }

    if (Object.keys(currentQuestion).length > 0) {
      questions.push(currentQuestion as MCQQuestion);
    }

    return questions;
  } catch (error) {
    console.error('Error generating MCQ questions:', error);
    throw new Error('Failed to generate quiz questions');
  }
}