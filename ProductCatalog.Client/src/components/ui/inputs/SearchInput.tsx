import {FC, useId} from "react";
import SearchSvg from './../../../assets/svg/search-svgrepo-com.svg'

export type SearchInputProps = {
  placeHolder?: string;
  type?: string;
  inputClassName?: string;
  placeHolderAsLabel?: boolean;
  defaultValue?: string | number;

  onSearch?: () => void;
  onValueChanged?: (value: string) => void;
}

export const SearchInput: FC<SearchInputProps> = ({
                                                    placeHolder,
                                                    placeHolderAsLabel,
                                                    inputClassName,
                                                    onSearch,
                                                    onValueChanged,
                                                    type,
                                                    defaultValue
                                                  }) => {
  const blockId = useId();

  return (
    <div className="d-flex gap-1 align-items-center">
      {
        !placeHolderAsLabel ?
          <img src={SearchSvg} className="cursor-pointer" alt="Search" width={20} height={20} onClick={onSearch}/> :
          <label htmlFor={blockId} className="text-size-3">{placeHolder}</label>
      }
      <input className={`form-text text-color text-size-1 rounded-2 p-1 ${inputClassName || " width-250 "}`} type={type}
             placeholder={placeHolderAsLabel ? "" : placeHolder}
             id={blockId}
             defaultValue={defaultValue}
             onChange={e => onValueChanged?.(e.target.value)}/>
    </div>
  )
}