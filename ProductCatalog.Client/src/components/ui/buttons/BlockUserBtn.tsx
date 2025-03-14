import {Block} from "../../../models";
import {FC, useCallback} from "react";
import BlockSvg from "../../../assets/svg/block-svgrepo-com.svg";
import {useBlockUserMutation} from "../../../store";
import {toast} from "react-toastify";
import {extractErrors} from "../../../utils";

export type BlockUserBtnProps = {
  userId: string;
  onBlock: (block: Block) => void
}

export const BlockUserBtn: FC<BlockUserBtnProps> = ({ userId, onBlock }) => {
  const [blockUser] = useBlockUserMutation();

  const _blockUser = useCallback(async () => {
    try {
      const reason = prompt("Введите причину блокировки")?.trim();
      if (!reason)
        return toast.warning('Введите причину блокировки');

      const { data, error } = await blockUser({ userId, reason });
      if (error) {
        const errors = extractErrors(error);
        errors.forEach(e => toast.error(e));
        return;
      }

      onBlock(data);
    } catch {
      toast.error('Ошибка при блокировки пользователя')
    }
  }, [blockUser, userId, onBlock])

  return (
    <img src={BlockSvg} className="cursor-pointer" alt="Block" width={24} height={24} onClick={_blockUser}/>
  )
}