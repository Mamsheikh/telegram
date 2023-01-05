import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useCallback, useRef, useState } from 'react';
import { AiFillCamera, AiOutlineSearch } from 'react-icons/ai';

type ModalProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  openModal?: () => void;
  closeModal?: () => void;
  channelName?: string;
  groupName?: string;
  picture?: string;
};

const SearchUserModal: React.FC<ModalProps> = ({
  isOpen,
  channelName,
  setIsOpen,
  groupName,
  picture,
  closeModal,
}) => {
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [count, setCount] = useState(1);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = useCallback(() => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }, []);
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as='div'
          className='relative z-10'
          onClose={() => setIsOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-black bg-opacity-50' />
          </Transition.Child>

          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-4 text-center'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
              >
                <Dialog.Panel className='w-full h-64 max-w-sm transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                  <Dialog.Title
                    as='h3'
                    className='text-lg font-medium leading-6 text-gray-900'
                  >
                    Add Members{' '}
                    <span className='text-xs ml-1 text-gray-600'>
                      {count}/200000
                    </span>
                  </Dialog.Title>
                  <div className='mt-2 flex items-center'>
                    <div className='flex border-b w-full items-center pb-3'>
                      <AiOutlineSearch className='h-6 w-6 text-gray-400' />
                      <input
                        type='text'
                        placeholder='Search'
                        className='focus:outline-none w-full ml-2'
                      />
                    </div>
                  </div>
                  <div className='mt-4 flex justify-end'>
                    <button
                      type='button'
                      className='inline-flex justify-center rounded-md border border-transparent hover:bg-blue-100 px-4 py-2 text-sm font-medium text-telegram-blue focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
                    <button
                      type='button'
                      className='inline-flex justify-center rounded-md border border-transparent hover:bg-blue-100 px-4 py-2 text-sm font-medium text-telegram-blue  focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
                      //   onClick={() => setOpen(true)}
                    >
                      Create
                    </button>
                    {/* {open && (
                      <SearchUserModal isOpen={open} setIsOpen={setOpen} />
                    )} */}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
export default SearchUserModal;
