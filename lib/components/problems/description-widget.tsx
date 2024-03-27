import { Problem, ProblemArea, ProblemDifficulty, ProblemType } from '@prisma/client';
import React from 'react';

import { Badge } from '../ui/badge';

interface ProblemDescriptionWidgetProps {
  problemStatement: string;
}

export const ProblemDescriptionWidget = () => {
  const problem: Problem = {
    area: ProblemArea.BASIC,
    createdAt: new Date(),
    creatorId: 'hlsh',
    difficulty: ProblemDifficulty.MEDIUM,
    hint: ['hstn', 'thh', 'hhjl'],
    id: 'problemId',
    problemStatement: 'shsioio',
    title: 'Largest substring of the Array',
    type: ProblemType.ARRAY,
    updatedAt: new Date(),
  };

  return (
    <div className="w-full space-y-6 px-4 py-6">
      <div className="space-y-3">
        <h1 className="text-2xl font-bold tracking-tight">{problem.title}</h1>
        <div className="flex gap-2">
          <Badge variant="outline">{problem.type}</Badge>
          <Badge variant="outline">{problem.difficulty}</Badge>
          <Badge variant="outline">{problem.area}</Badge>
        </div>
        <p className="text-gray-500 pt-3">{problem.problemStatement}</p>
      </div>
    </div>
  );
};
