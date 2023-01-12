/* eslint-disable @next/next/no-img-element */
import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useCallback, useRef, useState } from 'react';
import { AiFillCamera } from 'react-icons/ai';
import SearchUserModal from './SearchUserModal';
import { Session } from 'next-auth';
import { ConversationType } from '../../../utils/types';

type ModalProps = {
  session: Session;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  openModal: () => void;
  closeModal: () => void;
};

const Modal: React.FC<ModalProps> = ({ isOpen, session, closeModal }) => {
  const [username, setUserame] = useState<string>();
  const [conversationName, setConversationName] = useState<string>();
  const [conversationType, setConversationType] = useState<ConversationType>();
  const [err, setErr] = useState(false);
  const [conversationImg, setConversationImg] = useState('');
  const [file, setFile] = useState<File>();
  const [open, setOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = useCallback(() => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }, []);

  const onNext = () => {
    if (!conversationName) {
      setErr(true);
      return;
    }
    setOpen(true);
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event?.target?.files?.[0]) {
      const file = event.target.files[0];
      setFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setConversationImg(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

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
                        className={`cursor-pointer h-20 w-20 rounded-full ${
                          conversationImg ? '' : 'bg-telegram-blue'
                        }  flex items-center justify-center`}
                      >
                        {/* <AiFillCamera className='text-white h-10 w-10' /> */}
                        {conversationImg ? (
                          <img
                            src={conversationImg}
                            alt='preview'
                            className='h-20 w-20 rounded-full'
                          />
                        ) : (
                          <AiFillCamera className='text-white h-10 w-10' />
                        )}
                      </div>
                      <input
                        type='file'
                        ref={fileInputRef}
                        onChange={onChange}
                        accept='image/*'
                        style={{ display: 'none' }}
                      />
                    </div>
                    <div className='flex-col flex w-2/3'>
                      <label
                        htmlFor=''
                        className={`${
                          err ? 'text-red-500' : 'text-telegram-blue'
                        } text-sm`}
                      >
                        Group name
                      </label>
                      <input
                        type='text'
                        onChange={(event) => {
                          setErr(false);
                          setConversationName(event.target.value);
                        }}
                        className={`focus:outline-none  border-b-2 ${
                          err ? `border-red-500` : `border-telegram-blue`
                        }`}
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
                      // disabled={!username}
                      className='inline-flex justify-center rounded-md border border-transparent hover:bg-blue-100 px-4 py-2 text-sm font-medium text-telegram-blue  focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
                      onClick={onNext}
                    >
                      Next
                    </button>
                    {open && (
                      <SearchUserModal
                        session={session}
                        isOpen={open}
                        setIsOpen={setOpen}
                        closeModal={closeModal}
                        username={username}
                        setUsername={setUserame}
                        conversationName={conversationName}
                        conversationType={ConversationType.GROUP}
                        file={file}
                      />
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
