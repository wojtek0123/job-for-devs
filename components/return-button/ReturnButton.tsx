import { useRouter } from 'next/router';

const ReturnButton: React.FC = () => {
  const router = useRouter();

  const returnButtonHandler = (): void => {
    router.back();
  };

  return (
    <button
      type='button'
      className='inline-flex items-center shadow px-5 py-4 md:px-3 md:py-2 rounded-lg ml-2 xl:ml-0 text-black text-lg transition-colors duration-300 bg-gray-200 hover:bg-gray-300'
      onClick={returnButtonHandler}
    >
      <svg className='w-4 h-4 fill-black' viewBox='0 0 448 512'>
        <path d='M447.1 256c0 17.7-13.4 32-31.1 32H109.3l105.4 105.4c12.5 12.5 12.5 32.75 0 45.25-6.3 6.25-14.5 9.35-22.7 9.35s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25l160-160c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L109.3 224H416c17.7 0 31.1 14.3 31.1 32z' />
      </svg>
      <span className='ml-2 capitalize'>powrót</span>
    </button>
  );
};

export default ReturnButton;
