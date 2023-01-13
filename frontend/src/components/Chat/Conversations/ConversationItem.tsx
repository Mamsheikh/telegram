import { HiSpeakerphone, HiUsers } from 'react-icons/hi';
import { Conversation, ConversationType } from '../../../utils/types';

interface ConversationItemProps {
  conversation: Conversation;
}

const ConversationItem: React.FC<ConversationItemProps> = ({
  conversation,
}) => {
  return (
    <div className='flex justify-between items-center hover:bg-gray-100 px-4 py-2 cursor-pointer'>
      <div className='flex'>
        <div className='mr-4'>
          {conversation.conversationImg ? (
            <img
              className='h-12 w-12 rounded-full'
              src={conversation.conversationImg}
              alt=''
            />
          ) : (
            <div className='relative inline-flex items-center justify-center w-12 h-12 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600'>
              <span className='uppercase font-medium text-gray-600 dark:text-gray-300'>
                {conversation.conversationName[0]}
              </span>
            </div>
          )}
        </div>
        <div className='flex flex-col'>
          <h4 className='font-semibold flex items-center'>
            {conversation.conversationType === ConversationType.CHANNEL && (
              <HiSpeakerphone className='mr-2' />
            )}
            {conversation.conversationType === ConversationType.GROUP && (
              <HiUsers className='mr-2' />
            )}
            {conversation.conversationName}
          </h4>
          <p className='text-xs mt-2 text-gray-400'>Binance academy</p>
        </div>
      </div>
      <div className='h-5 w-5 rounded-full bg-telegram-blue'>
        <span className='text-white text-xs flex justify-center'>2</span>
      </div>
    </div>
  );
};
export default ConversationItem;