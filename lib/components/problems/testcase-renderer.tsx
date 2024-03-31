import { TestCase } from '@prisma/client';

interface TestCaseRendererProps {
  testCase: TestCase[];
  title: string;
}

export const TestCaseRenderer = ({ testCase, title }: TestCaseRendererProps) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">{title}</h2>
      {testCase.map((test, index) => (
        <div key={index} className="space-y-2">
          <h3 className="text-lg font-semibold">Test {index + 1}</h3>
          <div>
            <h4 className="text-base font-semibold">Input</h4>
            <pre className="rounded-md bg-gray-100 p-4">{test.input}</pre>
          </div>
          <div>
            <h4 className="text-base font-semibold">Output</h4>
            <pre className="rounded-md bg-gray-100 p-4">{test.output}</pre>
          </div>
        </div>
      ))}
    </div>
  );
};
