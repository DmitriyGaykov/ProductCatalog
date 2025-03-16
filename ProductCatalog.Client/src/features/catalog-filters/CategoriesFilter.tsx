import {useGetCategories} from "../../hooks";
import {FC, useCallback, useEffect} from "react";
import {Category, Roles} from "../../models";
import {CategoryFilterButton} from "./CategoryFilterButton.tsx";
import {AddCategoryBtn, SpinnerLoader} from "../../components";
import {useCurrentUser} from "../../store";

const CATEGORIES_LIMIT = 30;

export type CategoryFilterProps = {
  onCategories?: (categories: Category[]) => void;
  onCategoryRemove?: (category: Category) => void;
}

export const CategoriesFilter: FC<CategoryFilterProps> = ({onCategories, onCategoryRemove}) => {
  const {
    categories,
    countEntities,
    isLoading,
    getCategories,
    getYet,
    edit,
    add,
    remove
  } = useGetCategories();

  const currentUser = useCurrentUser()

  const _onCategoryRemove = useCallback((category: Category) => {
    onCategoryRemove?.(category);
    remove(category);
  }, [remove,])

  useEffect(() => {
    getCategories({limit: CATEGORIES_LIMIT}).then();
  }, []);

  useEffect(() => {
    onCategories?.(categories);

    if (countEntities != null && categories.length < countEntities)
      getYet().then();
  }, [categories]);

  return (
    <div className="w-100 p-2 d-flex gap-1 overflow-x-auto align-items-center scroll-container-x">
      <CategoryFilterButton category={{name: 'Все категории'}}/>

      {
        categories && categories.length > 0 &&
        categories.map(c => (
          <CategoryFilterButton category={c}
                                onRemove={_onCategoryRemove} onEdit={edit} key={c.id}/>
        ))
      }

      {
        currentUser!.role === Roles.AdvancedUser &&
          <AddCategoryBtn onComplete={add}/>
      }

      {
        isLoading &&
          <SpinnerLoader/>
      }
    </div>
  )
}