import { useState } from 'react';

const usePagination = (
  arrayLength: number,
  take: number
): {
  numberOfElements: number;
  showMore: () => void;
  showLess: () => void;
} => {
  let initialState: number;
  if (arrayLength < 0) {
    initialState = 0;
  } else if (take < 0) {
    initialState = arrayLength;
  } else {
    initialState = take;
  }
  const [numberOfElements, setNumberOfElement] = useState(initialState);

  const showMore = (): void => {
    if (take < 0) {
      return;
    }
    if (numberOfElements + take >= arrayLength) {
      setNumberOfElement(arrayLength);
      return;
    }
    setNumberOfElement((prevState) => prevState + take);
  };

  const showLess = (): void => {
    if (take < 0) {
      return;
    }
    if (numberOfElements <= take) {
      return;
    }
    if (numberOfElements - take <= take) {
      setNumberOfElement(take);
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
