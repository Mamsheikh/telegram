import { useMutation, useQuery } from '@apollo/client';
import { Session } from 'next-auth';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { userOperations } from '../../graphql/operations/user';
import { CreateUsernameData, CreateUsernameVariables } from '../../utils/types';
import toast from 'react-hot-toast';

interface AuthProps {
  session: Session | null;
  reloadSession: () => void;
}

const Auth: React.FC<AuthProps> = ({ session, reloadSession }) => {
  const [username, setUsername] = useState('');
  const [createUsername, { loading, error }] = useMutation<
    CreateUsernameData,
    CreateUsernameVariables
  >(userOperations.Mutations.createUsername);
  const onSubmit = async () => {
    if (!username) return;

    const { data } = await createUsername({
      variables: { username },
    });
    try {
      if (!data?.createUsername) {
        throw new Error();
      }

      if (data.createUsername.error) {
        const {
          createUsername: { error },
        } = data;
        throw new Error(error);
      }

      toast.success('Username successfully created');
      reloadSession();
    } catch (error: any) {
      console.log('onSubmit create username error', error);
      toast.error(error.message);
    }
  };
  return (
    <>
      {session ? (
        <div className='h-screen flex justify-center items-center flex-col space-y-4'>
          <h4 className='text-gray-600  text-3xl font-wide mb-4'>
            Create a username
          </h4>
          <input
            type='text'
            onChange={(event) => setUsername(event.target.value)}
            placeholder='Enter a username'
            className='px-4 py-2 rounded  border max-w-xs w-full focus:outline-none border-gray-200'
          />
          <button
            onClick={onSubmit}
            className='shadow-md max-w-xs w-full flex justify-center items-center bg-telegram-blue hover:bg-telegram-blue/90 rounded px-4 py-1 text-white font-semibold'
          >
            {loading ? (
              <svg
                className='animate-spin -ml-1 mr-3 h-5 w-5 text-white'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
              >
                <circle
                  className='opacity-25'
                  cx='12'
                  cy='12'
                  r='10'
                  stroke='currentColor'
                  strokeWidth='4'
                ></circle>
                <path
                  className='opacity-75'
                  fill='currentColor'
                  d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                ></path>
              </svg>
            ) : (
              <p>Save</p>
            )}
          </button>
        </div>
      ) : (
        <div>
          <div>
            <img src='images/tele.png' alt='tele' />
            <div className='flex flex-col items-center mt-10 pt-10 justify-center'>
              <h4 className='text-3xl tracking-wide mb-4'>Telegram</h4>
              <p className='text-gray-500 font-small'>
                Welcome the the clone Telegram app.
              </p>
              <p className='text-gray-500 font-small'>
                It&apos;s fast and secure.
              </p>
              <button
                onClick={() => signIn('google')}
                type='button'
                className='text-white max-w-xs mt-8 w-full flex items-center justify-center bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center  dark:focus:ring-[#4285F4]/55 mr-2 mb-2'
              >
                <svg
                  className='mr-2 -ml-1 w-4 h-4'
                  aria-hidden='true'
                  focusable='false'
                  data-prefix='fab'
                  data-icon='google'
                  role='img'
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 488 512'
                >
                  <path
                    fill='currentColor'
                    d='M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z'
                  ></path>
                </svg>
                Sign in with Google
              </button>
            </div>
          </div>
        </div>
      )}
    </>
    // <div className='h-screen flex justify-center items-center border-2 border-red-500'>
    //   {session ? (
    //     <h4>Create a username</h4>
    //   ) : (
    //     <div>
    //       <div>
    //         <img src='images/tele.png' alt='image' />
    //       </div>
    //       <div className='flex flex-col items-center space-y-4'>
    //         <h4 className=' text-4xl'>Telegram</h4>
    //         <button className='px-4 py-3 text-white bg-telegram-blue rounded'>
    //           Continue with Google
    //         </button>
    //       </div>
    //     </div>
    //   )}
    // </div>
  );
};
export default Auth;
