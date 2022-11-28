import usePagination from '../../hooks/usePagination';
import { renderHook, act } from '@/@testing-library/react';

describe('usePagination hook', () => {
  it('should return 0 when array length is 0 and take is 0', () => {
    const { result } = renderHook(() => usePagination(0, 0));
    expect(result.current.numberOfElements).toBe(0);
  })

  it('should return 10 when array length is not positive number but take is 10', () => {
    const { result } = renderHook(() => usePagination(-10, 10));
    expect(result.current.numberOfElements).toBe(0);
  })

  it('should return 10 when \'take\' argument is 10', () => {
    const { result } = renderHook(() => usePagination(14, 10));
    expect(result.current.numberOfElements).toBe(10);
  })

  it('should return 10 when \'take\' is 5 and showMore fn is executed once', () => {
    const { result } = renderHook(() => usePagination(14, 5));
    act(() => {
      result.current.showMore();
    })
    expect(result.current.numberOfElements).toBe(10);
  })

  it('should return array length which is 11', () => {
    const { result } = renderHook(() => usePagination(11, 10));
    act(() => {
      result.current.showMore();
      result.current.showMore();
    })
    expect(result.current.numberOfElements).toBe(11);
  })

  it('should return number of \'take\' argument when use showLess fn to occur situation that \'numberOfElements\' is lower than \'take\'', () => {
    const { result } = renderHook(() => usePagination(10,5));
    act(() => {
      result.current.showLess();
      result.current.showLess();
      result.current.showLess();
    })
    expect(result.current.numberOfElements).toBe(10-5);
  })

  it('should return 0 when \'take\' is a negative number', () => {
    const { result } = renderHook(() => usePagination(10, -5));
    expect(result.current.numberOfElements).toBe(10);
  })

  it('should return 10 (arrayLength) when take is a negative number', () => {
    const { result } = renderHook(() => usePagination(10, -5));
    act(() => {
      result.current.showLess();
      result.current.showLess();
    })
    expect(result.current.numberOfElements).toBe(10);
  })
})
