import { MessagePopulated } from '../../../../utils/types';
import UserAvatar from '../../../common/UserAvatar';

interface MessageItemProps {
  message: MessagePopulated;
  sentByMe: boolean;
}

const SenderBubble = ({ message }: { message: MessagePopulated }) => {
  return (
    <div className='chat chat-start'>
      <div className='chat-image'>
        <UserAvatar
          username={message.sender.username as string}
          avatarUrl={message.sender.image as string}
        />
      </div>
      {/* <div className='chat-header'>
        {message.sender.username}
        <time className='text-xs opacity-50'>12:45</time>
      </div> */}
      <div className='chat-bubble bg-teal-50 text-black flex flex-col'>
        <span className='font-semibold text-telegram-blue'>
          {message.sender.username}
        </span>
        {message.body}
      </div>
      <div className='chat-footer opacity-50'>Delivered</div>
    </div>
  );
};
const ReceiverBubble = ({ message }: { message: MessagePopulated }) => {
  return (
    <div className='chat chat-end'>
      {/* <div className='chat-image avatar'>
        <UserAvatar
          username={message.sender.username as string}
          avatarUrl={message.sender.image as string}
        />
      </div> */}
      {/* <div className='chat-header'>
        {message.sender.username}
        <time className='text-xs opacity-50'>12:46</time>
      </div> */}
      <div className='chat-bubble bg-green-200 text-black'>{message.body}</div>
      <div className='chat-footer opacity-50'>Seen at 12:46</div>
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
