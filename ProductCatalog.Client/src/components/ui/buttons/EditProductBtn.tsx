import {Category, Product} from "../../../models";
import {FC,} from "react";
import {useMenu} from "../../../hooks";
import EditSvg from "../../../assets/svg/edit-pencil-line-01-svgrepo-com.svg";
import {EditProductMenu} from "../../../features";

export type EditProductBtnProps = {
  product: Product;
  categories: Category[];
  onCompleted?: (product: Product) => void;
}

export const EditProductBtn: FC<EditProductBtnProps> = ({product, categories, onCompleted}) => {
  const [showEditMenu, toggleEditMenu] = useMenu();

  return (
    <>
      <img src={EditSvg} className="cursor-pointer" alt="Edit product" width={18} height={18} onClick={toggleEditMenu}/>
      {
        showEditMenu &&
          <EditProductMenu product={product} categories={categories} onEdit={(c) => {
            toggleEditMenu();
            onCompleted?.(c);
          }} onCancel={toggleEditMenu}/>
      }
    </>
  )
}