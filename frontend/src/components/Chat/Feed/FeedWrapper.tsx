import { useRouter } from 'next/router';
import { useState } from 'react';
import { HiOutlineX } from 'react-icons/hi';
import { Conversation } from '../../../utils/types';
import Header from './Messages/Header';
import Sidebar from './Messages/Sidebar';
import Input from './Messages/Input';

interface FeedWrapperProps {
  setShow: (show: boolean) => void;
}

const FeedWrapper: React.FC<FeedWrapperProps> = ({ setShow }) => {
  const [conversation, setConversation] = useState<Conversation | undefined>();
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { conversationId } = router.query;

  return (
    <>
      <div className=' flex-1' onClick={() => setShow(false)}>
        {conversationId && typeof conversationId === 'string' ? (
          <>
            <div className='flex flex-col h-screen'>
              <Header
                // conversation={data?.conversation}
                setConversation={setConversation}
                open={open}
                setOpen={setOpen}
              />
              {/* )} */}
              <div
                className='h-screen'
                style={{
                  backgroundImage: 'url(images/peakpx.jpg)',
                  objectFit: 'cover',
                  backgroundSize: 'contain',
                }}
              ></div>
              <Input conversationId={conversationId} />
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
            <h4 className='text-white bg-green-500 px-2 rounded-full'>
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
