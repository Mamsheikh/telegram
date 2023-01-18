import { useRouter } from 'next/router';
import Header from './Messages/Header';

interface FeedWrapperProps {
  setShow: (show: boolean) => void;
}

const FeedWrapper: React.FC<FeedWrapperProps> = ({ setShow }) => {
  const router = useRouter();
  const { conversationId } = router.query;
  return (
    <div className=' flex-1' onClick={() => setShow(false)}>
      {conversationId ? (
        <>
          <div className='flex flex-col h-screen'>
            <Header />
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
        <div>no conversation selected</div>
      )}
    </div>
  );
};
export default FeedWrapper;
