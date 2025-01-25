'use client';

import { routePaths } from '@/constants/routePaths';
import { getIcon } from '@/helpers/getIcon';
import { CategoryType } from '@/types/goods/category';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import Link from 'next/link';

import { styles } from './CategoryList.styles';

const CategoryList = ({ categories }: { categories: CategoryType[] }) => {
  return (
    <Box component="section" sx={styles.container}>
      <Box sx={styles.iconsWrapper}>
        {categories.map(({ _id, icon, url, name }) => (
          <Button
            key={_id}
            color="inherit"
            variant="text"
            href={`${routePaths.goods}/${url}`}
            component={Link}
            sx={styles.button}
            disableRipple
          >
            {getIcon({ fontSize: '8rem' })[icon]}

            <Typography variant="h4">{name}</Typography>
          </Button>
        ))}
      </Box>
    </Box>
  );
};

export default CategoryList;
