'use client';

import { User, UserRole } from '@/types/users/userType';
import { TableRow } from '@mui/material';
import TableCell from '@mui/material/TableCell';

import { useEffect, useState } from 'react';

import TableCellHeader from '@/components/common/Table/TableCellHeader';
import TableContainer from '@/components/common/Table/TableContainer';

import NoUserDataMessage from '../NoUserDataMessage';

const UserTable = ({
  users,
  canInvite,
  type,
}: {
  users: User[];
  canInvite: boolean;
  type: UserRole;
}) => {
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

  if (!users?.length)
    return <NoUserDataMessage type={type} canInviteUser={canInvite} />;

  return (
    <TableContainer
      headerData={[
        <TableCellHeader width="25%" key="name">
          Ім&apos;я
        </TableCellHeader>,
        <TableCellHeader width="65%" key="email">
          Пошта
        </TableCellHeader>,
        <TableCellHeader align="center" key="details">
          Деталі
        </TableCellHeader>,
      ]}
      pagination={{ count, rowsPerPage, setPage, setRowsPerPage, page }}
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
