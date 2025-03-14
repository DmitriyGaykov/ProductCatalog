import {useRemoveUserMutation} from "../store";
import {useCallback} from "react";
import {toast} from "react-toastify";
import {extractErrors} from "../utils";

export const useRemoveUser = () => {
  const [removeUser, { isLoading }] = useRemoveUserMutation();

  const _removeUser = useCallback(async (userId: string) => {
    try {
      const {data, error} = await removeUser({ userId })
      if (error) {
        const errors = extractErrors(error);
        errors.forEach(e => toast.error(e));
        return;
      }

      return data;
    } catch (e) {
      toast.error("Ошибка при удалении пользователя")
    }
  },[removeUser]);

  return {
    removeUser: _removeUser,
    isLoading,
  }
}