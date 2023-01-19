import { HiSpeakerphone, HiUsers } from 'react-icons/hi';
import { formatRelative } from 'date-fns';
import enUS from 'date-fns/locale/en-US';
import { Conversation, ConversationType } from '../../../utils/types';
import UserAvatar from '../../common/UserAvatar';

interface ConversationItemProps {
  conversation: Conversation;
  onClick: () => void;
  isSelected: boolean;
  userId: string;
}

const formatRelativeLocale = {
  lastWeek: 'eeee',
  yesterday: "'Yesterday",
  today: 'p',
  other: 'MM/dd/yy',
};

const ConversationItem: React.FC<ConversationItemProps> = ({
  conversation,
  onClick,
  isSelected,
  userId,
}) => {
  const handleClick = (event: React.MouseEvent) => {
    if (event.type === 'click') {
      onClick();
    } else if (event.type === 'contextmenu') {
      event.preventDefault();
      // setMenuOpen(true);
    }
  };

  return (
    <div
      onClick={handleClick}
      onContextMenu={handleClick}
      className={`flex justify-between items-center  ${
        isSelected && 'bg-telegram-blue text-white'
      }  px-4 py-2 cursor-pointer ${!isSelected && 'hover:bg-gray-100'}`}
    >
      <div className='flex'>
        <div className='mr-4'>
          <UserAvatar
            avatarUrl={conversation.conversationImg}
            username={conversation.conversationName}
          />
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
          <p
            className={`text-xs mt-2 ${
              isSelected ? 'text-white' : 'text-gray-400'
            } `}
          >
            Binance academy
          </p>
        </div>
      </div>
      <div className='flex flex-col items-center'>
        <span className={`text-sm mb-2 ${isSelected && 'text-white'}`}>
          {formatRelative(new Date(conversation.updatedAt), new Date(), {
            locale: {
              ...enUS,
              formatRelative: (token) =>
                formatRelativeLocale[
                  token as keyof typeof formatRelativeLocale
                ],
            },
          })}
        </span>
        <div className='h-5 w-5 rounded-full bg-telegram-blue'>
          <span className='text-white text-xs flex justify-center'>2</span>
        </div>
      </div>
    </div>
  );
};
export default ConversationItem;
