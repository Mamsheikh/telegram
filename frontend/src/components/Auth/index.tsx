import { Session } from 'next-auth';

interface AuthProps {
  session: Session | null;
  reloadSession: () => void;
}

const Auth: React.FC<AuthProps> = ({ session, reloadSession }) => {
  return (
    <>
      {session ? (
        <div className='h-screen flex justify-center items-center'>
          <h4>Create a username</h4>
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
