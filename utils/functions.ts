export const handleInputData = (
  event:
    | React.ChangeEvent<HTMLInputElement>
    | React.ChangeEvent<HTMLTextAreaElement>,
  fn: (text: string) => void
): void => {
  fn(event.target.value);
};

export const handleButtonData = (
  event: React.MouseEvent<HTMLButtonElement>,
  fn: (text: string) => void
): void => {
  fn(event.currentTarget.textContent?.toLowerCase() ?? '');
};

export const checkIsLengthIsGreaterThanZero = (
  text: string | string[],
  counter: number
): number => {
  if (text.length === 0) {
    counter += 1;
  }

  return counter;
};
