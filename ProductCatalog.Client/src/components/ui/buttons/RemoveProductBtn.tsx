import {Product} from "../../../models";
import {FC, useCallback} from "react";
import {useRemoveProductMutation} from "../../../store";
import {toast} from "react-toastify";
import {extractErrors} from "../../../utils";
import DeleteSvg from "../../../assets/svg/delete-3-svgrepo-com.svg";

export type RemoveProductBtnProps = {
  product: Product;
  onRemove?: (product: Product) => void;
}

export const RemoveProductBtn: FC<RemoveProductBtnProps> = ({ product, onRemove }) => {
  const [removeProduct] = useRemoveProductMutation();

  const onClick = useCallback(async () => {
    try {
      if (!confirm('Вы уверены, что хотите удалить продукт?'))
        return;

      const { data, error } = await removeProduct({
        productId: product.id!
      });

      if (error) {
        const errors = extractErrors(error);
        errors.forEach(e => toast.error(e))
        return;
      }

      onRemove?.(data);
    } catch {
      toast.error("Ошибка при удалении продукта")
    }
  }, [removeProduct, product, onRemove])

  return (
    <img src={DeleteSvg} className="cursor-pointer" alt="Delete" width={16} height={16} onClick={onClick}/>
  )
}