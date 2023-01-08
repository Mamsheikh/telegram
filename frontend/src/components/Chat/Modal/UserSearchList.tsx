import { User } from '../../../utils/types';

interface UserSearchListProps {
  users: User[];
}

const UserSearchList: React.FC<UserSearchListProps> = ({ users }) => {
  return (
    <div className='overflow-hidden overflow-y-auto mt-2'>
      {users && users.length === 0 && (
        <div className='flex items-center justify-center mt-6'>
          <h4>No users found.</h4>
        </div>
      )}
      {users.map((user) => (
        <>
          <div className=' hover:bg-gray-200 w-full cursor-pointer px-2 py-2 rounded'>
            <div key={user.id} className='px-6 flex items-center'>
              <img
                src={user.image}
                alt=''
                className='h-10 w-10 rounded-full object-cover'
              />
              <div>
                <h4 className='ml-6 font-semibold'>{user.username}</h4>
              </div>
            </div>
          </div>
        </>
      ))}
    </div>
  );
};
export default UserSearchList;
