import { OpenAI } from 'langchain/llms/openai';
import { StructuredOutputParser } from 'langchain/output_parsers';
import { PromptTemplate } from 'langchain/prompts';
import z from 'zod';

import { CreateProblemRequest } from '@/lib/types';

const parser = StructuredOutputParser.fromZodSchema(
  z.object({
    problemStatement: z
      .string()
      .describe(
        'a dsa problem statement with example, should have detailed description and examples for what user has to code. Narrate the problem statement like a story, make it interesting and engaging for the user to read and understand the problem statement easily',
      ),
    testCases: z
      .array(
        z
          .object({
            input: z.string(),
            output: z.string(),
          })
          .describe('input is what function should take and output is expected output.'),
      )
      .describe('7 test cases for the problem statement also add edge cases.'),
    title: z.string().describe('a short title of the problem statement.'),
  }),
);

const getPrompt = async ({ difficulty, problemType, problemArea }: CreateProblemRequest) => {
  const format_instructions = parser.getFormatInstructions();
  const prompt = new PromptTemplate({
    inputVariables: ['entry'],
    partialVariables: { format_instructions },
    template:
      'generate a data structure and algorithm problem statement, and format your response as a JSON stringified string also match the format instructions, no matter what! \n{format_instructions} \n{entry}',
  });

  const input = await prompt.format({
    entry: `problem statement of difficulty ${difficulty}, related to ${problemArea} field, focusing on ${problemType}`,
  });

  return input;
};

export const generateProblemStatement = async (props: CreateProblemRequest) => {
  const input = await getPrompt(props);

  const model = new OpenAI({
    modelName: 'gpt-3.5-turbo',
    temperature: 0,
  });

  const result = await model.invoke(input);

  return parser.parse(result);
};
