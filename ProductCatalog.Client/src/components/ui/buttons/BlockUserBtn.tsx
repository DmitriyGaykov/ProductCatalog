import {Block} from "../../../models";
import {FC, useCallback} from "react";
import BlockSvg from "../../../assets/svg/block-svgrepo-com.svg";
import {useMenu} from "../../../hooks";
import {BlockUserMenu} from "../../../features";

export type BlockUserBtnProps = {
  userId: string;
  onBlock: (block: Block) => void
}

export const BlockUserBtn: FC<BlockUserBtnProps> = ({userId, onBlock}) => {
  const [showBlockMenu, toggleBlockMenu] = useMenu();

  const _onBlock = useCallback((block: Block) => {
    onBlock?.(block);
    toggleBlockMenu();
  }, [onBlock, toggleBlockMenu])

  return (
    <>
      <img src={BlockSvg} className="cursor-pointer" alt="Block" width={24} height={24} onClick={toggleBlockMenu}/>
      {
        showBlockMenu &&
          <BlockUserMenu userId={userId} onBlock={_onBlock} onCancel={toggleBlockMenu}/>
      }
    </>
  )
}