import { SignUp } from '@clerk/nextjs';

const SignUpPage = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <SignUp />
    </div>
  );
};

export default SignUpPage;
