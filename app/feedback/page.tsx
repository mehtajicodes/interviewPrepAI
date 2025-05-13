"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { storage } from "@/lib/storage";

interface PerformanceStats {
  totalSessions: number;
  averageScore: number;
  categoryScores: Record<string, { total: number; count: number }>;
  recentImprovements: string[];
}

export default function FeedbackPage() {
  const [stats, setStats] = useState<PerformanceStats | null>(null);

  useEffect(() => {
    const performanceStats = storage.getPerformanceStats();
    setStats(performanceStats);
  }, []);

  if (!stats) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">Performance Analysis</h1>
        <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
          Track your progress and identify areas for improvement based on your interview practice sessions.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Overall Performance</CardTitle>
            <CardDescription>Your average score across all sessions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Average Score</span>
                <span className="text-sm font-medium">{stats.averageScore.toFixed(1)}%</span>
              </div>
              <Progress value={stats.averageScore} />
            </div>
            <p className="text-sm text-gray-500">
              Total Practice Sessions: {stats.totalSessions}
            </p>
          </CardContent>
        </Card>

        {Object.entries(stats.categoryScores).map(([category, { total }]) => (
          <Card key={category}>
            <CardHeader>
              <CardTitle>{category.charAt(0).toUpperCase() + category.slice(1)}</CardTitle>
              <CardDescription>Performance in {category} interviews</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Average Score</span>
                  <span className="text-sm font-medium">{total.toFixed(1)}%</span>
                </div>
                <Progress value={total} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Areas for Improvement</CardTitle>
          <CardDescription>Common themes from your practice sessions</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside text-sm text-gray-500 space-y-2">
            {stats.recentImprovements.slice(0, 5).map((improvement, index) => (
              <li key={index}>{improvement}</li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
} 