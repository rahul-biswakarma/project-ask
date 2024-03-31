import { Problem, ProblemArea, ProblemDifficulty, ProblemType, TestCase } from '@prisma/client';

export interface ListQuestionsRequest {
  problemType?: ProblemType;
  problemArea?: ProblemArea;
  difficulty?: ProblemDifficulty;
}

export interface ListQuestionsResponse {
  data: Problem[];
  totalCount: number;
}

export interface CreateProblemRequest {
  difficulty: ProblemDifficulty;
  problemType: ProblemType;
  problemArea: ProblemArea;
}

export interface CreateProblemResponse extends Problem {}

export interface GetProblemRequest {
  id: string;
}

export interface GetProblemResponse extends Problem {
  testCases: TestCase[];
}
