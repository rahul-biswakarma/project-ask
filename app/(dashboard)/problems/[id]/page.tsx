'use client';

import { CodeEditor, ProblemDescriptionWidget } from '@/lib/components';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/lib/components/ui/resizable';

export default function Page({ params }: { params: { id: string } }) {
  return (
    <div className="h-full px-6 py-4">
      <ResizablePanelGroup className="h-full w-full rounded-lg border" direction="horizontal">
        <ResizablePanel defaultSize={50}>
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel defaultSize={70}>
              <div className="flex h-full px-3 py-1">
                <ProblemDescriptionWidget problemId={params.id} />
              </div>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={30}>
              <div className="flex h-full px-3 py-1">
                <span className="font-semibold">Three</span>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={50}>
          <CodeEditor />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
