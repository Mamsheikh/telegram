import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useCallback, useRef, useState } from 'react';
import { AiFillCamera, AiOutlineSearch } from 'react-icons/ai';
import UserSearchList from './UserSearchList';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { userOperations } from '../../../graphql/operations/user';
import {
  CreateConversationData,
  CreateConversationVariables,
  SearchUsersData,
  SearchUsersVariables,
  User,
} from '../../../utils/types';
import { useDebounce } from 'use-debounce';
import UserSearchSkeletonLoader from './UserSearchSkeletonLoader';
import Participants from './Participants';
import toast from 'react-hot-toast';
import { conversationOperations } from '../../../graphql/operations/conversation';
import { Session } from 'next-auth';

type ModalProps = {
  session: Session;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  openModal?: () => void;
  closeModal?: () => void;
  username?: string;
  setUsername: (username: string) => void;
  picture?: string;
};

const SearchUserModal: React.FC<ModalProps> = ({
  session,
  isOpen,
  username,
  setIsOpen,
  setUsername,
  picture,
  closeModal,
}) => {
  const [participants, setParticipants] = useState<User[]>([]);
  const [debouncedUsername] = useDebounce(username, 3000);
  const [image, setImage] = useState('');
  const [count, setCount] = useState(1);
  const { id: userId } = session.user;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [searchUsers, { data, loading }] = useLazyQuery<
    SearchUsersData,
    SearchUsersVariables
  >(userOperations.Queries.searchUsers);
  const [createConversation, { loading: createConversationLoading }] =
    useMutation<CreateConversationData, CreateConversationVariables>(
      conversationOperations.Mutations.createConversation
    );

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

  const addParticipant = (user: User) => {
    const participantsId = participants.map((p) => p.id);
    for (let i = 0; i < participantsId.length; i++) {
      const element = participantsId[i];
      if (user.id === element) {
        removeParticipant(user.id);
        return;
      }
    }
    setParticipants((prev) => [...prev, user]);
    setUsername('');
  };

  const removeParticipant = (userId: string) => {
    setParticipants((prev) => prev.filter((p) => p.id !== userId));
  };
  const onCreateConversation = async () => {
    const participantIds = [userId, ...participants.map((p) => p.id)];
    try {
      const { data } = await createConversation({
        variables: {
          participantIds,
        },
      });
    } catch (error: any) {
      console.log('onCreateConverstion error', error);
      toast.error(error.message);
    }
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
                        {participants.length + 1}/200000
                      </span>
                    </Dialog.Title>
                  </div>
                  <form
                    onSubmit={onSubmit}
                    className=' max-h-32 flex items-start overflow-y-auto px-6'
                  >
                    <div
                      className={`${
                        participants.length === 0
                          ? 'flex items-center w-full'
                          : 'pb-3'
                      }`}
                    >
                      {participants.length === 0 && (
                        <AiOutlineSearch className='h-6 w-6 text-gray-400' />
                      )}
                      {participants && (
                        <Participants
                          participants={participants}
                          removeParticipants={removeParticipant}
                        />
                      )}
                      <div className='flex items-end'>
                        <input
                          value={username}
                          onChange={(event) => setUsername(event.target.value)}
                          type='text'
                          placeholder='Search'
                          className='focus:outline-none w-full ml-2 mb-2'
                        />
                        <button
                          type='submit'
                          className='inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-telegram-blue  focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
                        >
                          Search
                        </button>
                      </div>
                    </div>
                  </form>
                  <hr />
                  {data?.searchUsers && (
                    <UserSearchList
                      users={data?.searchUsers}
                      addParticipant={addParticipant}
                      participants={participants}
                    />
                  )}
                  {loading &&
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
                      onClick={onCreateConversation}
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
