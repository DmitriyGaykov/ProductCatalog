import {useLazyFindAllProductsQuery} from "../store";
import {useCallback, useState} from "react";
import {Product} from "../models";
import {Params} from "../types/params.ts";
import {getData, getYet, refreshData} from "../utils";

export const useGetProducts = () => {
  const [findAll, {isLoading}] = useLazyFindAllProductsQuery();

  const [products, setProducts] = useState<Product[]>([]);
  const [params, setParams] = useState<Params>({});
  const [errors, setErrors] = useState<string[]>([]);
  const [countEntities, setCountEntities] = useState<number | null>(null);

  return {
    products,
    params,
    errors,
    countEntities,
    isLoading,
    getProducts: getData<Product>({
      getData: findAll as any,
      setParams,
      setData: setProducts,
      setErrors,
      setCountEntities
    }),
    getYet: getYet<Product>({
      params,
      data: products,
      getData: findAll as any,
      setParams,
      setData: setProducts,
      setErrors,
      setCountEntities
    }),
    refresh: refreshData<Product>({
      params,
      getData: findAll as any,
      setParams,
      setData: setProducts,
      setErrors,
      setCountEntities
    }),
    edit: useCallback((product: Product) => {
      setProducts(products.map(p => p.id === product.id ? product : p));
    }, [setProducts, products]),
    add: useCallback((product: Product) => {
      setProducts([product, ...products]);
    }, [setProducts, products]),
    remove: useCallback((..._products: Product[]) => {
      const ids = _products.map(p => p.id);
      setProducts(products.filter(p => !ids.includes(p.id)));
    }, [setProducts, products]),
  }
}