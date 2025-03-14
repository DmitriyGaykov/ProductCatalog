import {Params} from "../types/params.ts";
import {getData} from "./getData.ts";

export const refreshData = <T>({params, setData, setParams, setCountEntities, setErrors, getData: _getData}: {
  params: Params,
  getData: (params: Params) => Promise<{ data: [number, ...T[]], error: any }>;
  setData: (data: T[]) => void,
  setParams: (params: Params) => void,
  setCountEntities: (count: number) => void,
  setErrors: (errors: string[]) => void
}) => {
  return async () => {
    await getData<T>({
      setData,
      setCountEntities,
      setParams,
      setErrors,
      getData: _getData,
    })(params);
  }
}