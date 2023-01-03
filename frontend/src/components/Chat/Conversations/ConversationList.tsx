import { FcMenu } from 'react-icons/fc';

interface ConversationListProps {
  setShow: (show: boolean) => void;
}

const ConversationList: React.FC<ConversationListProps> = ({ setShow }) => {
  return (
    <div className='flex items-center px-4 py-3 space-x-4'>
      <FcMenu className='h-8 w-8 text-gray-200' onClick={() => setShow(true)} />
      <input
        type='text'
        placeholder='Search'
        className='w-full px-4 py-1 rounded border-2 bg-gray-100'
      />
    </div>
  );
};
export default ConversationList;
