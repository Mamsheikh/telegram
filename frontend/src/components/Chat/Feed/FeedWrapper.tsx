import { useRouter } from 'next/router';

interface FeedWrapperProps {
  setShow: (show: boolean) => void;
}

const FeedWrapper: React.FC<FeedWrapperProps> = ({ setShow }) => {
  const router = useRouter();
  const { conversationId } = router.query;
  return (
    <div
      className='border-green-500 border-2 flex-1'
      onClick={() => setShow(false)}
    >
      {conversationId ? (
        <div>{conversationId}</div>
      ) : (
        <div>no conversation selected</div>
      )}
    </div>
  );
};
export default FeedWrapper;
