'use client';

import { useEffect, useState } from 'react';
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
import { ArrowUpDown, Ellipsis } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuLabel,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Database } from '@/utils/schema.types';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { deleteTodo } from '@/lib/db';
import { toast } from 'sonner';
import { useRouter, useSearchParams } from 'next/navigation';

type TodoType = Database['public']['Tables']['todos']['Row'];

export default function TodosDataTable({ data }: { data: TodoType[] }) {
  const searchParams = useSearchParams();
  const search = searchParams.get('q');
  const router = useRouter();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [editTodo, setEditTodo] = useState<boolean>(false);
  const [rowData, setRowData] = useState<TodoType>();

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
        {
          /* @ts-ignore */
        }
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
        {
          /* @ts-ignore */
        }
        return <Badge variant={row.getValue('list')}>{row.getValue('list')}</Badge>;
      },
    },
    {
      id: 'actions',
      enableHiding: false,
      cell: ({ row }) => {
        const rowData = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' className='h-8 w-8 p-0 '>
                <span className='sr-only'>Open menu</span>
                <Ellipsis size={20} className='h-4 w-4' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='start'>
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              {/* TODO edit  and change status is not working currently 
                  @Link https://github.com/radix-ui/primitives/issues/1836
              */}
              <DropdownMenuItem disabled onClick={onChangeStatus}>
                Change Status
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onViewTodo(rowData)}>View Todo</DropdownMenuItem>
              <DropdownMenuItem disabled onClick={() => onEditTodo(rowData)}>
                Edit Todo
              </DropdownMenuItem>
              <DropdownMenuItem className='text-red-500' onClick={() => onDeleteTodo(rowData)}>
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const onChangeStatus = () => {
    console.log('called change status');
  };

  const onViewTodo = (rowData: TodoType) => {
    router.replace(`todos/${rowData.id}`);
  };

  const onEditTodo = (rowData: TodoType) => {
    setRowData(rowData);
    setEditTodo(true);
    // return <TodoDialog formType='edit' todo={rowData} />;
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
