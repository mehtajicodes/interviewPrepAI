"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useInterview } from "@/hooks/useInterview";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { storage } from "@/lib/storage";
import { v4 as uuidv4 } from "uuid";

interface Question {
  question: string;
  category: string;
  difficulty: string;
  expectedAnswer: string;
}

interface Analysis {
  score: number;
  strengths: string[];
  improvements: string[];
  suggestedAnswer: string;
}

export default function PracticePage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [answer, setAnswer] = useState("");
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [followUpQuestion, setFollowUpQuestion] = useState<string | null>(null);
  const [sessionQuestions, setSessionQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const { loading, error, generateQuestions, analyzeAnswer, generateFollowUp } = useInterview();

  const startPractice = async (category: string) => {
    setSelectedCategory(category);
    const questions = await generateQuestions(category, "intermediate");
    if (questions.length > 0) {
      setSessionQuestions(questions);
      setCurrentQuestion(questions[0]);
      setCurrentQuestionIndex(0);
    }
  };

  const submitAnswer = async () => {
    if (!currentQuestion) return;
    
    const analysis = await analyzeAnswer(currentQuestion.question, answer);
    setAnalysis(analysis);

    const followUp = await generateFollowUp(currentQuestion.question, answer);
    setFollowUpQuestion(followUp);

    // Save to local storage only if we have analysis
    if (analysis) {
      const session = {
        id: uuidv4(),
        date: new Date().toISOString(),
        category: selectedCategory!,
        questions: [{
          question: currentQuestion.question,
          answer,
          analysis
        }]
      };
      storage.saveSession(session);
    }
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < sessionQuestions.length - 1) {
      const nextIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIndex);
      setCurrentQuestion(sessionQuestions[nextIndex]);
      setAnswer("");
      setAnalysis(null);
      setFollowUpQuestion(null);
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">Practice Interviews</h1>
        <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
          Choose from our selection of interview types to start practicing. Each simulation is powered by AI to provide a realistic experience.
        </p>
      </div>

      {!selectedCategory ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Technical Interview</CardTitle>
              <CardDescription>
                Practice coding challenges and technical problem-solving questions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" onClick={() => startPractice("technical")}>
                Start Practice
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Behavioral Interview</CardTitle>
              <CardDescription>
                Work on your soft skills and situational response abilities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" onClick={() => startPractice("behavioral")}>
                Start Practice
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>System Design</CardTitle>
              <CardDescription>
                Practice designing scalable systems and architecture discussions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" onClick={() => startPractice("system-design")}>
                Start Practice
              </Button>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="max-w-3xl mx-auto space-y-6">
          {currentQuestion && (
            <Card>
              <CardHeader>
                <CardTitle>Question {currentQuestionIndex + 1} of {sessionQuestions.length}</CardTitle>
                <CardDescription>{currentQuestion.category} • {currentQuestion.difficulty}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-lg">{currentQuestion.question}</p>
                <Textarea
                  placeholder="Type your answer here..."
                  value={answer}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setAnswer(e.target.value)}
                  className="min-h-[200px]"
                />
                <div className="flex gap-2">
                  <Button onClick={submitAnswer} disabled={loading}>
                    Submit Answer
                  </Button>
                  {analysis && currentQuestionIndex < sessionQuestions.length - 1 && (
                    <Button onClick={nextQuestion} variant="outline">
                      Next Question
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {analysis && (
            <Card>
              <CardHeader>
                <CardTitle>Analysis</CardTitle>
                <CardDescription>Your answer feedback</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Score</span>
                    <span className="text-sm font-medium">{analysis.score}%</span>
                  </div>
                  <Progress value={analysis.score} />
                </div>
                <div>
                  <h4 className="font-medium mb-2">Strengths</h4>
                  <ul className="list-disc list-inside text-sm text-gray-500 space-y-1">
                    {analysis.strengths.map((strength: string, index: number) => (
                      <li key={index}>{strength}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Areas for Improvement</h4>
                  <ul className="list-disc list-inside text-sm text-gray-500 space-y-1">
                    {analysis.improvements.map((improvement: string, index: number) => (
                      <li key={index}>{improvement}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Suggested Answer</h4>
                  <p className="text-sm text-gray-500">{analysis.suggestedAnswer}</p>
                </div>
              </CardContent>
            </Card>
          )}

          {followUpQuestion && (
            <Card>
              <CardHeader>
                <CardTitle>Follow-up Question</CardTitle>
                <CardDescription>Based on your previous answer</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-lg">{followUpQuestion}</p>
              </CardContent>
            </Card>
          )}

          <Button
            variant="outline"
            onClick={() => {
              setSelectedCategory(null);
              setCurrentQuestion(null);
              setAnswer("");
              setAnalysis(null);
              setFollowUpQuestion(null);
              setSessionQuestions([]);
              setCurrentQuestionIndex(0);
            }}
          >
            Start New Practice
          </Button>
        </div>
      )}
    </div>
  );
} 