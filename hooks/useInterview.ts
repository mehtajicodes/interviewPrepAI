import { useState } from "react";

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

export function useInterview() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateQuestions = async (category: string, difficulty: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/interview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "generateQuestions",
          data: { category, difficulty },
        }),
      });
      const data = await response.json();
      return data as Question[];
    } catch (err) {
      setError("Failed to generate questions");
      return [];
    } finally {
      setLoading(false);
    }
  };

  const analyzeAnswer = async (question: string, answer: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/interview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "analyzeAnswer",
          data: { question, answer },
        }),
      });
      const data = await response.json();
      return data as Analysis;
    } catch (err) {
      setError("Failed to analyze answer");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const generateFollowUp = async (question: string, answer: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/interview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "generateFollowUp",
          data: { question, answer },
        }),
      });
      const data = await response.json();
      return data.followUp as string;
    } catch (err) {
      setError("Failed to generate follow-up question");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const getTips = async (category: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/interview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "getTips",
          data: { category },
        }),
      });
      const data = await response.json();
      return data as string[];
    } catch (err) {
      setError("Failed to get interview tips");
      return [];
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    generateQuestions,
    analyzeAnswer,
    generateFollowUp,
    getTips,
  };
} 