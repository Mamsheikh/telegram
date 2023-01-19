import { useLazyQuery, useQuery } from '@apollo/client';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import { BsReverseLayoutSidebarReverse } from 'react-icons/bs';
import { conversationOperations } from '../../../../graphql/operations/conversation';
import {
  Conversation,
  ConversationData,
  ConversationPopulated,
  Participant,
} from '../../../../utils/types';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

interface HeaderProps {
  //   conversation: Conversation;
  open: boolean;
  setOpen: (open: boolean) => void;
  setConversation: (conversation: Conversation) => void;
}

const Header: React.FC<HeaderProps> = ({ open, setOpen, setConversation }) => {
  const router = useRouter();
  const conversationId =
    (router.query.conversationId as string | undefined) || '';
  const id = conversationId as string;
  // conversationId = stringify(conversationId)
  const { data, loading } = useQuery<
    ConversationData,
    { conversationId: string }
  >(conversationOperations.Queries.conversation, {
    variables: {
      conversationId,
    },
  });

  useEffect(() => {
    {
      data?.conversation && setConversation(data?.conversation);
    }
  }, [data?.conversation]);

  return (
    <div className='flex justify-between items-center bg-white px-4 py-2 border'>
      <div>
        <h4 className='font-semibold'>{data?.conversation.conversationName}</h4>
        <span className='text-sm text-gray-500'>
          {data?.conversation.participants.length} subscribers
        </span>
      </div>
      <div>
        <div className='flex items-center space-x-3'>
          <BsReverseLayoutSidebarReverse
            className={`h-5 w-5 cursor-pointer ${
              open ? 'text-telegram-blue' : 'text-gray-500'
            }`}
            onClick={() => setOpen(!open)}
          />
          <BiDotsVerticalRounded className='h-6 w-6 text-gray-500 cursor-pointer' />
        </div>
      </div>
    </div>
  );
};
export default Header;
