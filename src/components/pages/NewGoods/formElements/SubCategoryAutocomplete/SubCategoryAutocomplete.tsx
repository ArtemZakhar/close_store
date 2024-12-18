import { CategoryType } from '@/types/goods/category';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { useEffect, useState } from 'react';
import { Controller, UseFormReturn } from 'react-hook-form';

import CustomList from '@/components/common/CustomList';
import CustomPaper from '@/components/common/CustomPaper';

import { useUpdateCategory } from '@/hooks/api/useCategories';
import { useShowFetchResultMessage } from '@/hooks/useShowUpdateResultMessage';

import { FormType } from '../../NewGoods';
import AddNewSubcategoryModal from './AddNewSubcategoryModal';
import AutocompleteTags from './AutocompleteTags';
import { styles } from './SubCategoryAutocomplete.styles';

const SubCategoryAutocomplete = ({
  form,
  selectedCategory,
}: {
  form: UseFormReturn<FormType, any, undefined>;
  selectedCategory: CategoryType;
}) => {
  const [addNewSubcategoryModalOpen, setAddNewSubcategoryModalOpen] =
    useState(false);

  const {
    control,
    formState: { errors },
    getValues,
    setValue,
  } = form;

  const {
    data,
    mutate: updateCategory,
    isError: isUpdateCategoryError,
    isPending: isUpdateCategoryPending,
    isSuccess: isUpdateCategorySuccess,
  } = useUpdateCategory();

  useEffect(() => {
    if (isUpdateCategorySuccess) {
      const newSubcategory = data.subCategory.filter(
        (item) => !selectedCategory.subCategory.includes(item),
      );

      const previousValue = getValues('subCategory');
      const category = getValues('category');

      if (!category) return;

      setValue('subCategory', [...previousValue, ...newSubcategory], {
        shouldValidate: true,
      });

      setValue(
        'category',
        {
          ...category,
          subCategory: [...category.subCategory, ...newSubcategory],
        },
        {
          shouldValidate: true,
        },
      );
    }
  }, [isUpdateCategorySuccess]);

  const handleOpenAddNewSubcategoryModal = () =>
    setAddNewSubcategoryModalOpen(true);

  const handleCloseAddNewSubcategoryModal = () =>
    setAddNewSubcategoryModalOpen(false);

  const createNewSubcategory = (data: string) => {
    updateCategory({ id: selectedCategory._id, data: { subCategory: [data] } });
  };

  useShowFetchResultMessage({
    isError: isUpdateCategoryError,
    isSuccess: isUpdateCategorySuccess,
    closeFunction: handleCloseAddNewSubcategoryModal,
  });

  return (
    <>
      <Box sx={styles.blockWrapper}>
        <Box>
          <Typography marginBottom="1rem" variant="h4">
            Підкатегорії
          </Typography>
          <Box width="30rem">
            <Controller
              name="subCategory"
              control={control}
              defaultValue={[]}
              render={({ field }) => (
                <Autocomplete
                  {...field}
                  PaperComponent={CustomPaper}
                  ListboxComponent={CustomList}
                  multiple
                  popupIcon={
                    <KeyboardArrowDownIcon sx={() => styles.arrow(false)} />
                  }
                  value={field.value}
                  sx={styles.autocomplete}
                  options={selectedCategory.subCategory}
                  onChange={(_, newData) => field.onChange(newData)}
                  getOptionLabel={(option) => option}
                  renderTags={(value) => (
                    <AutocompleteTags value={value} field={field} />
                  )}
                  onClose={(e) => {
                    e.stopPropagation();
                    document.activeElement &&
                      (document.activeElement as HTMLElement).blur();
                  }}
                  noOptionsText={
                    <Button
                      onClick={handleOpenAddNewSubcategoryModal}
                      endIcon={<AddCircleOutlineOutlinedIcon />}
                    >
                      Створити нову категорію
                    </Button>
                  }
                  renderOption={(props, option) => {
                    const { key, ...otherProps } = props;
                    return (
                      <li key={option} {...otherProps}>
                        {option}
                      </li>
                    );
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      error={!!errors.subCategory}
                      sx={styles.input}
                      helperText={
                        errors.subCategory &&
                        typeof errors.subCategory.message === 'string'
                          ? errors.subCategory.message
                          : ''
                      }
                      placeholder="Оберіть категорію"
                    />
                  )}
                />
              )}
            />
          </Box>
        </Box>
      </Box>

      {addNewSubcategoryModalOpen && (
        <AddNewSubcategoryModal
          openModal={addNewSubcategoryModalOpen}
          handleClose={handleCloseAddNewSubcategoryModal}
          isPending={isUpdateCategoryPending}
          confirmFunction={createNewSubcategory}
        />
      )}
    </>
  );
};

export default SubCategoryAutocomplete;
