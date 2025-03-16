import type { RootState } from '@/store/store';
import { TypedUseSelectorHook, useSelector } from 'react-redux';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default useAppSelector;
