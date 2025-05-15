"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import type { MCQQuestion } from "@/lib/gemini";

export default function PracticePage() {
  const [topic, setTopic] = useState("");
  const [questions, setQuestions] = useState<MCQQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleStartQuiz = async () => {
    if (!topic.trim()) return;

    setLoading(true);
    try {
      const response = await fetch("/api/interview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "generateMCQQuestions",
          data: { topic },
        }),
      });
      const mcqQuestions = await response.json();
      setQuestions(mcqQuestions);
      setSelectedAnswers(new Array(mcqQuestions.length).fill(""));
      setCurrentQuestionIndex(0);
      setQuizSubmitted(false);
    } catch (error) {
      console.error("Failed to generate questions:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerSelect = (answer: string) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestionIndex] = answer;
    setSelectedAnswers(newAnswers);
  };

  const handleSubmitQuiz = () => {
    setQuizSubmitted(true);
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach((q, i) => {
      if (q.correctAnswer === selectedAnswers[i]) {
        correct++;
      }
    });
    return (correct / questions.length) * 100;
  };

  if (!questions.length) {
    return (
      <div className="max-w-xl mx-auto p-6 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Practice Quiz</CardTitle>
            <CardDescription>
              Enter a topic to generate quiz questions about it
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              placeholder="Enter topic (e.g., JavaScript, React, Python)"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
            <Button 
              className="w-full" 
              onClick={handleStartQuiz}
              disabled={loading}
            >
              {loading ? "Generating Questions..." : "Start Quiz"}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Quiz: {topic}</h2>
        <span className="text-sm text-gray-500">
          Question {currentQuestionIndex + 1} of {questions.length}
        </span>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{currentQuestion.question}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            {currentQuestion.options.map((option, index) => (
              <Button
                key={index}
                variant={selectedAnswers[currentQuestionIndex] === option ? "default" : "outline"}
                className="w-full justify-start text-left"
                onClick={() => !quizSubmitted && handleAnswerSelect(option)}
                disabled={quizSubmitted}
              >
                {option}
              </Button>
            ))}
          </div>

          {quizSubmitted && (
            <div className="mt-4 p-4 rounded-lg bg-gray-50">
              <p className="font-medium mb-2">
                {selectedAnswers[currentQuestionIndex] === currentQuestion.correctAnswer
                  ? "✅ Correct!"
                  : "❌ Incorrect"}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Correct Answer: </span>
                {currentQuestion.correctAnswer}
              </p>
              <p className="text-sm text-gray-600 mt-2">
                <span className="font-medium">Explanation: </span>
                {currentQuestion.explanation}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-between mt-4">
        <Button
          variant="outline"
          onClick={() => setCurrentQuestionIndex((prev) => prev - 1)}
          disabled={currentQuestionIndex === 0}
        >
          Previous
        </Button>

        {currentQuestionIndex === questions.length - 1 ? (
          <Button
            onClick={handleSubmitQuiz}
            disabled={quizSubmitted || selectedAnswers.some((a) => !a)}
          >
            Submit Quiz
          </Button>
        ) : (
          <Button
            onClick={() => setCurrentQuestionIndex((prev) => prev + 1)}
            disabled={!selectedAnswers[currentQuestionIndex]}
          >
            Next
          </Button>
        )}
      </div>

      {quizSubmitted && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Quiz Results</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Score</span>
                <span className="text-sm font-medium">{calculateScore().toFixed(1)}%</span>
              </div>
              <Progress value={calculateScore()} />
            </div>
            <Button
              className="w-full"
              onClick={() => {
                setQuestions([]);
                setTopic("");
                setSelectedAnswers([]);
                setQuizSubmitted(false);
              }}
            >
              Start New Quiz
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}