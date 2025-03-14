import {User} from "../../../models";
import DeleteSvg from "../../../assets/svg/delete-3-svgrepo-com.svg";
import {FC, useCallback} from "react";
import {useRemoveUser} from "../../../hooks";

export type RemoveUserBtnProps = {
  userId: string;
  onRemove: (user: User) => void;
}

export const RemoveUserBtn: FC<RemoveUserBtnProps> = ({ userId, onRemove }) => {
  const {
    removeUser
  } = useRemoveUser()

  const onClick = useCallback(async () => {
    try {
      if (!confirm('Вы уверены, что хотите удалить пользователя?'))
        return;

      const user = await removeUser(userId)
      if (user?.deletedAt != null)
        return onRemove(user);
    } catch {
      return;
    }
  }, [userId, onRemove, removeUser])

  return (
    <img src={DeleteSvg} className="cursor-pointer" alt="Delete" width={24} height={24} onClick={onClick}/>
  )
}