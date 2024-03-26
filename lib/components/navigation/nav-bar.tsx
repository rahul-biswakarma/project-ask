import { UserButton } from '@clerk/nextjs';

import { GenerateProblemDialog } from '..';
import { Separator } from '../ui/separator';
import { NavMenu } from './nav-menu';

export const NavBar = () => {
  return (
    <div className="h-fit w-full bg-background">
      <nav className="flex items-center justify-between px-6 py-4">
        <NavMenu />
        <div className="flex items-center gap-6">
          <GenerateProblemDialog />
          <UserButton userProfileMode="modal" />
        </div>
      </nav>
      <Separator />
    </div>
  );
};
