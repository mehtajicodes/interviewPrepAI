"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { generateInterviewQuestions } from "@/lib/gemini";

interface Question {
  question: string;
  answer: string;
  explanation: string;
}

interface InterviewParams {
  company: string;
  role: string;
  topic: string;
  experience: string;
}

export default function QuestionsPage() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [params, setParams] = useState<InterviewParams>({
    company: "",
    role: "",
    topic: "",
    experience: "intermediate"
  });

  const handleGenerateQuestions = async () => {
    setIsGenerating(true);
    setError(null);
    try {
      const generatedQuestions = await generateInterviewQuestions(
        params.topic,
        params.experience
      );

      if (!Array.isArray(generatedQuestions) || generatedQuestions.length === 0) {
        throw new Error('Invalid response format from the AI');
      }

      setQuestions(generatedQuestions);
    } catch (error) {
      console.error('Error generating questions:', error);
      setError(error instanceof Error ? error.message : 'Failed to generate questions');
      setQuestions([]);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen w-full overflow-y-auto pb-8">
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-bold">Practice Interviews</h1>
            <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
              Generate company-specific interview questions and practice with detailed solutions.
            </p>
          </div>

          <Card className="w-full">
            <CardHeader>
              <CardTitle>Generate Practice Questions</CardTitle>
              <CardDescription>Enter company and role details to get targeted interview questions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {error && (
                <div className="p-4 text-sm text-red-500 bg-red-50 rounded-md">
                  {error}
                </div>
              )}
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Company Name</label>
                  <Input
                    placeholder="e.g., Google, Amazon, Microsoft"
                    value={params.company}
                    onChange={(e) => setParams(prev => ({ ...prev, company: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Role</label>
                  <Input
                    placeholder="e.g., Frontend Developer, Software Engineer"
                    value={params.role}
                    onChange={(e) => setParams(prev => ({ ...prev, role: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Topic</label>
                  <Input
                    placeholder="e.g., React, System Design, Algorithms"
                    value={params.topic}
                    onChange={(e) => setParams(prev => ({ ...prev, topic: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Experience Level</label>
                  <Select
                    value={params.experience}
                    onValueChange={(value) => setParams(prev => ({ ...prev, experience: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select experience level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner (0-2 years)</SelectItem>
                      <SelectItem value="intermediate">Intermediate (2-5 years)</SelectItem>
                      <SelectItem value="advanced">Advanced (5+ years)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button 
                className="w-full" 
                onClick={handleGenerateQuestions}
                disabled={isGenerating || !params.company || !params.role || !params.topic}
              >
                {isGenerating ? "Generating Questions..." : "Generate Questions"}
              </Button>
            </CardContent>
          </Card>

          {questions.length > 0 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-center">Generated Questions</h2>
              <div className="grid gap-6 max-h-[70vh] overflow-y-auto pr-2">
                {questions.map((q, index) => (
                  <Card key={index} className="w-full">
                    <CardHeader>
                      <CardTitle>Question {index + 1}</CardTitle>
                      <CardDescription>{params.company} {params.role} Interview</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h3 className="font-medium mb-2">Question:</h3>
                        <p className="text-gray-700">{q.question}</p>
                      </div>
                      <div>
                        <h3 className="font-medium mb-2">Answer:</h3>
                        <p className="text-gray-700">{q.answer}</p>
                      </div>
                      <div>
                        <h3 className="font-medium mb-2">Explanation:</h3>
                        <p className="text-gray-700">{q.explanation}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 