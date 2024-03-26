import { NextResponse } from 'next/server';

import { getUserByClerkID, prisma } from '@/lib/utils';
import { generateProblemStatement } from '@/lib/utils/ai';

export const POST = async (request: Request) => {
  const data = await request.json();
  const user = await getUserByClerkID();
  const generatedProblemStatement = await generateProblemStatement(data);

  const entry = await prisma.problem.create({
    data: {
      area: data.problemArea.toUpperCase(),
      createdBy: {
        connect: {
          id: user?.id ?? '',
        },
      },
      difficulty: data.difficulty.toUpperCase(),
      problemStatement: generatedProblemStatement.problemStatement,
      testCases: {
        create: generatedProblemStatement.testCases.map((testCase) => ({
          input: testCase.input,
          output: testCase.output,
        })),
      },
      title: generatedProblemStatement.title,
      type: data.problemType.toUpperCase(),
    },
  });

  return NextResponse.json(entry);
};
