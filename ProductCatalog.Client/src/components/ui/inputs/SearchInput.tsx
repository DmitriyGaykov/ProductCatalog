import {FC} from "react";
import SearchSvg from './../../../assets/svg/search-svgrepo-com.svg'

export type SearchInputProps = {
  placeHolder?: string;
  onSearch?: () => void;
  onValueChanged?: (value: string) => void;
}

export const SearchInput: FC<SearchInputProps> = ({placeHolder, onSearch, onValueChanged}) => {
  return (
    <div className="d-flex gap-1 align-items-center">
      <img src={SearchSvg} className="cursor-pointer" alt="Search" width={20} height={20} onClick={onSearch}/>
      <input className="form-text text-color text-size-1 rounded-2 p-1 width-250" placeholder={placeHolder}
             onChange={e => onValueChanged?.(e.target.value)}/>
    </div>
  )
}