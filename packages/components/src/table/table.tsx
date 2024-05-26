'use client';
import {
  Box,
  TableContainer,
  Table as MUITable,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
} from '@mui/material';
import { Cell, Table as TANTable, flexRender } from '@tanstack/react-table';
import { useMemo } from 'react';
import { HeaderCell } from './header_cell';

export type RenderCellFN<Data> = (cell: Cell<Data, unknown>) => React.ReactNode;

export interface TableParams<Data> {
  table: TANTable<Data>;
  onClickRow?: (row: Data) => void;
  renderCell?: RenderCellFN<Data>;
}

export function Table<Data>(props: TableParams<Data>): React.ReactElement {
  const { table, onClickRow, renderCell } = props;
  const { pageSize, pageIndex } = table.getState().pagination;

  const dataSize = useMemo(
    () => table.getFilteredRowModel().rows.length,
    [table]
  );

  return (
    <Box>
      <TableContainer>
        <MUITable>
          <TableHead>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <HeaderCell key={header.id} header={header} />
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {table.getRowModel().rows.map((row) => {
              return (
                <TableRow
                  key={row.id}
                  hover={!!onClickRow}
                  sx={{
                    ...(!!onClickRow && { cursor: 'pointer' }),
                  }}
                  onClick={
                    onClickRow ? () => onClickRow(row.original) : undefined
                  }
                >
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <TableCell key={cell.id}>
                        {renderCell
                          ? renderCell(cell)
                          : flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </MUITable>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, { label: 'All', value: dataSize }]}
        component={Box}
        count={table.getFilteredRowModel().rows.length}
        rowsPerPage={pageSize}
        page={pageIndex}
        slotProps={{
          select: {
            inputProps: { 'aria-label': 'rows per page' },
            native: true,
          },
        }}
        onPageChange={(_, page) => {
          table.setPageIndex(page);
        }}
        onRowsPerPageChange={(e) => {
          const size = e.target.value ? Number(e.target.value) : 10;
          table.setPageSize(size);
        }}
      />
    </Box>
  );
}