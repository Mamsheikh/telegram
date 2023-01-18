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
  conversationId: string;
}

const Header: React.FC<HeaderProps> = ({ conversationId }) => {
  const router = useRouter();
  //   const { conversationId }: { conversationId: string } = router.query;

  const { data, loading } = useQuery<
    ConversationData,
    { conversationId: string }
  >(conversationOperations.Queries.conversation, {
    variables: {
      conversationId,
    },
    //   fetchPolicy: 'network-only',
  });

  //   console.log('conversation', data?.conversation);
  //   const participants:Participant[] = data?.conversation?.participants;
  if (!data?.conversation) return null;
  return (
    <div className='flex justify-between items-center bg-white px-4 py-2 border'>
      <div>
        <h4 className='font-semibold'>{data?.conversation.conversationName}</h4>
        <span className='text-sm text-gray-500'>
          {data?.conversation?.participants.length} subscriber
          {data?.conversation?.participants.length > 1 ? 's' : ''}
        </span>
      </div>
      <div>
        <div className='flex items-center space-x-3'>
          <BsReverseLayoutSidebarReverse className='h-5 w-5 text-gray-500 cursor-pointer' />
          <BiDotsVerticalRounded className='h-6 w-6 text-gray-500 cursor-pointer' />
        </div>
      </div>
    </div>
  );
};
export default Header;
