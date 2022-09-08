import React, { useState } from 'react';

export const stepsInfo = [
  'Szczegóły oferty',
  'Opis oferty',
  'Dane administracyjne',
  'Podgląd',
];

const minStepInForm = 1;
const maxStepInForm = stepsInfo.length;

interface IStepsContext {
  step: number;
  stepInfo: string;
  nextStep: () => void;
  previousStep: () => void;
  jumpToStep: (step: number) => void;
}

const StepsContext = React.createContext<IStepsContext>({
  step: 0,
  stepInfo: '',
  nextStep: () => {},
  previousStep: () => {},
  jumpToStep: (step) => {},
});

export const StepsContextProvider: React.FC<{ children: JSX.Element }> = ({
  children,
}) => {
  const [step, setStep] = useState(1);

  const jumpToStep = (step: number): void => {
    if (step < minStepInForm || step > maxStepInForm) {
      return;
    }
    setStep(step);
  };

  const nextStep = (): void => {
    if (step === maxStepInForm) {
      return;
    }
    setStep((prevState) => prevState + 1);
  };

  const previousStep = (): void => {
    if (step === minStepInForm) {
      return;
    }
    setStep((prevState) => prevState - 1);
  };

  const indexedFromZero = 1;

  const value = {
    step,
    stepInfo: stepsInfo[step - indexedFromZero],
    nextStep,
    previousStep,
    jumpToStep,
  };

  return (
    <StepsContext.Provider value={value}>{children}</StepsContext.Provider>
  );
};

export default StepsContext;
