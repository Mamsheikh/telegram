import { formatRelative } from 'date-fns';
import enUS from 'date-fns/locale/en-US';
import { MessagePopulated } from '../../../../utils/types';
import UserAvatar from '../../../common/UserAvatar';

interface MessageItemProps {
  message: MessagePopulated;
  sentByMe: boolean;
}

const formatRelativeLocale = {
  lastWeek: "eeee 'at' p",
  yesterday: "'Yesterday at' p",
  today: 'p',
  other: 'MM/dd/yy',
};

const SenderBubble = ({ message }: { message: MessagePopulated }) => {
  return (
    <div className='chat chat-start'>
      <div className='chat-image'>
        <UserAvatar
          username={message.sender.username as string}
          avatarUrl={message.sender.image as string}
        />
      </div>
      <div className='chat-bubble bg-teal-50 px-3 py-1 text-black flex flex-col max-w-md'>
        <span className='font-semibold text-telegram-blue'>
          {message.sender.username}
        </span>
        <span className='leading-tight'>{message.body}</span>
        <div className='flex justify-end'>
          <span className='text-xs text-gray-400'>
            {formatRelative(message.createdAt, new Date(), {
              locale: {
                ...enUS,
                formatRelative: (token) =>
                  formatRelativeLocale[
                    token as keyof typeof formatRelativeLocale
                  ],
              },
            })}
          </span>
        </div>
      </div>
    </div>
  );
};
const ReceiverBubble = ({ message }: { message: MessagePopulated }) => {
  return (
    <div className='chat chat-end'>
      <div className='chat-bubble bg-green-200 px-3 py-1 text-black max-w-md leading-normal'>
        <span className='leading-tight'>{message.body}</span>
        <div className='flex justify-end'>
          <span className='text-xs text-gray-400'>
            {formatRelative(message.createdAt, new Date(), {
              locale: {
                ...enUS,
                formatRelative: (token) =>
                  formatRelativeLocale[
                    token as keyof typeof formatRelativeLocale
                  ],
              },
            })}
          </span>
        </div>
      </div>
    </div>
  );
};

const MessageItem: React.FC<MessageItemProps> = ({ message, sentByMe }) => {
  //   console.log({ message, sentByMe });

  return (
    <>
      {!sentByMe ? (
        <SenderBubble message={message} />
      ) : (
        <ReceiverBubble message={message} />
      )}
    </>
  );
};
export default MessageItem;
