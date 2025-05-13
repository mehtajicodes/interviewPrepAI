interface InterviewSession {
  id: string;
  date: string;
  category: string;
  questions: {
    question: string;
    answer: string;
    analysis: {
      score: number;
      strengths: string[];
      improvements: string[];
      suggestedAnswer: string;
    };
  }[];
}

interface Question {
  id: string;
  question: string;
  category: string;
  difficulty: string;
  expectedAnswer: string;
}

export const storage = {
  // Interview Sessions
  saveSession: (session: InterviewSession) => {
    const sessions = storage.getSessions();
    sessions.push(session);
    localStorage.setItem('interview_sessions', JSON.stringify(sessions));
  },

  getSessions: (): InterviewSession[] => {
    const sessions = localStorage.getItem('interview_sessions');
    return sessions ? JSON.parse(sessions) : [];
  },

  // Questions Bank
  saveQuestion: (question: Question) => {
    const questions = storage.getQuestions();
    questions.push(question);
    localStorage.setItem('questions', JSON.stringify(questions));
  },

  getQuestions: (): Question[] => {
    const questions = localStorage.getItem('questions');
    return questions ? JSON.parse(questions) : [];
  },

  // Performance Analytics
  getPerformanceStats: () => {
    const sessions = storage.getSessions();
    const stats = {
      totalSessions: sessions.length,
      averageScore: 0,
      categoryScores: {} as Record<string, { total: number; count: number }>,
      recentImprovements: [] as string[],
    };

    sessions.forEach(session => {
      session.questions.forEach(q => {
        // Calculate average score
        stats.averageScore += q.analysis.score;
        
        // Track category scores
        if (!stats.categoryScores[session.category]) {
          stats.categoryScores[session.category] = { total: 0, count: 0 };
        }
        stats.categoryScores[session.category].total += q.analysis.score;
        stats.categoryScores[session.category].count += 1;

        // Track recent improvements
        stats.recentImprovements.push(...q.analysis.improvements);
      });
    });

    // Calculate final averages
    const totalQuestions = sessions.reduce((acc, session) => acc + session.questions.length, 0);
    stats.averageScore = totalQuestions > 0 ? stats.averageScore / totalQuestions : 0;

    // Calculate category averages
    Object.keys(stats.categoryScores).forEach(category => {
      const { total, count } = stats.categoryScores[category];
      stats.categoryScores[category] = {
        total: count > 0 ? total / count : 0,
        count
      };
    });

    return stats;
  }
}; 