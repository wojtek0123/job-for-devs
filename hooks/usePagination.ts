import { useState } from 'react';

const usePagination = (
  arrayLength: number,
  take: number
): {
  numberOfElements: number;
  take: number;
  showMore: () => void;
  showLess: () => void;
} => {
  const [numberOfElements, setNumberOfElement] = useState(take);

  const showMore = (): void => {
    if (numberOfElements > arrayLength) {
      return;
    }
    setNumberOfElement((prevState) => prevState + take);
  };

  const showLess = (): void => {
    if (numberOfElements <= take) {
      return;
    }
    setNumberOfElement((prevState) => prevState - take);
  };

  return {
    numberOfElements,
    take,
    showMore,
    showLess,
  };
};

export default usePagination;
