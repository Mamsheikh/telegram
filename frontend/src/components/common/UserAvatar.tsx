import seedrandom from 'seedrandom';

interface Props {
  username: string;
  avatarUrl?: string;
}

const getRandomColor = (username: string): string => {
  const letters: string = '0123456789ABCDEF';
  let color: string = '#';
  let seed: number = 0;
  for (let i = 0; i < username.length; i++) {
    seed += username.charCodeAt(i);
  }
  seedrandom(seed.toString(), { global: true });
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const UserAvatar: React.FC<Props> = ({ username, avatarUrl }) => {
  if (!username) return null;
  const initials = username[0].toLocaleUpperCase();
  const randomColor = getRandomColor(username);
  return (
    <div>
      {avatarUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img className='h-8 w-8 rounded-full' src={avatarUrl} alt='' />
      ) : (
        <div
          style={{ backgroundColor: randomColor }}
          className='relative inline-flex items-center justify-center w-12 h-12 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600'
        >
          <span className='uppercase font-medium text-white dark:text-gray-300'>
            {initials}
          </span>
        </div>
      )}
    </div>
  );
};

export default UserAvatar;
