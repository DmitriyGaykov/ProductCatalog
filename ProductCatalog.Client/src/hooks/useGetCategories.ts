import {useLazyFindAllCategoriesQuery} from "../store";
import {useCallback, useState} from "react";
import {Category} from "../models";
import {Params} from "../types/params.ts";
import {getData, getYet, refreshData} from "../utils";

export const useGetCategories = () => {
  const [findAll, {isLoading}] = useLazyFindAllCategoriesQuery();

  const [categories, setCategories] = useState<Category[]>([]);
  const [params, setParams] = useState<Params>({});
  const [errors, setErrors] = useState<string[]>([]);
  const [countEntities, setCountEntities] = useState<number | null>(null);

  return {
    categories,
    params,
    errors,
    countEntities,
    isLoading,
    getCategories: getData<Category>({
      getData: findAll as any,
      setParams,
      setData: setCategories,
      setErrors,
      setCountEntities
    }),
    getYet: getYet<Category>({
      params,
      data: categories,
      getData: findAll as any,
      setParams,
      setData: setCategories,
      setErrors,
      setCountEntities
    }),
    refresh: refreshData<Category>({
      params,
      getData: findAll as any,
      setParams,
      setData: setCategories,
      setErrors,
      setCountEntities
    }),
    edit: useCallback((category: Category) => {
      setCategories(categories.map(c => c.id === category.id ? category : c));
    }, [setCategories, categories]),
    add: useCallback((category: Category) => {
      setCategories([...categories, category].sort((a, b) => a.name!.localeCompare(b.name!)));
    }, [setCategories, categories]),
    remove: useCallback((category: Category) => {
      setCategories(categories.filter(c => c.id !== category.id));
    }, [setCategories, categories]),
  }
}