import React, {FC, useCallback, useId} from "react";

export type LabelCheckBoxProps = {
  label?: string;
  onValueChanged?: (checked: boolean) => void;
};

export const LabelCheckBox: FC<LabelCheckBoxProps> = ({ label, onValueChanged }) => {
  const id = useId()

  const onChanged = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onValueChanged?.(e.target.checked);
  }, [onValueChanged]);

  return (
    <label className="d-flex align-items-center gap-1 text-size-3 text-color" htmlFor={id}>
      <input type="checkbox" className="" id={id} onChange={onChanged} />
      <span>{label || ""}</span>
    </label>
  );
};
