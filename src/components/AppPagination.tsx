import Link from "next/link";
import { useRouter } from "next/router";

import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";

interface AppPaginationProps {
  count: number;
  currentPage: number;
  rootPath: string;
}

function AppPagination({ count, currentPage, rootPath }: AppPaginationProps) {
  const router = useRouter();

  const handleClick = (page: number | null) => {
    router.push({
      pathname: `/${rootPath}`,
      query: {
        ...router.query,
        page,
      },
    });
  };

  return (
    <Pagination
      count={count}
      shape='rounded'
      color='primary'
      page={currentPage}
      renderItem={(item) => (
        <PaginationItem
          {...item}
          onClick={() => handleClick(item.page)}
          selected={item.page === currentPage}
        />
      )}
    />
  );
}

export default AppPagination;
