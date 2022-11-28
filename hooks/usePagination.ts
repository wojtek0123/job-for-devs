import { useState } from 'react';

const usePagination = (
  arrayLength: number,
  take: number
): {
  numberOfElements: number;
  showMore: () => void;
  showLess: () => void;
} => {
  const [numberOfElements, setNumberOfElement] = useState(arrayLength < 0 ? 0 : take);

  const showMore = (): void => {
    if (numberOfElements + take >= arrayLength) {
      setNumberOfElement(arrayLength);
      return;
    }
    setNumberOfElement((prevState) => prevState + take);
  };

  const showLess = (): void => {
    if (numberOfElements <= take) {
      return;
    }
    if (numberOfElements - take <= 0) {
      setNumberOfElement(0);
      return;
    }
    setNumberOfElement((prevState) => prevState - take);
  };

  return {
    numberOfElements,
    showMore,
    showLess,
  };
};

export default usePagination;
