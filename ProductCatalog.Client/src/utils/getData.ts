import {Params} from "../types/params.ts";
import {extractErrors} from "./extractErrors.ts";

export const getData = <T>({setData, setParams, setCountEntities, setErrors, getData}: {
  getData: (params: Params) => Promise<{ data: [number, ...T[]], error: any }>;
  setData: (data: T[]) => void,
  setParams: (params: Params) => void,
  setCountEntities: (count: number) => void,
  setErrors: (errors: string[]) => void,
}) => {
  return async (params: Params = {page: 1}) => {
    try {
      setParams(params);
      setErrors([])
      const {data, error} = await getData(params);

      if (error) {
        const errors = extractErrors(error);
        setErrors(errors);
        return;
      }

      const countEntities = data[0] as number;
      const _data = data.slice(1) as T[];
      setData(_data);
      setCountEntities(countEntities);
    } catch (e) {
      setErrors(["Ошибка при получении данных"])
    }
  }
}