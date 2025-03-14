import {Params} from "../types/params.ts";
import {getData} from "./getData.ts";

export const getYet = <T>({params, data, setData, setParams, setCountEntities, setErrors, getData: _getData}: {
  params: Params,
  data: T[],
  getData: (params: Params) => Promise<{ data: [number, ...T[]], error: any }>;
  setData: (data: T[]) => void,
  setParams: (params: Params) => void,
  setCountEntities: (count: number) => void,
  setErrors: (errors: string[]) => void
}) => {
  return async () => {
    const page = ((params?.page as number) || 1) + 1;
    const _params = {
      ...params,
      page
    }

    const _setData = (_data: T[]) => {
      setData([...data, ..._data]);
    }

    await getData<T>({
      setData: _setData,
      setCountEntities,
      setParams,
      setErrors,
      getData: _getData,
    })(_params);
  }
}