import type { NextPage } from 'next';
import { signIn, useSession } from 'next-auth/react';
const Home: NextPage = () => {
  const { data } = useSession();
  console.log(data);

  return (
    <div className='h-screen mx-auto'>
      <button
        className='px-4 py-6 bg-blue-500'
        onClick={() => signIn('google')}
      >
        SignIn
      </button>
    </div>
  );
};

export default Home;
