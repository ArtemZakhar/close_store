import { UserType } from '@/types/users/userType';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import { useRef, useState } from 'react';

import { styles } from './SelectSellPerson.styles';

const SelectSellPerson = ({
  sellerExtendedData,
  handleSelectEmployee,
}: {
  sellerExtendedData: UserType[];
  handleSelectEmployee: (user: UserType) => void;
}) => {
  const [openSelectEmployee, setOpenSelectEmployee] = useState(false);
  const iconRef = useRef<HTMLButtonElement>(null);
  const handleToggleSelectEmployee = () =>
    setOpenSelectEmployee((prevState) => !prevState);
  const handleCloseSelectEmployee = () => setOpenSelectEmployee(false);

  const onEmployeeSelected = (user: UserType) => {
    handleSelectEmployee(user);
    handleCloseSelectEmployee();
  };

  return (
    <>
      <IconButton
        aria-label="Вибрати продавця для всього списку"
        ref={iconRef}
        aria-controls={openSelectEmployee ? 'long-menu' : undefined}
        aria-expanded={openSelectEmployee ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleToggleSelectEmployee}
        sx={styles.iconButton}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        disableScrollLock
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={iconRef.current}
        open={openSelectEmployee}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        onClose={handleCloseSelectEmployee}
        slotProps={{
          paper: {
            style: {
              maxHeight: '20rem',
            },
          },
        }}
      >
        {sellerExtendedData?.map((option) => (
          <MenuItem key={option._id} onClick={() => onEmployeeSelected(option)}>
            {option.name}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default SelectSellPerson;
