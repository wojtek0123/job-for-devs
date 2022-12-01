const useSalaryError = (enteredMinSalary: string, enteredMaxSalary: string, enteredExactSalary: string): { numberOfErrors: number, errorMessage: string } => {
  if (enteredMinSalary === '' && enteredMaxSalary === '' && enteredExactSalary === '') {
    return {
      numberOfErrors: 1,
      errorMessage: 'To pole jest wymagane'
    }
  }

  if (
    enteredExactSalary !== '' &&
    (enteredMinSalary !== '' || enteredMaxSalary !== '')
  ) {
    return {
      numberOfErrors: 1,
      errorMessage: 'Wybierz widełki lub dokładną wartość'
    }
  }

  if (enteredMinSalary !== '' && enteredMaxSalary !== '' && enteredExactSalary === '') {
    if (+enteredMinSalary >= +enteredMaxSalary) {
      return {
        numberOfErrors: 1,
        errorMessage: 'Wartość maks. musi być większa od min.'
      }
    }
  }

  if (
    (enteredMinSalary === '' && enteredMaxSalary !== '') ||
    (enteredMinSalary !== '' && enteredMaxSalary === '')
  ) {
    return {
      numberOfErrors: 1,
      errorMessage: 'Uzupełnij widełki lub wpisz tylko dokładną wartość'
    }
  }

  return {
    numberOfErrors: 0,
    errorMessage: ''
  }
}

export default useSalaryError;
