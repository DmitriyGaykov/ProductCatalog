import {Component, CSSProperties, FC} from "react";

export type EntityTableColumnProps = {
  dataField: ((entity: any) => string | Component | JSX.Element) | string;
  entity?: any;
  className?: string;
  style?: CSSProperties;
  hide?: boolean;
}

export const EntityTableColumn: FC<EntityTableColumnProps> = ({entity, className, hide, dataField, style}) => {
  if (hide)
    return <></>

  return (
    <td className={`border border-1 border-black text-break p-1 ${className}`} style={style}>
      {
        typeof dataField === 'function' ?
          dataField(entity) :
          entity?.[dataField as string]
      }
    </td>
  )
}