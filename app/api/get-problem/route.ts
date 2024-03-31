import { NextResponse } from 'next/server';

import { prisma } from '@/lib/utils';

export const POST = async (request: Request) => {
  const { id } = await request.json();

  const problemObject = await prisma.problem.findUnique({
    include: {
      testCases: true,
    },
    where: {
      id,
    },
  });

  return NextResponse.json(problemObject);
};
