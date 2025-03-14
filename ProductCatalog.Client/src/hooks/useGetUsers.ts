import {useLazyFindAllUsersQuery} from "../store";
import {useState} from "react";
import {User} from "../models";
import {Params} from "../types/params.ts";
import {getData, getYet, refreshData} from "../utils";

export const useGetUsers = () => {
  const [findAll, {isLoading}] = useLazyFindAllUsersQuery();

  const [users, setUsers] = useState<User[]>([]);
  const [params, setParams] = useState<Params>({});
  const [errors, setErrors] = useState<string[]>([]);
  const [countEntities, setCountEntities] = useState<number | null>(null);

  return {
    users,
    params,
    errors,
    countEntities,
    isLoading,
    getUsers: getData<User>({
      getData: findAll as any,
      setParams,
      setData: setUsers,
      setErrors,
      setCountEntities
    }),
    getYet: getYet<User>({
      params,
      data: users,
      getData: findAll as any,
      setParams,
      setData: setUsers,
      setErrors,
      setCountEntities
    }),
    refresh: refreshData({
      params,
      getData: findAll as any,
      setParams,
      setData: setUsers,
      setErrors,
      setCountEntities
    })
  }
}