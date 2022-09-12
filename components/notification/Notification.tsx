const Notification: React.FC<{
  message: string;
  isError: boolean;
  show: boolean;
}> = ({ message, isError, show }) => {
  if (show) {
    return (
      <div
        className={`fixed bottom-0 left-1/2 -translate-x-1/2 lg:transform-none px-10 py-5 text-lg text-white rounded-t-lg md:rounded-lg lg:left-5 md:bottom-5 w-full max-w-lg z-20 text-center ${
          isError ? 'bg-red-500' : 'bg-green-500'
        }`}
      >
        {message}
      </div>
    );
  }

  return <></>;
};

export default Notification;
