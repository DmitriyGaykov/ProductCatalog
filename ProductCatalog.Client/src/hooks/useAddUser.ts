import {CreateUserParams, useCreateUserMutation} from "../store";
import {useCallback, useState} from "react";
import {extractErrors} from "../utils";

export const useAddUser = () => {
  const [createUser, {isLoading}] = useCreateUserMutation();

  const [errors, setErrors] = useState<string[]>([]);

  const _createUser = useCallback(async (body: CreateUserParams) => {
    try {
      const {data, error} = await createUser(body)

      if (error) {
        const errors = extractErrors(error);
        setErrors(errors);
        return;
      }

      return data;
    } catch {
      setErrors(["Ошибка при обращении к сервису"])
    }
  }, [createUser]);

  return {
    createUser: _createUser,
    isLoading,
    errors
  };
}