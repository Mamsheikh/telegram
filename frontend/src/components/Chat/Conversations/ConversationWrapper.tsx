import { useState } from 'react';
import ConversationList from './ConversationList';
import MenuBar from './MenuBar';
import Modal from '../Modal';
import ChannelModal from '../Modal/ChannelModal';
import { Session } from 'next-auth';

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
      <ConversationList setShow={setShow} />
    </div>
  );
};
export default ConversationWrapper;
