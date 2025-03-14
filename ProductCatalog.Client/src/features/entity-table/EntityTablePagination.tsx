import { FC } from "react";

export type EntityTablePaginationProps = {
  countPages: number;
  onPageChanged: (page: number) => void;
  currentPage: number;
};

export const EntityTablePagination: FC<EntityTablePaginationProps> = ({ countPages, onPageChanged, currentPage }) => {
  if (countPages <= 1) return null;

  const handlePageClick = (page: number) => {
    if (page !== currentPage) {
      onPageChanged(page);
    }
  };

  return (
    <tfoot>
    <tr>
      <td colSpan={100} className="text-center">
        <nav>
          <ul className="pagination justify-content-center my-2">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button className="page-link" onClick={() => handlePageClick(currentPage - 1)}>
                «
              </button>
            </li>

            {Array.from({ length: countPages }, (_, i) => (
              <li key={i} className={`page-item ${currentPage === i + 1 ? "active" : ""}`}>
                <button className="page-link" onClick={() => handlePageClick(i + 1)}>
                  {i + 1}
                </button>
              </li>
            ))}

            <li className={`page-item ${currentPage === countPages ? "disabled" : ""}`}>
              <button className="page-link" onClick={() => handlePageClick(currentPage + 1)}>
                »
              </button>
            </li>
          </ul>
        </nav>
      </td>
    </tr>
    </tfoot>
  );
};
