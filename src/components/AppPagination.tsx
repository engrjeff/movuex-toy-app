import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import Link from 'next/link';

interface AppPaginationProps {
  count: number;
  currentPage: number;
  rootPath: string;
}

function AppPagination({ count, currentPage, rootPath }: AppPaginationProps) {
  return (
    <Pagination
      count={count}
      shape='rounded'
      color='primary'
      page={currentPage}
      renderItem={(item) => (
        <PaginationItem
          component={Link}
          href={`/${rootPath}${
            item.page === 1
              ? ''
              : rootPath.includes('?')
              ? `&page=${item.page}`
              : `?page=${item.page}`
          }`}
          {...item}
          selected={item.page === currentPage}
        />
      )}
    />
  );
}

export default AppPagination;
