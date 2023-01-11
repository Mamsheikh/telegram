import { useState } from 'react';
import ConversationWrapper from './Conversations/ConversationWrapper';
import FeedWrapper from './Feed/FeedWrapper';
import { Session } from 'next-auth';

interface ChatProps {
  session: Session;
}

const Chat: React.FC<ChatProps> = ({ session }) => {
  const [show, setShow] = useState(false);
  return (
    <div className='h-screen flex'>
      <ConversationWrapper session={session} show={show} setShow={setShow} />
      <FeedWrapper setShow={setShow} />
    </div>
  );
};
export default Chat;
