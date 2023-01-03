import { useState } from 'react';
import ConversationList from './ConversationList';
import MenuBar from './MenuBar';

interface ConversationWrapperProps {
  show: boolean;
  setShow: (show: boolean) => void;
}
const ConversationWrapper: React.FC<ConversationWrapperProps> = ({
  show,
  setShow,
}) => {
  return (
    <div
      className='border-red-500 border-2 relative z-0 hidden sm:inline max-w-sm w-full'
      //   onClick={() => setShow(false)}
    >
      {show && <MenuBar show={show} setShow={setShow} />}
      <ConversationList setShow={setShow} />
    </div>
  );
};
export default ConversationWrapper;
