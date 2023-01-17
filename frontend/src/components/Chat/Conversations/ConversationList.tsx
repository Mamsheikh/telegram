import { FcMenu } from 'react-icons/fc';
import {
  ConversationPopulated,
  Conversation,
  ConversationsData,
} from '../../../utils/types';
import ConversationItem from './ConversationItem';

interface ConversationListProps {
  setShow: (show: boolean) => void;
  conversations: Conversation[];
}

const ConversationList: React.FC<ConversationListProps> = ({
  setShow,
  conversations,
}) => {
  return (
    <div>
      <div className='flex items-center px-4 py-3 space-x-4'>
        <FcMenu
          className='h-8 w-8 text-gray-200 cursor-pointer'
          onClick={() => setShow(true)}
        />
        <input
          type='text'
          placeholder='Search'
          className='w-full px-4 py-1 rounded  bg-gray-100 focus:outline-none focus:border-sky-500 border-1 focus:ring-sky-500 focus:ring-1 sm:text-sm'
        />
      </div>
      <div className='space-y-4'>
        {conversations.map((conversation, i) => (
          <ConversationItem key={i} conversation={conversation} />
        ))}
      </div>
    </div>
  );
};
export default ConversationList;
