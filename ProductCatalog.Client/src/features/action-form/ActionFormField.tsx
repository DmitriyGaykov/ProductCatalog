import {FC, useEffect} from "react";

export type ActionFormFieldProps = {
  label: string,
  onValueChanged: (value: string) => void,
  className?: string,
  labelClassName?: string,
  inputClassName?: string,
  defaultValue?: string,
  type?: string,
}

export const ActionFormField: FC<ActionFormFieldProps> = ({
                                                            label,
                                                            onValueChanged,
                                                            className,
                                                            labelClassName,
                                                            inputClassName,
                                                            defaultValue,
                                                            type
                                                          }) => {
  useEffect(() => {
    if (defaultValue)
      onValueChanged?.(defaultValue);
  }, []);

  return (
    <div className={`d-flex align-items-center justify-content-between gap-1 w-100 ${className || ""}`}>
      <span className={`text-size-3 text-color ${labelClassName}`}>{label}</span>
      <input className={`form-text rounded-2 p-1 text-size-3 text-color ${inputClassName || ""}`}
             type={type}
             defaultValue={defaultValue}
             onChange={e => onValueChanged?.(e.target.value)}/>
    </div>
  )
}