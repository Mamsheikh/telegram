import type { NextPage, NextPageContext } from 'next';
import { getSession, signIn, useSession } from 'next-auth/react';
import Auth from '../components/Auth';
import Chat from '../components/Chat';
const Home: NextPage = () => {
  const { data: session } = useSession();
  console.log('session', session);

  const reloadSession = () => {
    const event = new Event('visibilitychange');
    document.dispatchEvent(event);
  };

  return (
    <div>
      {session?.user?.username ? (
        <Chat />
      ) : (
        <Auth session={session} reloadSession={reloadSession} />
      )}
    </div>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}

export default Home;
