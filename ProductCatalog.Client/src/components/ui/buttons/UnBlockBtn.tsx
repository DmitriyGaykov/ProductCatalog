import {Block} from "../../../models";
import {FC, useCallback} from "react";
import UnBlockSvg from './../../../assets/svg/unblock-svgrepo-com.svg';
import {useUnBlockUserMutation} from "../../../store";
import {extractErrors} from "../../../utils";
import {toast} from "react-toastify";

export type UnBlockBtnProps = {
  blockId: string;
  onUnBlock: (block: Block) => void;
}

export const UnBlockBtn: FC<UnBlockBtnProps> = ({ blockId, onUnBlock }) => {
  const [unBlock] = useUnBlockUserMutation();

  const _unBlock = useCallback(async () => {
    try {
      const { data, error } = await unBlock({ blockId });
      if (error) {
        const errors = extractErrors(error);
        errors.forEach(e => toast.error(e));
        return;
      }

      onUnBlock(data);
    } catch {
      toast.error('Ошибка при блокировки пользователя')
    }
  }, [unBlock, blockId, onUnBlock]);

  return (
    <img src={UnBlockSvg} className="cursor-pointer" alt="Block" width={24} height={24}
         onClick={_unBlock}/>
  )
}