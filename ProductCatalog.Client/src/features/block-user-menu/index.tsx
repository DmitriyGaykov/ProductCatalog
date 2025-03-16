import {Block} from "../../models";
import {FC, useCallback, useId, useState} from "react";
import {ActionForm, ActionFormFieldProps} from "../action-form";
import {useBlockUserMutation} from "../../store";
import {toast} from "react-toastify";
import {extractErrors} from "../../utils";

export type BlockUserMenuProps = {
  userId: string;
  onBlock?: (block: Block) => void;
  onCancel?: () => void;
}

export const BlockUserMenu: FC<BlockUserMenuProps> = ({userId, onCancel, onBlock}) => {
  const blockId = useId();

  const [blockUser, { isLoading }] = useBlockUserMutation()

  const [reason, setReason] = useState("");
  const [errors, setErrors] = useState<string[]>([]);

  const _blockUser = useCallback(async () => {
    try {
      if (!reason)
        return toast.warning('Введите причину блокировки');

      const { data, error } = await blockUser({ userId, reason });
      if (error) {
        const errors = extractErrors(error);
        setErrors(errors);
        return;
      }

      onBlock?.(data);
    } catch {
      toast.error('Ошибка при блокировки пользователя')
    }
  }, [blockUser, userId, onBlock, reason])

  const fields: ActionFormFieldProps[] = [
    {
      label: 'Причина: ',
      type: 'text',
      onValueChanged: setReason,
      inputClassName: 'width-250',
    },
  ];

  return (
    <div
      id={blockId}
      className="d-flex align-items-center blur-dark-bg justify-content-center min-vh-100 min-vw-100 position-absolute"
      style={{top: 0, left: 0}}
      onClick={e => (e.target as any)['id'] === blockId && onCancel?.()}
    >
      <ActionForm fields={fields}
                  title={`Блокировка пользователя`}
                  showCancel={true} onCancel={onCancel} onSubmit={_blockUser} className="max-width-400"
                  errors={errors}
                  blockSubmitButton={isLoading} submitButtonText="Заблокировать"/>
    </div>
  )
}