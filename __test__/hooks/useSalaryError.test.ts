import useSalaryError from '../../hooks/useSalaryError';
import {renderHook} from '@/@testing-library/react';

describe('useSalaryError', () => {
  it('should return 0 errors', function() {
    const { result } = renderHook(() => useSalaryError('1', '2', ''));
    expect(result.current.numberOfErrors).toBe(0);
    expect(result.current.errorMessage).toBe('');
  });

  it('should return \'To pole jest wymagane\'', () => {
    const { result } = renderHook(() => useSalaryError('', '', ''));
    expect(result.current.numberOfErrors).toBe(1);
    expect(result.current.errorMessage).toBe('To pole jest wymagane');
  });

  it('should return \'Wybierz widełki lub dokładną wartość\'', () => {
    const { result } = renderHook(() => useSalaryError('1', '2', '1'));
    expect(result.current.numberOfErrors).toBe(1);
    expect(result.current.errorMessage).toBe('Wybierz widełki lub dokładną wartość');
  });

  it('should return \'Wartość maks. musi być większa od min.\'', () => {
    const { result } = renderHook(() => useSalaryError('2', '1', ''));
    expect(result.current.numberOfErrors).toBe(1);
    expect(result.current.errorMessage).toBe('Wartość maks. musi być większa od min.');
  });

  it('should return \'Uzupełnij widełki lub wpisz tylko dokładną wartość\'', () => {
    const { result } = renderHook(() => useSalaryError('1', '', ''));
    expect(result.current.numberOfErrors).toBe(1);
    expect(result.current.errorMessage).toBe('Uzupełnij widełki lub wpisz tylko dokładną wartość');
  });

  it('should return \'Uzupełnij widełki lub wpisz tylko dokładną wartość\'', () => {
    const { result } = renderHook(() => useSalaryError('', '1', ''));
    expect(result.current.numberOfErrors).toBe(1);
    expect(result.current.errorMessage).toBe('Uzupełnij widełki lub wpisz tylko dokładną wartość');
  });

  it('should return \'Uzupełnij widełki lub wpisz tylko dokładną wartość\'', () => {
    const { result } = renderHook(() => useSalaryError('', '', '1'));
    expect(result.current.numberOfErrors).toBe(0);
    expect(result.current.errorMessage).toBe('');
  });

  it('should return \'Uzupełnij widełki lub wpisz tylko dokładną wartość\'', () => {
    const { result } = renderHook(() => useSalaryError('', '1', '1'));
    expect(result.current.numberOfErrors).toBe(1);
    expect(result.current.errorMessage).toBe('Wybierz widełki lub dokładną wartość');
  });

  it('should return \'Uzupełnij widełki lub wpisz tylko dokładną wartość\'', () => {
    const { result } = renderHook(() => useSalaryError('1', '', '1'));
    expect(result.current.numberOfErrors).toBe(1);
    expect(result.current.errorMessage).toBe('Wybierz widełki lub dokładną wartość');
  });
})