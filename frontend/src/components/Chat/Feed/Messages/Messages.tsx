import { useQuery } from '@apollo/client';
import { messageOperations } from '../../../../graphql/operations/message';
import {
  MessageSubscriptionData,
  MessagesData,
  MessagesVariables,
} from '../../../../utils/types';
import { toast } from 'react-hot-toast';
import { useEffect, useRef } from 'react';
import MessageItem from './MessageItem';

interface MessagesProps {
  userId: string;
  conversationId: string;
  scrollToBottom: () => void;
}

const Messages: React.FC<MessagesProps> = ({
  userId,
  conversationId,
  scrollToBottom,
}) => {
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
        const newMessage = subscriptionData.data.messageSent;
        // onNewMessage();

        return Object.assign({}, prev, {
          messages:
            newMessage.sender.id === userId
              ? prev.messages
              : [...prev.messages, newMessage],
        });
      },
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [data?.messages]);
  useEffect(() => {
    subscribeToMoreMessages(conversationId);
    // onNewMessage();
  }, [conversationId]);

  return (
    <>
      {loading && <div>loading...</div>}
      {data?.messages &&
        data.messages.map((message) => (
          <>
            <MessageItem
              key={message.id}
              message={message}
              sentByMe={message.sender.id === userId}
            />
          </>
        ))}
    </>
  );
};
export default Messages;
