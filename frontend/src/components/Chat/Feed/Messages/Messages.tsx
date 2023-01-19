import { useQuery } from '@apollo/client';
import { messageOperations } from '../../../../graphql/operations/message';
import { MessagesData, MessagesVariables } from '../../../../utils/types';
import { toast } from 'react-hot-toast';

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

  console.log('MESSAGES', data);

  return (
    <>
      {loading && <div>loading...</div>}
      {data?.messages &&
        data.messages.map((message) => (
          <div key={message.id}>{message.body}</div>
        ))}
    </>
  );
};
export default Messages;
