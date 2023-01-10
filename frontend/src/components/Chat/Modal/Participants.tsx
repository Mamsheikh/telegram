/* eslint-disable @next/next/no-img-element */
import { AiOutlineClose } from 'react-icons/ai';
import { User } from '../../../utils/types';
import { useState } from 'react';

interface ParticipantsProps {
  participants: User[];
  removeParticipants: (userId: string) => void;
}
const Participants: React.FC<ParticipantsProps> = ({
  participants,
  removeParticipants,
}) => {
  const [isShown, setIsShown] = useState(false);
  return (
    <>
      <div
        className='grid grid-cols-3 gap-4
       '
      >
        {participants.map((participant) => (
          <div
            key={participant.id}
            className='flex items-center relative bg-gray-100 rounded-full'
            onMouseEnter={() => setIsShown(true)}
            onMouseLeave={() => setIsShown(false)}
          >
            {/* {!isShown ? ( */}
            <img
              className='h-6 w-6 rounded-full object-center absolute hover:hidden'
              src={participant.image}
              alt=''
            />
            {/* // ) : (
            //   <div className='bg-telegram-blue h-6 w-6 rounded-full p-1 mr-0'>
            //     <AiOutlineClose className=' text-white' />
            //   </div>
            // )} */}
            <div className='flex items-center bg-gray-100 rounded-r-full p-1 ml-6'>
              <h6 className='text-xs text-ellipsis'>{participant.username}</h6>
              <AiOutlineClose
                onClick={() => removeParticipants(participant.id)}
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
export default Participants;
