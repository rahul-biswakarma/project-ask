import { SignIn } from '@clerk/nextjs';

import { PageRoutes } from '@/lib/constants/routes';

const SignUpPage = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <SignIn redirectUrl={PageRoutes.NewUser} />
    </div>
  );
};

export default SignUpPage;
