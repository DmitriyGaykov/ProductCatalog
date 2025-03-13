import {FC} from "react";
import {ActionFormField, ActionFormFieldProps} from "./ActionFormField.tsx";

export type ActionFormProps = {
  title?: string;
  fields: ActionFormFieldProps[],
  onSubmit?: () => void;
  showCancel?: boolean;
  onCancel?: () => void;
  className?: string;
  submitButtonText?: string;
  errors?: string[];
  blockSubmitButton?: boolean;
}

export const ActionForm: FC<ActionFormProps> = ({title, fields, errors, onSubmit, blockSubmitButton, showCancel, submitButtonText, onCancel, className}) => {
  return (
    <div className={`d-flex flex-column gap-2 p-2 border border-1 rounded-2 second-bg-color ${className || ""}`}>
      <h2 className="text-color text-size-1">{ title || 'Авторизация' }</h2>

      {
        fields.map(f => (
          <ActionFormField {...f} key={f.label} />
        ))
      }

      {
        errors?.map(e => (
          <div className="bg-danger bg-opacity-25 text-color p-1 rounded-2" key={e}>{e}</div>
        ))
      }

      <div className="d-flex gap-1 align-items-center">
        <button className="btn btn-success" onClick={() => !blockSubmitButton && onSubmit?.()}>{submitButtonText || "Подтвердить"}</button>
        {
          showCancel &&
          <button className="btn btn-secondary" onClick={onCancel}>Отмена</button>
        }
      </div>
    </div>
  )
}