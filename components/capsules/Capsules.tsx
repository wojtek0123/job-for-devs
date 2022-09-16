import React from 'react';
import { v4 as uuid } from 'uuid';

const Capsules: React.FC<{
  array: string[];
  selectedItem: string | string[];
  onClick: (
    event: React.MouseEvent<HTMLButtonElement>,
    fn?: (text: string) => void
  ) => void;
}> = ({ array, selectedItem, onClick }) => {
  return (
    <>
      {array.map((item) => (
        <button
          type='button'
          key={uuid()}
          className={`p-3 lg:px-3 lg:py-2 rounded-lg mr-1 my-1 ${
            selectedItem.includes(item.toLowerCase())
              ? 'bg-green-500 text-white'
              : 'bg-gray-200 text-black'
          }`}
          onClick={(event) => onClick(event)}
        >
          {item}
        </button>
      ))}
    </>
  );
};

export default Capsules;
