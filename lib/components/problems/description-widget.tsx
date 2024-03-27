'use client';

import React from 'react';

import { ApiRoutes } from '@/lib/constants/routes';
import { useAxios } from '@/lib/hooks';
import { GetProblemRequest, GetProblemResponse } from '@/lib/types';

import { Badge } from '../ui/badge';

interface ProblemDescriptionWidgetProps {
  problemId: string;
}

export const ProblemDescriptionWidget = ({ problemId }: ProblemDescriptionWidgetProps) => {
  const {
    data: problem,
    error: isProblemError,
    loading: isProblemLoading,
  } = useAxios<GetProblemResponse, GetProblemRequest>({
    data: { id: problemId },
    url: ApiRoutes.GetProblem,
  });
 
  if (isProblemLoading || !problem) return <div>Loading...</div>;

  return (
    <div className="w-full space-y-6 px-4 py-6">
      <div className="space-y-3">
        <h1 className="text-2xl font-bold tracking-tight">{problem.title}</h1>
        <div className="flex gap-2">
          <Badge variant="outline">{problem.type}</Badge>
          <Badge variant="outline">{problem.difficulty}</Badge>
          <Badge variant="outline">{problem.area}</Badge>
        </div>
        <p className="pt-3 text-gray-500">{problem.problemStatement}</p>
      </div>
    </div>
  );
};
