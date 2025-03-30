import { UserType } from '@/types/users/userType';

import { useEffect, useState } from 'react';

import AutocompleteStyled from '@/components/common/FormComponentsStyled/AutocompleteStyled';

const SoldBySelect = ({
  employeeData = [],
  soldBy,
  id,
  handleSelectOneSeller,
}: {
  employeeData: UserType[] | undefined;
  soldBy: string;
  id: string;
  handleSelectOneSeller: (goodsId: string, id: string) => void;
}) => {
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
  const handleSoldEmployeeSelect = (user: UserType) => {
    setSelectedUser(user);

    handleSelectOneSeller(id, user._id);
  };

  useEffect(() => {
    setSelectedUser(employeeData.find((item) => item._id === soldBy) ?? null);
  }, [soldBy]);

  return (
    <AutocompleteStyled
      value={selectedUser}
      options={employeeData}
      onChange={(_, newData) => handleSoldEmployeeSelect(newData)}
      getOptionLabel={(option) => {
        return option.name;
      }}
      renderOption={(props, option) => {
        const { key, ...otherProps } = props;

        return (
          <li key={option._id} {...otherProps}>
            {option.name}
          </li>
        );
      }}
    />
  );
};

export default SoldBySelect;
