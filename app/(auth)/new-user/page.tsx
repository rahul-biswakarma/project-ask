import { currentUser, redirectToSignIn } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

import { PageRoutes } from '@/lib/constants/routes';
import { prisma } from '@/lib/utils';

const createNewUser = async () => {
  const user = await currentUser();

  if (!user) {
    redirectToSignIn();
  } else {
    const match = await prisma.user.findUnique({
      where: {
        clerkId: user.id,
      },
    });
    if (!match) {
      await prisma.user.create({
        data: {
          clerkId: user.id,
          email: user.emailAddresses[0].emailAddress,
        },
      });
    }
  }
};

const NewUser = async () => {
  createNewUser();
  redirect(PageRoutes.Dashboard);
};

export default NewUser;
