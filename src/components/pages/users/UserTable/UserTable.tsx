'use client';

import { User } from '@/types/users/userType';
import { TableRow } from '@mui/material';
import TableCell from '@mui/material/TableCell';

import { useEffect, useState } from 'react';

import TableCellHeader from '@/components/common/Table/TableCellHeader';
import TableContainer from '@/components/common/Table/TableContainer';

const UserTable = ({ users }: { users: User[] }) => {
  const [openModal, setOpenModal] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (users) {
      setCount(users.length);
    }
  }, [users]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [page, rowsPerPage]);

  // if (!users?.length)
  //   return <NoUserDataMessage type={type} canInviteUser={canInviteUser} />;

  return (
    <TableContainer
      headerData={[
        <TableCellHeader key="name">Ім&apos;я</TableCellHeader>,
        <TableCellHeader key="email">Пошта</TableCellHeader>,
        <TableCellHeader align="center" key="details">
          Деталі
        </TableCellHeader>,
      ]}
    >
      {users.map(({ _id, name, email }) => (
        <TableRow key={_id}>
          <TableCell>{name}</TableCell>
          <TableCell>{email}</TableCell>
        </TableRow>
      ))}
    </TableContainer>
  );
};

export default UserTable;
