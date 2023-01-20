import { useRouter } from 'next/router';
import { useState } from 'react';
import { HiOutlineX } from 'react-icons/hi';
import { Conversation } from '../../../utils/types';
import Header from './Messages/Header';
import Sidebar from './Messages/Sidebar';
import Input from './Messages/Input';
import Messages from './Messages/Messages';
import { Session } from 'next-auth';

interface FeedWrapperProps {
  setShow: (show: boolean) => void;
  session: Session;
}

const FeedWrapper: React.FC<FeedWrapperProps> = ({ setShow, session }) => {
  const [conversation, setConversation] = useState<Conversation | undefined>();
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { conversationId } = router.query;

  return (
    <>
      <div className=' flex-1' onClick={() => setShow(false)}>
        {conversationId && typeof conversationId === 'string' ? (
          <>
            <div className='flex flex-col h-screen '>
              <Header
                // conversation={data?.conversation}
                setConversation={setConversation}
                open={open}
                setOpen={setOpen}
              />
              {/* )} */}
              <div
                className='h-screen overflow-hidden overflow-y-auto px-4 py-2'
                style={{
                  backgroundImage: 'url(images/peakpx.jpg)',
                  objectFit: 'cover',
                  backgroundSize: 'contain',
                }}
              >
                <Messages
                  conversationId={conversationId}
                  userId={session.user.id}
                />
              </div>
              <Input session={session} conversationId={conversationId} />
            </div>
          </>
        ) : (
          <div
            className='h-screen flex items-center justify-center'
            style={{
              backgroundImage: 'url(images/peakpx.jpg)',
              objectFit: 'cover',
              backgroundSize: 'contain',
            }}
          >
            <h4 className='text-white bg-black bg-opacity-20 text-sm px-3 py-1 rounded-full'>
              Select a chat or start messaging
            </h4>
          </div>
        )}
      </div>
      <Sidebar open={open} setOpen={setOpen} conversation={conversation} />
    </>
  );
};
export default FeedWrapper;
