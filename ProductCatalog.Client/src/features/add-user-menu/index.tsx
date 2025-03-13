import {FC, useCallback, useState} from "react";
import {ActionForm, ActionFormFieldProps} from "../action-form";
import {useAddUser} from "../../hooks";

export type AddUserMenu = {
  onCancel?: () => void;
}

export const AddUserMenu: FC<AddUserMenu> = ({onCancel}) => {
  const blockId = 'AddUserMenu'

  const {
    createUser,
    errors,
    isLoading
  } = useAddUser()

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState<string | null>(null)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const fields: ActionFormFieldProps[] = [
    {
      label: "Имя",
      onValueChanged: setFirstName,
      inputClassName: "width-250"
    },
    {
      label: "Фамилия",
      onValueChanged: setLastName,
      inputClassName: "width-250"
    },
    {
      label: "Эл. почта",
      onValueChanged: setEmail,
      inputClassName: "width-250",
      type: 'email'
    },
    {
      label: "Пароль",
      onValueChanged: setPassword,
      inputClassName: "width-250",
      type: 'password'
    },
  ]

  const onBack = useCallback((e: any) => {
    if (e.target.id === blockId)
      onCancel?.();
  }, [onCancel])

  return (
    <div
      id={blockId}
      className="d-flex align-items-center blur-dark-bg justify-content-center min-vh-100 min-vw-100 position-absolute"
      style={{top: 0, left: 0}}
      onClick={onBack}
    >
      <ActionForm title="Добавление нового пользователя" blockSubmitButton={isLoading} errors={errors} fields={fields}
                  className="max-width-400" showCancel={true} onCancel={onCancel} onSubmit={() => createUser({
        firstName, lastName, email, password
      }).then(u => u?.id != null && onCancel?.())}/>
    </div>
  )
}