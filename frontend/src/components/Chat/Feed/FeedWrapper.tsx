import { useRouter } from 'next/router';
import Header from './Messages/Header';
import { useState } from 'react';

interface FeedWrapperProps {
  setShow: (show: boolean) => void;
}

const FeedWrapper: React.FC<FeedWrapperProps> = ({ setShow }) => {
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
                conversationId={conversationId}
                open={open}
                setOpen={setOpen}
              />
              <div
                className='h-screen'
                style={{
                  backgroundImage: 'url(images/peakpx.jpg)',
                  objectFit: 'cover',
                  backgroundSize: 'contain',
                }}
              ></div>
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
      <div className={`${open ? 'inline' : 'hidden'}`}>hello wolrd</div>
    </>
  );
};
export default FeedWrapper;
