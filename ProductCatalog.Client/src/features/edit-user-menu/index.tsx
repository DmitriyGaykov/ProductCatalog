import {Roles, User} from "../../models";
import {FC, useId, useState} from "react";
import {ActionForm, ActionFormFieldProps} from "../action-form";
import {useEditUser} from "../../hooks";
import {toast} from "react-toastify";

export type EditUserMenuProps = {
  user: User,
  onCancel: () => void,
  onEdit: (user: User) => void,
}

export const EditUserMenu: FC<EditUserMenuProps> = ({user, onEdit, onCancel}) => {
  const blockId = useId();

  const {
    errors,
    isLoading,
    editUser
  } = useEditUser();

  const [role, setRole] = useState(user.role);
  const [password, setPassword] = useState<string | null >(null);

  const onSubmit = () => {
    if (role === user.role && password?.trim()?.length == null) {
      return toast.warning('Вы не изменили никаких данных!');
    }

    editUser(user.id, {
      role,
      password: password as string
    }).then(u => u?.id && onEdit?.(u));
  }

  const fields: ActionFormFieldProps[] = [
    {
      label: 'Роль: ',
      type: 'select',
      onValueChanged: setRole,
      defaultValue: user.role,
      inputClassName: 'width-250',
      options: [Roles.User, Roles.AdvancedUser, Roles.Admin]
    },
    {
      label: "Пароль: ",
      type: 'text',
      onValueChanged: setPassword,
      defaultValue: undefined,
      inputClassName: 'width-250'
    }
  ]

  return (
    <div
      id={blockId}
      className="d-flex align-items-center blur-dark-bg justify-content-center min-vh-100 min-vw-100 position-absolute"
      style={{top: 0, left: 0}}
      // @ts-ignore
      onClick={e => e.target.id === blockId && onCancel()}
    >
      <ActionForm fields={fields}
                  title={`Изменение информации о пользователе ${user.firstName + " " + (user.lastName || "")}`}
                  showCancel={true} onCancel={onCancel} onSubmit={onSubmit} className="max-width-400" errors={errors}
                  blockSubmitButton={isLoading} submitButtonText="Редактировать"/>
    </div>
  )
}