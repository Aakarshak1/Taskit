'use client';

import { useEffect, useState } from 'react';
import { ArrowUpDown } from 'lucide-react';
import { toast } from 'sonner';
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

import TodoActionMenu from './TodoActionMenu';

import { Database } from '@/utils/schema.types';
import { deleteTodo, updateTodoNewStatus } from '@/lib/db';

type TodoType = Database['public']['Tables']['todos']['Row'];

export default function TodosDataTable({ data }: { data: TodoType[] }) {
  const searchParams = useSearchParams();
  const search = searchParams.get('q');
  const router = useRouter();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const columns: ColumnDef<TodoType>[] = [
    {
      accessorKey: 'title',
      header: ({ column }) => {
        return (
          <div className='flex cursor-pointer' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            Title
            <ArrowUpDown className='ml-2 h-4 w-4' />
          </div>
        );
      },
      cell: ({ row }) => (
        <div className='capitalize'>
          <Link href={`/todos/${row.original.id}`}>{row.getValue('title')}</Link>
        </div>
      ),
    },
    {
      accessorKey: 'status',
      header: ({ column }) => {
        return (
          <div className='flex cursor-pointer' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            Status
            <ArrowUpDown className='ml-2 h-4 w-4' />
          </div>
        );
      },
      cell: ({ row }) => {
        return <Badge variant={row.getValue('status')}>{row.getValue('status')}</Badge>;
      },
    },
    {
      accessorKey: 'list',
      header: ({ column }) => {
        return (
          <div className='flex cursor-pointer' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            List
            <ArrowUpDown className='ml-2 h-4 w-4' />
          </div>
        );
      },
      cell: ({ row }) => {
        return <Badge variant={row.getValue('list')}>{row.getValue('list')}</Badge>;
      },
    },
    {
      id: 'actions',
      enableHiding: false,
      cell: ({ row }) => {
        return (
          <TodoActionMenu
            rowData={row.original}
            updateTodoStatus={updateTodoStatus}
            onViewTodo={onViewTodo}
            onDeleteTodo={onDeleteTodo}
          />
        );
      },
    },
  ];

  const onViewTodo = (rowData: TodoType) => {
    router.replace(`todos/${rowData.id}`);
  };

  const updateTodoStatus = async (status: string, id: number) => {
    const { error } = await updateTodoNewStatus(status, id);

    if (error) {
      toast.error(`Unable to update todo`, {
        position: 'top-right',
      });
    }

    toast.success('Todo updated Successfully', {
      position: 'top-right',
    });

    router.refresh();
  };

  const onDeleteTodo = async (rowData: TodoType) => {
    const { error } = await deleteTodo(rowData.id);

    if (error) {
      toast.error(`Unable to delete todo`, {
        position: 'top-right',
      });
    }

    toast.success('Todo deleted Successfully', {
      position: 'top-right',
    });
  };

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  useEffect(() => {
    table.getColumn('title')?.setFilterValue(search);
  }, [search, table]);

  return (
    <>
      <div className='w-full'>
        <div className='rounded-md border'>
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className='h-24 text-center'>
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className='flex items-center justify-end space-x-2 py-4'>
          <div className='flex-1 text-sm text-muted-foreground'>
            Total {table.getPageCount()} Pages - ({table.getRowCount()} Todos).
          </div>
          <div className='space-x-2'>
            <Button
              variant='outline'
              size='sm'
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button variant='outline' size='sm' onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
              Next
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
