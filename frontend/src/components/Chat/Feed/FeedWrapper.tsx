import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
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

  const ref = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }, [ref]);

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
                ref={ref}
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
                  // onNewMessage={() => {
                  //   if (ref.current) {
                  //     ref.current.scrollTop = ref.current.scrollHeight;
                  //   }
                  // }}
                  scrollToBottom={scrollToBottom}
                />
                <div ref={messagesEndRef} />
              </div>
              <Input
                session={session}
                conversationId={conversationId}
                onNewMessage={() => {
                  if (ref.current) {
                    ref.current.scrollTop = ref.current.scrollHeight;
                  }
                }}
              />
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
