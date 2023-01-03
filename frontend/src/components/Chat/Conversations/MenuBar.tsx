import { AiOutlineArrowLeft } from 'react-icons/ai';
import { MdOutlineGroup, MdOutlineNightlightRound } from 'react-icons/md';
import { HiSpeakerphone } from 'react-icons/hi';
import { FaUserAlt } from 'react-icons/fa';
import { IoMdSettings } from 'react-icons/io';
interface MenuBarProps {
  show: boolean;
  setShow: (show: boolean) => void;
  openModal: () => void;
  openChannelModal: () => void;
}

const MenuBar: React.FC<MenuBarProps> = ({
  show,
  setShow,
  openModal,
  openChannelModal,
}) => {
  return (
    <>
      <div className='inset-y-0 left-0 z-10 absolute max-w-xs w-full bg-white shadow-md border-r'>
        <div className='px-8 py-6  flex justify-between'>
          <div className='h-12 w-12 bg-red-500 rounded-full'></div>{' '}
          <AiOutlineArrowLeft
            className='mt-4 cursor-pointer'
            onClick={() => setShow(false)}
          />
        </div>
        <div className='px-8 mb-6'>
          <h4 className='font-semibold text-gray-500'>Munir Ali</h4>
        </div>
        <hr />
        <div className='px-6 space-y-3'>
          <div
            onClick={openModal}
            className='flex items-center space-x-4 mt-4 hover:bg-gray-100 rounded p-2  cursor-pointer'
          >
            <div className='bg-telegram-blue/90 rounded p-1'>
              <MdOutlineGroup className=' h-4 w-4 text-white ' />
            </div>
            <h4 className='font-semibold text-gray-800 text-sm'>New Group</h4>
          </div>
          <div
            onClick={openChannelModal}
            className='flex items-center space-x-4  hover:bg-gray-100 rounded p-2  cursor-pointer'
          >
            <div className='bg-orange-500 rounded p-1'>
              <HiSpeakerphone className='text-white h-4 w-4' />
            </div>
            <h4 className='font-semibold text-gray-800 text-sm'>New Channel</h4>
          </div>
          <div className='flex items-center space-x-4  hover:bg-gray-100 rounded p-2  cursor-pointer'>
            <div className='bg-red-500 rounded p-1'>
              <FaUserAlt className='text-white h-4 w-4' />
            </div>
            <h4 className='font-semibold text-gray-800 text-sm'>Contacts</h4>
          </div>
          <div className='flex items-center space-x-4  hover:bg-gray-100 rounded p-2  cursor-pointer'>
            <div className='bg-purple-500 rounded p-1'>
              <IoMdSettings className='text-white h-4 w-4' />
            </div>
            <h4 className='font-semibold text-gray-800 text-sm'>Settings</h4>
          </div>
          <div className='flex items-center space-x-4  hover:bg-gray-100 rounded p-2  cursor-pointer'>
            <div className='bg-blue-400 rounded p-1'>
              <MdOutlineNightlightRound className='text-white h-4 w-4' />
            </div>
            <h4 className='font-semibold text-gray-800 text-sm'>Night Mode</h4>
          </div>
        </div>
      </div>
    </>
  );
};
export default MenuBar;
