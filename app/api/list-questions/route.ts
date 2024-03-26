import { NextResponse } from 'next/server';

import { ListQuestionsRequest } from '@/lib/types';
import { prisma } from '@/lib/utils';

export const POST = async (request: Request) => {
  const { problemType, problemArea, difficulty, page = 1, pageSize = 10 } = await request.json();

  const skip = (page - 1) * pageSize;

  const where: ListQuestionsRequest = {};
  if (problemType) where.problemType = problemType;
  if (problemArea) where.problemArea = problemArea;
  if (difficulty) where.difficulty = difficulty;

  const [entries, totalCount] = await prisma.$transaction([
    prisma.problem.findMany({
      skip,
      take: pageSize,
      where,
    }),
    prisma.problem.count({
      where,
    }),
  ]);

  return NextResponse.json({ data: entries, totalCount });
};
