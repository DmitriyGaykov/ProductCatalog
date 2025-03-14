import {EntityTableColumnProps} from "./EntityTableColumn.tsx";
import {CSSProperties, FC} from "react";
import {EntityTableHeader, EntityTableHeaderProps} from "./EntityTableHeader.tsx";
import {EntityTableRow} from "./EntityTableRow.tsx";
import {EntityTablePagination, EntityTablePaginationProps} from "./EntityTablePagination.tsx";

type EntityTableColumn = Omit<EntityTableColumnProps, 'entity'>

export type EntityTableProps = {
  entities: any[];
  row: {
    columns: EntityTableColumn[];
    className?: string;
    style?: CSSProperties;
  },
  headers: EntityTableHeaderProps[];
  className?: string;
  style?: CSSProperties;
  pagination?: EntityTablePaginationProps;
}

export const EntityTable: FC<EntityTableProps> = ({entities, row, headers, className, style, pagination}) => {
  return (
    <table className={`border border-1 border-black rounded-2 ${className}`} style={style}>
      <thead>
      <tr>
        {
          headers?.map(h => (
            <EntityTableHeader {...h} key={h.label}/>
          ))
        }
      </tr>
      </thead>
      <tbody>
      {
        entities.map(e => (
          <EntityTableRow entity={e} columns={row.columns} style={row.style} className={row.className} key={e.id}/>
        ))
      }
      </tbody>
      {
        pagination &&
        <EntityTablePagination {...pagination } />
      }
    </table>
  )
}