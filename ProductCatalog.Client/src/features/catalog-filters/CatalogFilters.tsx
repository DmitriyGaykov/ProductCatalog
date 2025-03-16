import {FC} from "react";
import {CategoriesFilter} from "./CategoriesFilter.tsx";
import {Category} from "../../models";
import {SearchInput} from "../../components";
import {ActionFormField} from "../action-form";

export enum SortingTypes {
  Ordered = 'По порядку',
  Expensive = 'Сначала дорогие',
  Cheap = 'Сначала дешевые'
}

export type CatalogFiltersProps = {
  onSearchTextChanged?: (query: string) => void;
  onUserSearchTextChanged?: (query: string) => void;
  onPriceFromChanged?: (priceFrom: number) => void;
  onPriceToChanged?: (priceTo: number) => void;
  onApplied?: () => void;
  onSortingTypeChanged?: (type: SortingTypes) => void;
  onCategories?: (categories: Category[]) => void;
  onCategoryRemove?: (category: Category) => void;
}

export const CatalogFilters: FC<CatalogFiltersProps> = ({
                                                          onSearchTextChanged,
                                                          onPriceFromChanged,
                                                          onPriceToChanged,
                                                          onUserSearchTextChanged,
                                                          onApplied,
                                                          onSortingTypeChanged,
                                                          onCategories,
                                                          onCategoryRemove
                                                        }) => {
  return (
    <div className="w-100 d-flex flex-column gap-2">
      <CategoriesFilter onCategories={onCategories} onCategoryRemove={onCategoryRemove}/>
      <div className="d-flex w-100 gap-2">
        <SearchInput placeHolder="Поиск продукта..." onValueChanged={onSearchTextChanged}/>
        <SearchInput placeHolder="Цена от: " defaultValue={0} placeHolderAsLabel={true} type='number'
                     onValueChanged={v => onPriceFromChanged?.(parseFloat(v))} inputClassName="width-100"/>
        <SearchInput placeHolder="Цена по: " defaultValue={10000} placeHolderAsLabel={true} type='number'
                     onValueChanged={v => onPriceToChanged?.(parseFloat(v))} inputClassName="width-100"/>

        <SearchInput placeHolder="Поиск пользователя..." onValueChanged={onUserSearchTextChanged}/>

        <div>
          <ActionFormField onValueChanged={onSortingTypeChanged as (value: string) => void} type='select'
                           defaultValue='По порядку'
                           options={[SortingTypes.Ordered, SortingTypes.Cheap, SortingTypes.Expensive]}/>
        </div>
      </div>

      <button className="btn btn-success width-150" onClick={onApplied}>Применить</button>
    </div>
  )
}