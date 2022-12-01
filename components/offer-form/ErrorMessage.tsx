const ErrorMessage: React.FC<{
  message?: string;
  isVisible: boolean;
  expression?: string | string[];
}> = ({ message = 'To pole jest wymagane', isVisible, expression }) => {
  if (isVisible && expression?.length === 0) {
    return (
      <small className='col-span-2 text-left md:text-right text-red-600 h-4'>
        {message}
      </small>
    );
  }

  if (isVisible && !expression) {
    return <small className='col-span-2 text-left md:text-right text-red-600 h-4'>
      {message}
    </small>
  }

  return (
    <small className='col-span-2 text-left md:text-right text-red-600 h-4'></small>
  );
};

export default ErrorMessage;
