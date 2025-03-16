import { ThunkDispatch } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

export const useThunkDispatch = () =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useDispatch<ThunkDispatch<any, any, any>>();

export default useThunkDispatch;
