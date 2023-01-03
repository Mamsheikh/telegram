interface FeedWrapperProps {
  setShow: (show: boolean) => void;
}

const FeedWrapper: React.FC<FeedWrapperProps> = ({ setShow }) => {
  return (
    <div
      className='border-green-500 border-2 flex-1'
      onClick={() => setShow(false)}
    >
      Feed Wrapper
    </div>
  );
};
export default FeedWrapper;
