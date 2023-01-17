import { useEffect, useState } from 'react';
import ConversationList from './ConversationList';
import MenuBar from './MenuBar';
import Modal from '../Modal';
import ChannelModal from '../Modal/ChannelModal';
import { Session } from 'next-auth';
import { useQuery } from '@apollo/client';
import { conversationOperations } from '../../../graphql/operations/conversation';
import {
  Conversation,
  ConversationPopulated,
  ConversationsData,
} from '../../../utils/types';
import { useRouter } from 'next/router';

interface ConversationWrapperProps {
  session: Session;
  show: boolean;
  setShow: (show: boolean) => void;
}
const ConversationWrapper: React.FC<ConversationWrapperProps> = ({
  session,
  show,
  setShow,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [channelIsOpen, setChannelIsOpen] = useState(false);
  const { data, subscribeToMore } = useQuery<ConversationsData>(
    conversationOperations.Queries.conversations
  );

  const router = useRouter();

  console.log('QUERY DATA', data);

  const subscribeToNewConversations = () => {
    subscribeToMore({
      document: conversationOperations.Subscriptions.conversationCreated,
      updateQuery: (
        prev,
        {
          subscriptionData,
        }: {
          subscriptionData: {
            data: { conversationCreated: ConversationPopulated };
          };
        }
      ) => {
        if (!subscriptionData.data) return prev;
        // console.log('SUBSCRIPTION DATA', subscriptionData);

        const newConversation = subscriptionData.data.conversationCreated;
        return Object.assign({}, prev, {
          conversations: [...prev.conversations, newConversation],
        });
      },
    });
  };

  const onViewConversation = async (conversationId: string) => {
    router.push({ query: { conversationId } });
  };

  const openModal = () => {
    setIsOpen(true);
    setShow(false);
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  const openChannelModal = () => {
    setChannelIsOpen(true);
    setShow(false);
  };

  const closeChannelModal = () => {
    setChannelIsOpen(false);
  };

  useEffect(() => {
    subscribeToNewConversations();

    // return () => {
    //   second
    // }
  }, []);

  return (
    <div
      className='border-red-500 border-2 relative z-0 hidden sm:inline max-w-sm w-full'
      //   onClick={() => setShow(false)}
    >
      {show && (
        <MenuBar
          show={show}
          setShow={setShow}
          openModal={openModal}
          openChannelModal={openChannelModal}
        />
      )}
      {isOpen && (
        <Modal
          session={session}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          openModal={openModal}
          closeModal={closeModal}
        />
      )}
      {channelIsOpen && (
        <ChannelModal
          session={session}
          isOpen={channelIsOpen}
          setIsOpen={setChannelIsOpen}
          openModal={openChannelModal}
          closeModal={closeChannelModal}
        />
      )}
      {data?.conversations && (
        <ConversationList
          session={session}
          setShow={setShow}
          conversations={data?.conversations}
          onViewConversation={onViewConversation}
        />
      )}
    </div>
  );
};
export default ConversationWrapper;
