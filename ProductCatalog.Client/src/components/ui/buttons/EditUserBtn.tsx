import {User} from "../../../models";
import {FC} from "react";
import EditSvg from "../../../assets/svg/edit-pencil-line-01-svgrepo-com.svg";
import {useMenu} from "../../../hooks";
import {EditUserMenu} from "../../../features";

export type EditUserBtnProps = {
  user: User,
  onCompleted?: (user: User) => void;
}

export const EditUserBtn: FC<EditUserBtnProps> = ({user, onCompleted}) => {
  const [showEditMenu, toggleEditMenu] = useMenu();

  return (
    <>
      <img src={EditSvg} className="cursor-pointer" alt="Block" width={24} height={24} onClick={toggleEditMenu}/>
      {
        showEditMenu &&
        <EditUserMenu user={user} onEdit={(u) => {
          toggleEditMenu();
          onCompleted?.(u);
        }} onCancel={toggleEditMenu}/>
      }
    </>
  )
}