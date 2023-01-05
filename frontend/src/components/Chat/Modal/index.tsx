import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useCallback, useRef, useState } from 'react';
import { AiFillCamera } from 'react-icons/ai';
import SearchUserModal from './SearchUserModal';

type ModalProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  openModal: () => void;
  closeModal: () => void;
  channelName?: string;
  groupName?: string;
  picture?: string;
};

const Modal: React.FC<ModalProps> = ({
  isOpen,
  channelName,
  groupName,
  picture,
  closeModal,
}) => {
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [open, setOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = useCallback(() => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }, []);
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as='div' className='relative z-10' onClose={closeModal}>
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
                <Dialog.Panel className='w-full max-w-sm transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                  <div className='mt-2 flex items-center justify-around'>
                    <div className='w-1/3 flex items-center justify-center'>
                      <div
                        onClick={handleClick}
                        className='cursor-pointer h-20 w-20 rounded-full bg-telegram-blue flex items-center justify-center'
                      >
                        <AiFillCamera className='text-white h-10 w-10' />
                        <input
                          type='file'
                          ref={fileInputRef}
                          accept='image/*'
                          style={{ display: 'none' }}
                        />
                      </div>
                    </div>
                    <div className='flex-col flex w-2/3'>
                      <label htmlFor='' className='text-telegram-blue text-sm'>
                        Group name
                      </label>
                      <input
                        type='text'
                        onChange={(event) => setName(event.target.value)}
                        className='focus:outline-none  border-b-2 border-telegram-blue'
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
                      onClick={() => setOpen(true)}
                    >
                      Next
                    </button>
                    {open && (
                      <SearchUserModal isOpen={open} setIsOpen={setOpen} />
                    )}
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
export default Modal;
