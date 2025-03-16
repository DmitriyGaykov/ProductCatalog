import {Category, Product} from "../../../models";
import {FC} from "react";
import {useMenu} from "../../../hooks";
import AddSvg from "../../../assets/svg/add-circle-svgrepo-com.svg";
import {AddProductMenu} from "../../../features/add-product-menu";

export type AddProductBtnProps = {
  categories: Category[],
  onComplete?: (product: Product) => void;
}

export const AddProductBtn: FC<AddProductBtnProps> = ({categories, onComplete}) => {
  const [showAddMenu, toggleAddMenu] = useMenu();

  return (
    <>
      <div className="d-flex align-items-center gap-1 cursor-pointer" onClick={toggleAddMenu}>
        <img src={AddSvg} className="cursor-pointer" alt="Edit category" width={23} height={23} />
        Добавить продукт
      </div>
      {
        showAddMenu &&
          <AddProductMenu
              categories={categories}
              onAdd={(p) => {
                toggleAddMenu();
                onComplete?.(p);
              }} onCancel={toggleAddMenu}/>
      }
    </>
  )
}