'use client';

import { UserRole, UserType } from '@/types/users/userType';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import Button from '@mui/material/Button';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

import { useEffect, useState } from 'react';

import ConfirmationModal from '@/components/common/ConfirmationModal';
import TableCellHeader from '@/components/common/Table/TableCellHeader';
import TableContainer from '@/components/common/Table/TableContainer';

import { useDeleteUser } from '@/hooks/api/useUsers';
import { useShowFetchResultMessage } from '@/hooks/useShowUpdateResultMessage';

import NoUserDataMessage from '../NoUserDataMessage';
import { styles } from './UserTable.styles';

const UserTable = ({
  users,
  canInvite,
  type,
  canDelete,
}: {
  users: UserType[];
  canInvite: boolean;
  type: UserRole;
  canDelete: boolean;
}) => {
  const [openModal, setOpenModal] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [count, setCount] = useState(0);
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);

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

  const {
    mutate: deleteUser,
    isError: isDeleteUserError,
    isPending: isDeleteUserPending,
    isSuccess: isDeleteUserSuccess,
  } = useDeleteUser();

  const handleOpenDeleteModal = (user: UserType) => {
    setOpenModal(true);
    setSelectedUser(user);
  };

  const handleCloseDeleteModal = () => {
    setOpenModal(false);
    setSelectedUser(null);
  };

  useShowFetchResultMessage({
    isError: isDeleteUserError,
    isSuccess: isDeleteUserSuccess,
    closeFunction: handleCloseDeleteModal,
  });

  if (!users?.length)
    return <NoUserDataMessage type={type} canInviteUser={canInvite} />;

  const isDetailsVisible = false;
  // const isDetailsVisible = type === UserRole.buyer || type === UserRole.seller;

  const headerData = [
    <TableCellHeader width="25%" key="name">
      Ім&apos;я
    </TableCellHeader>,
    <TableCellHeader width="65%" key="email">
      Пошта
    </TableCellHeader>,
  ];

  if (isDetailsVisible) {
    headerData.push(
      <TableCellHeader align="center" key="details">
        Деталі
      </TableCellHeader>,
    );
  }

  if (canDelete) {
    headerData.push(
      <TableCellHeader align="center" key="delete">
        Видалити
      </TableCellHeader>,
    );
  }

  return (
    <>
      <TableContainer
        headerData={headerData}
        pagination={{ count, rowsPerPage, setPage, setRowsPerPage, page }}
      >
        {users.map((user) => {
          const { _id, name, email } = user;
          return (
            <TableRow key={_id}>
              <TableCell>{name}</TableCell>
              <TableCell>{email}</TableCell>

              <TableCell align="center">
                <Button
                  color="error"
                  sx={styles.deleteButton}
                  onClick={() => handleOpenDeleteModal(user)}
                >
                  <DeleteForeverOutlinedIcon />
                </Button>
              </TableCell>
            </TableRow>
          );
        })}
      </TableContainer>

      {openModal && (
        <ConfirmationModal
          openModal={openModal}
          handleClose={() => handleCloseDeleteModal()}
          title={`Ви збираєтесь видалити користувача ${selectedUser?.name}`}
          subTitle="Ця операція не може бути скасована"
          isPending={isDeleteUserPending}
          confirmFunction={() =>
            deleteUser({ id: selectedUser!._id, role: selectedUser!.role })
          }
        />
      )}
    </>
  );
};

export default UserTable;
