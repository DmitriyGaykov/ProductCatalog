import {useEffect, useState} from "react";
import {LocalStorageKeys} from "../config.ts";
import {logout, signIn, useAppDispatch} from "../store";

export const useStartAuth = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const dispatch = useAppDispatch();

  useEffect(() => {
    try {
      const accessToken = localStorage.getItem(LocalStorageKeys.AccessTokenKey);
      const expiresAt = localStorage.getItem(LocalStorageKeys.ExpiresAtKey);
      const user = JSON.parse(localStorage.getItem(LocalStorageKeys.UserKey) || "");

      if (accessToken && expiresAt && user && new Date(expiresAt) > new Date()) {
        dispatch(signIn({ accessToken, expiresAt, user }));
      } else {
        dispatch(logout());
      }
    } catch {
      //
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { isLoading };
}