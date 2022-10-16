const Notification: React.FC<{
  message: string;
  isError: boolean;
  show: boolean;
}> = ({ message, isError, show }) => {
  return (
    <div
      className={`fixed bottom-0 left-1/2 -translate-x-1/2 lg:translate-x-0 px-10 py-5 text-lg text-white rounded-t-lg md:rounded-lg lg:left-5 w-full max-w-lg z-20 text-center transition-transform duration-500 ${
        isError ? 'bg-red-500' : 'bg-green-500'
      } ${show ? '-translate-y-5' : 'translate-y-full'}`}
    >
      {message}
    </div>
  );
};

export default Notification;
