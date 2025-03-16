import {Category} from "../../../models";
import {FC} from "react";
import {useMenu} from "../../../hooks";
import AddSvg from "../../../assets/svg/add-circle-svgrepo-com.svg";
import {AddCategoryMenu} from "../../../features";

export type AddCategoryBtnProps = {
  onComplete?: (category: Category) => void;
}

export const AddCategoryBtn: FC<AddCategoryBtnProps> = ({ onComplete }) => {
  const [showAddMenu, toggleAddMenu] = useMenu();

  return (
    <>
      <img src={AddSvg} className="cursor-pointer" alt="Edit category" width={23} height={23} onClick={toggleAddMenu}/>
      {
        showAddMenu &&
          <AddCategoryMenu onAdd={(c) => {
            toggleAddMenu();
            onComplete?.(c);
          }} onCancel={toggleAddMenu}/>
      }
    </>
  )
}