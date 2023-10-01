import { RxChevronLeft, RxChevronRight, RxDoubleArrowLeft, RxDoubleArrowRight } from 'react-icons/rx'
import { Table } from '@tanstack/react-table'
import { Button } from '~/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select'
import { cn } from '~/utils/classNames'

interface DataTablePaginationProps<TData> {
  table: Table<TData>
  className?: string
}

export function DataTablePagination<TData>({ table, className }: DataTablePaginationProps<TData>) {
  return (
    <div
      className={cn(
        'flex items-center justify-between px-2 max-sm:flex-col max-sm:items-start max-sm:space-y-3',
        className
      )}
    >
      <div className="flex-1 text-sm text-muted-foreground">
        {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s) selected.
      </div>
      <div className="relative flex items-center max-sm:w-full sm:space-x-6 lg:space-x-8 [@media_not_all_and_(min-width:_550px)]:flex-wrap [@media_not_all_and_(min-width:_550px)]:space-y-4">
        <div className="flex items-center space-x-2 max-sm:w-3/5 [@media_not_all_and_(min-width:_550px)]:w-full">
          <p className="text-sm font-medium">Rows per page</p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={value => {
              table.setPageSize(Number(value))
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top" className="bg-white">
              {[5, 10, 20, 30, 40, 50].map(pageSize => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-[100px] items-center justify-center text-sm font-medium [@media_not_all_and_(min-width:_550px)]:w-1/2 [@media_not_all_and_(min-width:_550px)]:justify-start">
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </div>
        <div className="relative flex items-center justify-end space-x-2 [@media_not_all_and_(min-width:_550px)]:w-1/2">
          <Button
            variant="outline"
            className="hidden h-8 w-8 border-current p-0 text-current lg:flex"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to first page</span>
            <RxDoubleArrowLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 border-current p-0 text-current"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to previous page</span>
            <RxChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 border-current p-0 text-current"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to next page</span>
            <RxChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 border-current p-0 text-current lg:flex"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to last page</span>
            <RxDoubleArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
