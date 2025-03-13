import {FC, useCallback, useState} from "react";
import {ActionForm, ActionFormFieldProps} from "../features";
import {useAuth} from "../hooks";

export const AuthPage: FC = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [errors, setErrors] = useState<string[]>([])

  const onErrors = useCallback((errors: string[]) => {
    setErrors(errors)
  }, [])

  const {
    signIn,
    isLoading
  } = useAuth({
    onErrors
  })

  const fields: ActionFormFieldProps[] = [
    {
      label: "Эл. почта: ",
      onValueChanged: setEmail,
      inputClassName: "width-250",
      type: 'email'
    },
    {
      label: "Пароль: ",
      onValueChanged: setPassword,
      inputClassName: "width-250",
      type: 'password'
    }
  ]

  return (
    <div className="d-flex min-vw-100 min-vh-100 first-bg-color align-items-center justify-content-center">
      <ActionForm fields={fields} className="max-width-400" errors={errors} onSubmit={() => {
        if (!isLoading)
          signIn({email, password})
      }}/>
    </div>
  )
}