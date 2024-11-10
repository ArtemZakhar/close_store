import { UserRole } from '@/types/users/userType';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

import { Dispatch, SetStateAction } from 'react';

import InviteUser from '../../InviteUser';
import { styles } from './TableContainer.styles';

type Pagination = {
  setPage: Dispatch<SetStateAction<number>>;
  setRowsPerPage: Dispatch<SetStateAction<number>>;
  count: number;
  rowsPerPage: number;
  page: number;
};

const TableContainerStyled = ({
  children,
  headerData,
  border,
  canInviteUser,
  type,
  pagination,
}: {
  children: React.ReactNode;
  headerData: React.ReactNode[];
  border?: boolean;
  canInviteUser?: boolean;
  type?: UserRole;
  pagination?: Pagination;
}) => {
  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    if (pagination) {
      pagination.setPage(newPage);
    }
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (pagination) {
      pagination.setRowsPerPage(parseInt(event.target.value, 10));
      pagination.setPage(0);
    }
  };

  const rowsPerPageOptions =
    pagination && pagination.count <= 100
      ? [10, 20, 50, { label: 'All', value: -1 }]
      : [10, 20, 50, 100];

  return (
    <TableContainer
      sx={{
        ...styles.tableContainer,
        border: border ? '1px solid #E1E1E1' : '',
      }}
    >
      {canInviteUser && type && (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <InviteUser type={type} />
        </Box>
      )}
      <Table aria-label="simple table">
        <TableHead sx={{ borderBottom: '1px solid #e1e1e1' }}>
          <TableRow>{headerData.map((item) => item)}</TableRow>
        </TableHead>
        <TableBody>{children}</TableBody>
      </Table>
      {pagination && (
        <TablePagination
          rowsPerPageOptions={rowsPerPageOptions}
          colSpan={3}
          component="div"
          count={pagination.count}
          rowsPerPage={pagination.rowsPerPage}
          page={pagination.page}
          slotProps={{
            select: {
              'aria-label': 'rows per page',
            },
          }}
          labelRowsPerPage="Строк на сторінці"
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{ width: '100%' }}
        />
      )}
    </TableContainer>
  );
};

export default TableContainerStyled;
