import { useState } from 'react';
import ConversationWrapper from './Conversations/ConversationWrapper';
import FeedWrapper from './Feed/FeedWrapper';

interface ChatProps {}

const Chat: React.FC<ChatProps> = () => {
  const [show, setShow] = useState(false);
  return (
    <div className='h-screen flex'>
      <ConversationWrapper show={show} setShow={setShow} />
      <FeedWrapper setShow={setShow} />
    </div>
  );
};
export default Chat;
