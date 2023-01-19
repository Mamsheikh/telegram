import { HiOutlineX } from 'react-icons/hi';
import { Conversation, ConversationType } from '../../../../utils/types';
import UserAvatar from '../../../common/UserAvatar';

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  conversation: Conversation | undefined;
}
const Sidebar: React.FC<SidebarProps> = ({ conversation, open, setOpen }) => {
  return (
    <div className={`${open ? 'inline' : 'hidden'} w-64 bg-gray-100`}>
      <div className='bg-white'>
        <div className='flex items-center justify-between px-4 py-3 '>
          <h4 className='font-semibold'>
            {conversation?.conversationType === ConversationType.CHANNEL &&
              'Channel'}
            {conversation?.conversationType === ConversationType.GROUP &&
              'Group'}{' '}
            Info
          </h4>
          <HiOutlineX
            className='h-5 w-5 text-gray-500 cursor-pointer'
            onClick={() => setOpen(false)}
          />
        </div>
        <div className='flex items-center p-4 mt-4 space-x-5'>
          {conversation && (
            <UserAvatar
              username={conversation.conversationName}
              avatarUrl={conversation.conversationImg}
            />
          )}
          <div className='flex flex-col '>
            <h4 className='font-semibold'>{conversation?.conversationName}</h4>
            <p className='text-sm text-gray-400'>
              {conversation?.participants.length} subscribers
            </p>
          </div>
        </div>
      </div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};
export default Sidebar;
