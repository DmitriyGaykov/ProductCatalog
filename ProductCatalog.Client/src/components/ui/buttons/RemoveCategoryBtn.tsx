import DeleteSvg from "../../../assets/svg/delete-3-svgrepo-com.svg";
import {FC, useCallback} from "react";
import {Category} from "../../../models";
import {useRemoveCategoryMutation} from "../../../store";
import {toast} from "react-toastify";
import {extractErrors} from "../../../utils";

export type RemoveCategoryBtnProps = {
  category: Category;
  onRemove?: (category: Category) => void;
}

export const RemoveCategoryBtn: FC<RemoveCategoryBtnProps> = ({ category, onRemove }) => {
  const [removeCategory] = useRemoveCategoryMutation();

  const onClick = useCallback(async () => {
    if (!onRemove)
      return;

    if (!confirm('Вы точно хотите удалить категорию?'))
      return;

    try {
      const { data, error } = await removeCategory({ categoryId: category.id!});

      if (error) {
        const errors = extractErrors(error);
        errors.forEach(e => toast.error(e))
        return;
      }

      onRemove?.(data);
    } catch {
      toast.error('Ошибка при удалении категории')
    }
  }, [category, onRemove, removeCategory]);

  return (
    <img src={DeleteSvg} className="cursor-pointer" alt="Delete" width={16} height={16} onClick={onClick}/>
  )
}