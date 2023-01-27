import { FcMenu } from 'react-icons/fc';
import {
  ConversationPopulated,
  Conversation,
  ConversationsData,
} from '../../../utils/types';
import ConversationItem from './ConversationItem';
import { useRouter } from 'next/router';
import { Session } from 'next-auth';

interface ConversationListProps {
  session: Session;
  setShow: (show: boolean) => void;
  conversations: ConversationPopulated[];
  onViewConversation: (
    conversationId: string,
    hasSeenLatestMessage?: boolean
  ) => void;
}

const ConversationList: React.FC<ConversationListProps> = ({
  session,
  setShow,
  conversations,
  onViewConversation,
}) => {
  const router = useRouter();
  const { id: userId } = session.user;
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
      <div className=''>
        {conversations.map((conversation) => {
          const participant = conversation.participants.find(
            (p) => p.user.id === 'cld3omx9f0000iezckrqaj7xe'
          );
          console.log(conversation.participants);

          return (
            <ConversationItem
              key={conversation.id}
              userId={session.user.id}
              conversation={conversation}
              onClick={() =>
                onViewConversation(
                  conversation.id,
                  participant?.hasSeenLatestMessage
                )
              }
              hasSeenLatestMessage={participant?.hasSeenLatestMessage}
              unSeenMessageCount={participant?.unSeenMessageCount}
              isSelected={router.query.conversationId === conversation.id}
            />
          );
        })}
      </div>
    </div>
  );
};
export default ConversationList;
