import { NextResponse } from 'next/server';

import { prisma } from '@/lib/utils';

export const POST = async (request: Request) => {
  const { id } = await request.json();

  const problemObject = await prisma.problem.findUnique({
    where: {
      id,
    },
  });

  return NextResponse.json(problemObject);
};
