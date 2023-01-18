import { BiDotsVerticalRounded } from 'react-icons/bi';
import { BsReverseLayoutSidebarReverse } from 'react-icons/bs';

interface HeaderProps {}

const Header = (): JSX.Element => {
  return (
    <div className='flex justify-between items-center bg-white px-4 py-2 border'>
      <div>
        <h4 className='font-semibold'>CPE 21</h4>
        <span className='text-sm text-gray-500'>1 subscribers</span>
      </div>
      <div>
        <div className='flex items-center space-x-3'>
          <BsReverseLayoutSidebarReverse className='h-5 w-5 text-gray-500' />
          <BiDotsVerticalRounded className='h-6 w-6 text-gray-500' />
        </div>
      </div>
    </div>
  );
};
export default Header;
