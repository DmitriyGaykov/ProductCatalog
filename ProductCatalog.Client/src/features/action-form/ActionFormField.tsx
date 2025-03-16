import {FC, useEffect} from "react";

export type ActionFormFieldProps = {
  label?: string,
  onValueChanged?: (value: string) => void,
  className?: string,
  labelClassName?: string,
  inputClassName?: string,
  defaultValue?: string,
  type?: string,
  options?: string[] | {
    key: string;
    value: string;
  }[]
}

export const ActionFormField: FC<ActionFormFieldProps> = ({
                                                            label,
                                                            onValueChanged,
                                                            className,
                                                            labelClassName,
                                                            inputClassName,
                                                            defaultValue,
                                                            type,
                                                            options
                                                          }) => {
  useEffect(() => {
    if (!defaultValue)
      return;

    const value = type !== 'select' || typeof options?.[0] === 'string' ?
      defaultValue :
      (options as { key: string, value?: string }[])?.find((o: {
        key: string,
        value?: string
      }) => o.value === defaultValue)?.key || "";

    onValueChanged?.(value);
  }, []);

  return (
    <div className={`d-flex align-items-center justify-content-between gap-1 w-100 ${className || ""}`}>
      <span className={`text-size-3 text-color ${labelClassName}`}>{label || ""}</span>
      {
        type !== 'select' ?
          <input className={`form-text rounded-2 p-1 text-size-3 text-color ${inputClassName || ""}`}
                 type={type}
                 defaultValue={defaultValue}
                 onChange={e => onValueChanged?.(e.target.value)}/> :
          <select className={`form-text rounded-2 p-1 text-size-3 text-color ${inputClassName || ""}`}
                  defaultValue={defaultValue}
                  onChange={e => onValueChanged?.(
                    typeof options?.[0] === 'string' || !options ?
                      e.target.value :
                      (options as { key: string, value?: string }[])?.find((o: {
                        key: string,
                        value?: string
                      }) => o.value === e.target.value)?.key || ""
                  )}>
            {
              options?.map(o => (
                typeof o === 'string' ?
                  <option key={o}>{o}</option> :
                  <option key={o.key}>{o.value}</option>
              ))
            }
          </select>
      }
    </div>
  )
}