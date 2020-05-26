import React from "react";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";
import styles from "../../styles/Layout/_listTable.module.scss";
const PaginationComponent = ({
  currentPage,
  pageSize,
  totalCount,
  onChangePage
}) => {
  const totalPage = Math.ceil(totalCount / pageSize);
  //   Ví dụ totalPage = 5 => [0, 1, 2, 3, 4]
 
  const pages = [...Array(totalPage).keys()];
  return (
    <Pagination >
      {pages.map(page => (
        <PaginationItem  className={ currentPage === (page+1) ? styles.pagination_focus : ""} key={page}>
          <PaginationLink
           onClick={() => onChangePage(page + 1)}>
            {page + 1}
          </PaginationLink>
        </PaginationItem>
      ))}
    </Pagination>
  );
};


export default PaginationComponent;