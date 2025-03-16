import {Category, Roles} from "../../models";
import {FC, useCallback} from "react";
import {useCurrentUser} from "../../store";
import {EditCategoryBtn, RemoveCategoryBtn} from "../../components";
import {useNavigate, useParams} from "react-router-dom";

export type CategoryFilterButtonProps = {
  category: Category;
  onClick?: (category: Category) => void;
  onRemove?: (category: Category) => void;
  onEdit?: (category: Category) => void;
}

export const CategoryFilterButton: FC<CategoryFilterButtonProps> = ({
                                                                      category,
                                                                      onClick,
                                                                      onRemove,
                                                                      onEdit
                                                                    }) => {
  const currentUser = useCurrentUser();
  const {categoryId} = useParams();
  const navigate = useNavigate();

  const _onClick = useCallback(() => {
    onClick?.(category);
    navigate(`/catalog/${category?.id || ""}`)
  }, [onClick, category, navigate])

  return (
    <div
      className={"d-flex align-items-center gap-1 cursor-pointer p-1 border border-1 rounded-2 " + (categoryId == category.id ? "border-info" : 'border-black')}
      onClick={_onClick}>
      <span className="text-color text-size-3">{category.name}</span>
      {
        currentUser && currentUser.role === Roles.AdvancedUser &&  currentUser.id === category.userId &&
          <div className="d-flex gap-1 align-items-center">
              <RemoveCategoryBtn category={category} onRemove={onRemove}/>
              <EditCategoryBtn category={category} onCompleted={onEdit}/>
          </div>
      }
    </div>
  )
}