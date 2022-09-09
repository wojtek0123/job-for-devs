const Notification: React.FC<{
  message: string;
  isError: boolean;
  show: boolean;
}> = ({ message, isError, show }) => {
  if (show) {
    return (
      <div
        className={`fixed bottom-5 left-5 px-10 py-5 text-lg text-white rounded-lg ${
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
