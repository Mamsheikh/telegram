import { useQuery } from '@apollo/client';
import { messageOperations } from '../../../../graphql/operations/message';
import {
  MessageSubscriptionData,
  MessagesData,
  MessagesVariables,
} from '../../../../utils/types';
import { toast } from 'react-hot-toast';
import { useEffect } from 'react';
import MessageItem from './MessageItem';

interface MessagesProps {
  userId: string;
  conversationId: string;
}

const Messages: React.FC<MessagesProps> = ({ userId, conversationId }) => {
  const { data, loading, subscribeToMore } = useQuery<
    MessagesData,
    MessagesVariables
  >(messageOperations.Queries.messages, {
    variables: {
      conversationId,
    },
    onError: ({ message }) => {
      toast.error(message);
    },
  });
  // console.log('USERID', userId);

  const subscribeToMoreMessages = (conversationId: string) => {
    subscribeToMore({
      document: messageOperations.Subscriptions.messageSent,
      variables: {
        conversationId,
      },
      updateQuery: (prev, { subscriptionData }: MessageSubscriptionData) => {
        if (!subscriptionData) return prev;
        console.log('SUBSCRIPTION DATA', subscriptionData);

        const newMessages = subscriptionData.data.messageSent;

        return Object.assign({}, prev, {
          messages: [...prev.messages, newMessages],
        });
      },
    });
  };

  useEffect(() => {
    subscribeToMoreMessages(conversationId);
  }, [conversationId]);

  return (
    <>
      {loading && <div>loading...</div>}
      {data?.messages &&
        data.messages.map((message) => (
          <MessageItem
            key={message.id}
            message={message}
            sentByMe={message.sender.id === userId}
          />
        ))}
    </>
  );
};
export default Messages;
