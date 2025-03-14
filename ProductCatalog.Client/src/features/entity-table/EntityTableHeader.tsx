import {CSSProperties, FC} from "react";
import SortSvg from './../../assets/svg/sort-up-svgrepo-com.svg'

export type EntityTableHeaderProps = {
  label: string;
  sortable?: boolean;
  onSorted?: () => void;
  className?: string;
  style?: CSSProperties;
  hide?: boolean;
}

export const EntityTableHeader: FC<EntityTableHeaderProps> = ({label, sortable, onSorted, className, hide, style}) => {
  if (hide)
    return <></>

  return (
    <th>
      <div className={`d-flex gap-1 border border-1 border-black align-items-center ${className}`} style={style}>
        {label}
        {
          sortable &&
            <img src={SortSvg} className="cursor-pointer" alt="Sort By" width={24} height={24} onClick={onSorted}/>
        }
      </div>
    </th>
  )
}