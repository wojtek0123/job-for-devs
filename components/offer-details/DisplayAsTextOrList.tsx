const DisplayAsTextOrList: React.FC<{ text: string }> = ({ text }) => {
  if (text.trim().split('\n').length <= 1) {
    return <p className='lg:col-start-2 lg:col-end-3 break-words'>{text}</p>;
  } else {
    return (
      <ul className='list-disc pl-7 lg:col-start-2 lg:col-end-3'>
        {text.split('\n').map((item, index) => (
          <li key={index} className='break-words'>
            {item}
          </li>
        ))}
      </ul>
    );
  }
};

export default DisplayAsTextOrList;
