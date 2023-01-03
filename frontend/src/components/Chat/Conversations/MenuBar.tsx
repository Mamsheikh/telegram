import { AiOutlineArrowLeft } from 'react-icons/ai';

interface MenuBarProps {
  show: boolean;
  setShow: (show: boolean) => void;
}

const MenuBar: React.FC<MenuBarProps> = ({ show, setShow }) => {
  return (
    <div className='px-4 py-3 inset-y-0 left-0 z-10 absolute flex justify-between max-w-xs w-full bg-white shadow-md'>
      <div className='h-10 w-10 bg-red-500 rounded-full'></div>{' '}
      <AiOutlineArrowLeft className='mt-4' onClick={() => setShow(false)} />
    </div>
  );
};
export default MenuBar;
