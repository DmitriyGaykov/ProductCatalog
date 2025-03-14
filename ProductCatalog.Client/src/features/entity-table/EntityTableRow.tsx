import {CSSProperties, FC} from "react";
import {EntityTableColumn, EntityTableColumnProps} from "./EntityTableColumn.tsx";

type EntityTableRow = Omit<EntityTableColumnProps, 'entity'>

export type EntityTableRowProps = {
  entity: any;
  columns: EntityTableColumnProps[];
  className?: string;
  style?: CSSProperties;
}

export const EntityTableRow: FC<EntityTableRowProps> = ({entity, columns, className, style}) => {
  return (
    <tr className={`border border-1 border-black ${className}`} style={style}>
      {
        columns.map(c => (
          <EntityTableColumn {...c} entity={entity} key={((typeof c.dataField === 'function' ? c.dataField?.(entity)  : c.dataField) as string)}/>
        ))
      }
    </tr>
  )
}