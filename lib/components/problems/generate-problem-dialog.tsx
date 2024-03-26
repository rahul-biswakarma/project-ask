'use client';

import { ProblemArea, ProblemDifficulty, ProblemType } from '@prisma/client';
import { PlusIcon } from '@radix-ui/react-icons';
import React from 'react';
import { toast } from 'sonner';

import { Button } from '@/lib/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/lib/components/ui/dialog';
import { Label } from '@/lib/components/ui/label';
import { ApiRoutes } from '@/lib/constants/routes';
import { useAxiosMutation } from '@/lib/hooks';
import { CreateProblemRequest, CreateProblemResponse } from '@/lib/types';
import { enumToOptions } from '@/lib/utils';

import { Combobox } from '../ui/combobox';

export const GenerateProblemDialog = () => {
  const [problemType, setProblemType] = React.useState<ProblemType>();
  const [problemArea, setQuestionArea] = React.useState<ProblemArea>();
  const [problemDifficulty, setProblemDifficulty] = React.useState<ProblemDifficulty>();

  const {
    error: createProblemError,
    loading: isCreating,
    execute: createProblemStatement,
  } = useAxiosMutation<CreateProblemResponse, CreateProblemRequest>(ApiRoutes.CreateProblem);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="gap-2" variant="outline">
          <PlusIcon />
          <span className="text-sm">Create Question</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Customized Problem Statement</DialogTitle>
          <DialogDescription>Make changes to your profile here. Click save when done.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4 text-sm">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right" htmlFor="name">
              Type
            </Label>
            <Combobox
              defaultButtonLabel={'Select question type'}
              notFoundLabel={'No match found'}
              onChange={(value) => {
                setProblemType(value as ProblemType);
              }}
              options={enumToOptions(ProblemType)}
              searchLabel={'Search types'}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right" htmlFor="username">
              Difficulty
            </Label>
            <Combobox
              defaultButtonLabel={'Select difficulty'}
              notFoundLabel={'No match found'}
              onChange={(value) => {
                setProblemDifficulty(value as ProblemDifficulty);
              }}
              options={enumToOptions(ProblemDifficulty)}
              searchLabel={'Search types'}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right" htmlFor="username">
              Field
            </Label>
            <Combobox
              defaultButtonLabel={'Select field'}
              notFoundLabel={'No match found'}
              onChange={(value) => {
                setQuestionArea(value as ProblemArea);
              }}
              options={enumToOptions(ProblemArea)}
              searchLabel={'Search types'}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            className="text-sm"
            disabled={!problemType || !problemDifficulty || !problemArea}
            onClick={async () => {
              if (problemType && problemDifficulty && problemArea) {
                toast.info('Creating Problem Statement', {
                  description: 'Summoning our top-tier AI to whip up a fresh problem statement just for you',
                });
                const response = await createProblemStatement({
                  data: { difficulty: problemDifficulty, problemArea: problemArea, problemType: problemType },
                });
                if (response?.data?.id) {
                  toast.success('Problem Statement Created', {
                    description: 'Your problem statement has been created and is ready for use',
                  });
                } else {
                  toast.error('Problem Statement Creation Failed', {
                    description: 'We were unable to create your problem statement',
                  });
                }
              }
            }}
            size="sm"
            type="submit"
          >
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
