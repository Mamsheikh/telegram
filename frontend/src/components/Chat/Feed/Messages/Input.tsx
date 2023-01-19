import { Session } from 'next-auth';
import { ImAttachment } from 'react-icons/im';
import { BiMicrophone } from 'react-icons/bi';
import { BsEmojiSmile } from 'react-icons/bs';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useMutation } from '@apollo/client';
import { SendMessageData, SendMessageVariables } from '../../../../utils/types';
import { messageOperations } from '../../../../graphql/operations/message';
interface InputProps {
  session: Session;
  conversationId: string;
}
const Input: React.FC<InputProps> = ({ session, conversationId }) => {
  const [messageBody, setMessageBody] = useState('');
  const [sendMessage, { loading }] = useMutation<
    SendMessageData,
    SendMessageVariables
  >(messageOperations.Mutations.sendMessage);

  const onSendMessage = async (event: React.FormEvent) => {
    event.preventDefault();

    const { id: senderId } = session?.user;

    try {
      const { data, errors } = await sendMessage({
        variables: {
          conversationId,
          senderId,
          body: messageBody,
        },
      });

      if (!data?.sendMessage || errors) {
        throw new Error('failed to send message');
      }
    } catch (error: any) {
      console.log('onSendMessage error', error);
      toast.error(error.message);
    }
  };
  return (
    <form
      onSubmit={onSendMessage}
      className='bg-white h-14 flex items-center px-2'
    >
      <ImAttachment className='text-gray-400 mr-4 h-6 w-6' />
      <input
        className='w-full flex-1 placeholder:text-sm focus:outline-none'
        type='text'
        placeholder='Write a message...'
        value={messageBody}
        onChange={(event) => setMessageBody(event.target.value)}
      />
      <div className='flex text-gray-400 space-x-2 ml-4z'>
        <BsEmojiSmile className='h-6 w-6' />
        <BiMicrophone className='h-6 w-6' />
      </div>
    </form>
  );
};
export default Input;
