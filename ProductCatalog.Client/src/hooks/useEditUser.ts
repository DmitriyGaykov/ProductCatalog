import {EditUserParams, useEditUserMutation} from "../store";
import {useCallback, useState} from "react";
import {extractErrors} from "../utils";
import {User} from "../models";

export const useEditUser = () => {
  const [editUser, { isLoading }] = useEditUserMutation();

  const [errors, setErrors] = useState<string[]>([]);

  const _editUser = useCallback( async (userId: string, body: Omit<EditUserParams, 'userId'>) => {
    try {
      const { data, error } = await editUser({ userId, ...body });
      if (error) {
        const errors = extractErrors(error);
        setErrors(errors);
        return;
      }

      return data as User;
    } catch {
      setErrors(['Ошибка при обновлении пользователя'])
    }
  }, [editUser])

  return {
    errors,
    isLoading,
    editUser: _editUser,
  }
}