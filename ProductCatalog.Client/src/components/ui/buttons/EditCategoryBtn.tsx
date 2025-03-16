import {Category} from "../../../models";
import {FC} from "react";
import EditSvg from "../../../assets/svg/edit-pencil-line-01-svgrepo-com.svg";
import {useMenu} from "../../../hooks";
import {EditCategoryMenu} from "../../../features";

export type EditCategoryBtnProps = {
  category: Category,
  onCompleted?: (category: Category) => void;
}

export const EditCategoryBtn: FC<EditCategoryBtnProps> = ({category, onCompleted}) => {
  const [showEditMenu, toggleEditMenu] = useMenu();

  return (
    <>
      <img src={EditSvg} className="cursor-pointer" alt="Edit category" width={18} height={18} onClick={toggleEditMenu}/>
      {
        showEditMenu &&
          <EditCategoryMenu category={category} onEdit={(c) => {
            toggleEditMenu();
            onCompleted?.(c);
          }} onCancel={toggleEditMenu}/>
      }
    </>
  )
}