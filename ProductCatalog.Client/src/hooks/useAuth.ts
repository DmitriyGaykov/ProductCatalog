import {SignInParams, useAppDispatch, useSignInMutation, signIn as signInAction, logout} from "../store";
import {useCallback} from "react";
import {extractErrors} from "../utils";

export type UseAuthParams = {
  onErrors?: (errors: string[]) => void;
}

export const useAuth = ({onErrors}: UseAuthParams = {}) => {
  const [signIn, {isLoading}] = useSignInMutation()

  const dispatch = useAppDispatch()

  const _signIn = useCallback(async ({email, password}: SignInParams) => {
    try {
      const {data, error} = await signIn({email, password});

      if (error) {
        const errors = extractErrors(error);
        onErrors?.(errors);
        return;
      }

      dispatch(signInAction(data));
    } catch (e) {
      onErrors?.(["Ошибка авторизации"]);
    }
  }, [signIn, onErrors]);

  const _logout = useCallback(() => {
    dispatch(logout())
  }, [])

  return {
    signIn: _signIn,
    logout: _logout,
    isLoading: isLoading,
  }
}