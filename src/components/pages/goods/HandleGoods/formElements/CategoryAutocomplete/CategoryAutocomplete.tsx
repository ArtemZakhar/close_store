import { CategoryType } from '@/types/goods/category';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import AutocompleteStyled from '@/components/common/FormComponentsStyled/AutocompleteStyled';

import {
  useGetAllCategories,
  usePostCategory,
} from '@/hooks/api/useCategories';
import { useShowFetchResultMessage } from '@/hooks/useShowUpdateResultMessage';

import { FormType } from '../../HandleGoods';
import { validations } from '../formValidations';
import AddNewCategoryModal from './AddNewCategoryModal';
import { styles } from './CategoryAutocomplete.styles';

const CategoryAutocomplete = ({
  selectedCategory,
  onCategoryChange,
  isEditing = false,
}: {
  selectedCategory: CategoryType | null;
  onCategoryChange: (data: CategoryType | null) => void;
  isEditing?: boolean;
}) => {
  const [addNewCategoryModalOpen, setAddNewCategoryModalOpen] = useState(false);

  const { data: categoryData, isLoading, isError } = useGetAllCategories();

  const {
    data,
    mutate: createCategory,
    isError: isCreateUserError,
    isPending: isCreateUserPending,
    isSuccess: isCreateUserSuccess,
  } = usePostCategory();

  const {
    control,
    formState: { errors },
    setValue,
  } = useFormContext<FormType>();

  useEffect(() => {
    if (isCreateUserSuccess) {
      setValue('category', data, { shouldValidate: true });
      onCategoryChange(data);
    }
  }, [isCreateUserSuccess]);

  const handleOpenAddNewCategoryModal = () => {
    setAddNewCategoryModalOpen(true);
  };

  const handleCloseAddNewCategoryModal = () => {
    setAddNewCategoryModalOpen(false);
  };

  const createNewCategory = (
    data: Omit<CategoryType, '_id' | 'lastId' | 'owner'>,
  ) => {
    createCategory(data);
  };

  useShowFetchResultMessage({
    isError: isCreateUserError,
    isSuccess: isCreateUserSuccess,
    closeFunction: handleCloseAddNewCategoryModal,
  });

  return (
    <>
      <Box sx={styles.blockWrapper}>
        <Box width="15rem">
          <Typography marginBottom="1rem" variant="h4">
            Категорія
          </Typography>
          <Box>
            <Controller
              name="category"
              control={control}
              defaultValue={null}
              rules={validations.category}
              render={({ field }) => (
                <AutocompleteStyled
                  {...field}
                  value={field.value || null}
                  options={categoryData || []}
                  onChange={(_, newData) => {
                    field.onChange(newData);
                    onCategoryChange(newData);
                  }}
                  getOptionLabel={(option) => option.name}
                  disabled={isEditing}
                  loading={isLoading}
                  noOptionsText={
                    isError ? (
                      <Box padding="1rem" component="p">
                        Не вдалось завантажити категорії
                      </Box>
                    ) : (
                      <Button
                        onClick={handleOpenAddNewCategoryModal}
                        endIcon={<AddCircleOutlineOutlinedIcon />}
                      >
                        Створити нову категорію
                      </Button>
                    )
                  }
                  renderOption={(props, option) => {
                    const { key, ...otherProps } = props;

                    return (
                      <li key={option._id} {...otherProps}>
                        {option.name}
                      </li>
                    );
                  }}
                  error={!!errors.category}
                  helperText={
                    errors.category &&
                    typeof errors.category.message === 'string'
                      ? errors.category.message
                      : ''
                  }
                  placeholder="Оберіть категорію"
                />
              )}
            />
          </Box>

          {addNewCategoryModalOpen && (
            <AddNewCategoryModal
              openModal={addNewCategoryModalOpen}
              handleClose={handleCloseAddNewCategoryModal}
              isPending={isCreateUserPending}
              confirmFunction={createNewCategory}
            />
          )}
        </Box>

        {selectedCategory && (
          <Box width="15rem">
            <Typography marginBottom="1rem" variant="h4">
              Порядковий номер
            </Typography>

            <TextField
              disabled
              value={`${selectedCategory.uniqueId}-${selectedCategory.lastId + 1}`}
            />
          </Box>
        )}
      </Box>

      <Divider sx={styles.divider} />
    </>
  );
};

export default CategoryAutocomplete;
