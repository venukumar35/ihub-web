import { Pagination, ScrollArea, Skeleton } from "@mantine/core";
import React from "react";

type TableProps = {
  columns: string[];
  children: React.ReactNode;
  from: number;
  to: number;
  total: number;
  totalPages: number;
  currentPage: number;
  isShowPagination?: boolean;
  isLoading?: boolean;
  onPageChanged: (page: number) => void;
};

type TableSkeletonProps = {
  columns: string[];
};

export function TableSkeleton({ columns }: TableSkeletonProps) {
  const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <tbody>
      {items.map((i) => (
        <tr key={i} className="border-y border-transparent border-b-slate-100">
          {columns.map((_column, index: number) => (
            <td
              key={index}
              className="border border-slate-100 whitespace-nowrap px-4 py-1.5 lg:px-5"
            >
              <div className="py-1.5">
                <Skeleton width={"50%"} height={8} radius="xl" />
              </div>
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}

export default function Table({
  columns,
  from,
  to,
  total,
  totalPages,
  currentPage,
  onPageChanged,
  isShowPagination,
  children,
  isLoading,
}: TableProps) {
  return (
    <div className="min-w-full shadow-md">
      <ScrollArea>
        <table className="w-full text-left table ">
          <thead className="">
            <tr className="text-xs font-bold">
              {columns.map((column, _index) => (
                <th
                  key={_index}
                  className={`whitespace-nowrap px-4 py-1.5 uppercase text-slate-800 text-xs+ lg:px-5`}
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>

          {isLoading ? (
            <TableSkeleton columns={columns} />
          ) : (
            <tbody>
              {totalPages === 0 && (
                <tr>
                  <td className="text-center py-4" colSpan={columns.length}>
                    No results found
                  </td>
                </tr>
              )}
              {children}
            </tbody>
          )}
        </table>
      </ScrollArea>
      {totalPages > 0 && (isShowPagination ?? true) && (
        <div className="flex pt-4 justify-between items-center">
          <div className="text-gray-700 text-sm">
            Showing From {isLoading ? 0 : from} To {isLoading ? 0 : to} of{" "}
            {isLoading ? 0 : total} results
          </div>
          <div className="p-3">
            <Pagination
              radius="lg"
              total={isLoading ? 0 : totalPages}
              value={isLoading ? 0 : currentPage}
              onChange={isLoading ? () => {} : onPageChanged}
            />
          </div>
        </div>
      )}
    </div>
  );
}
