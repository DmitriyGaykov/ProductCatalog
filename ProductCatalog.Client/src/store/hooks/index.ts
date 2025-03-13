import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./../store";

// Хук для типизированного dispatch
export const useAppDispatch: () => AppDispatch = useDispatch;

// Хук для типизированного selector
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useCurrentUser = () => useAppSelector(state => state.auth.currentUser);