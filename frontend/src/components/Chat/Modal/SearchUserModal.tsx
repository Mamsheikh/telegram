import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useCallback, useRef, useState } from 'react';
import { AiFillCamera, AiOutlineSearch } from 'react-icons/ai';
import UserSearchList from './UserSearchList';
import { useLazyQuery, useQuery } from '@apollo/client';
import { userOperations } from '../../../graphql/operations/user';
import { SearchUsersData, SearchUsersVariables } from '../../../utils/types';
import { useDebounce } from 'use-debounce';
import UserSearchSkeletonLoader from './UserSearchSkeletonLoader';

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
  const [name, setName] = useState<string>();
  const [username, setUsername] = useState('');
  const [debouncedUsername] = useDebounce(username, 3000);
  const [image, setImage] = useState('');
  const [count, setCount] = useState(1);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [searchUsers, { data, loading }] = useLazyQuery<
    SearchUsersData,
    SearchUsersVariables
  >(userOperations.Queries.searchUsers);
  console.log(data?.searchUsers);

  const handleClick = useCallback(() => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }, []);

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!username) return;
    await searchUsers({
      variables: {
        username,
      },
    });
  };
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
                <Dialog.Panel className='w-full h-[450px] max-w-sm transform overflow-hidden rounded-2xl bg-white  text-left align-middle shadow-xl transition-all'>
                  <div className='pt-6 mb-4 px-6'>
                    <Dialog.Title
                      as='h3'
                      className='text-lg  font-medium leading-6 text-gray-900'
                    >
                      Add Members{' '}
                      <span className='text-xs ml-1 text-gray-600'>
                        {count}/200000
                      </span>
                    </Dialog.Title>
                  </div>
                  <form onSubmit={onSubmit} className=' flex items-center px-6'>
                    <div className='flex w-full items-center pb-3'>
                      <AiOutlineSearch className='h-6 w-6 text-gray-400' />
                      <input
                        onChange={(event) => setUsername(event.target.value)}
                        type='text'
                        placeholder='Search'
                        className='focus:outline-none w-full ml-2'
                      />
                    </div>
                    <button
                      type='submit'
                      className='inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-telegram-blue  focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
                    >
                      Search
                    </button>
                  </form>
                  <hr />
                  {data?.searchUsers && (
                    <UserSearchList users={data?.searchUsers} />
                  )}
                  {true &&
                    [0, 1].map((i) => <UserSearchSkeletonLoader key={i} />)}
                  <div className='mt-4 flex justify-end left-0 mb-3 w-full border-t fixed bottom-0 px-4 pt-1'>
                    <button
                      type='button'
                      className='inline-flex justify-center rounded-md border border-transparent hover:bg-blue-100 px-4 py-2 text-sm font-medium text-telegram-blue focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
                      onClick={() => setIsOpen(false)}
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
