import { getAllGoods } from '@/services/apiServices/goodsService';
import { GoodsType } from '@/types/goods/good';
import { UserRole } from '@/types/users/userType';
import { Error } from '@mui/icons-material';
import { CircularProgress, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';

import { useCallback, useEffect, useRef, useState } from 'react';

import GoodsRow from '@/components/pages/goods/CategoryGoodsList/GoodsRow';
import HandleGoods from '@/components/pages/goods/HandleGoods';

import { useClickOutside } from '@/hooks/useClickOutside';
import { useDebounce } from '@/hooks/useDebounce';

import { styles } from './SearchByProductCode.styles';
import TooltipStyled from './TooltipStyled';

const SearchByProductCode = ({
  role,
  owner,
}: {
  role: UserRole;
  owner: string;
}) => {
  const [codeSearch, setCodeSearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [searchResultGoods, setSearchResultGoods] = useState<GoodsType[]>([]);
  const [selectedGoods, setSelectedGoods] = useState<GoodsType | null>(null);
  const [isEditingMode, setIsEditingMode] = useState(false);
  const [isCopyingMode, setIsCopyingMode] = useState(false);
  const [isResultContainerShown, setIsResultContainerShown] = useState(false);
  const containerResultsRef = useRef<HTMLDivElement>(null);

  const debouncedCode = useDebounce(codeSearch, 1000);

  useEffect(() => {
    if (debouncedCode) {
      setIsLoading(true);

      getAllGoods({
        searchParams: `code=${debouncedCode}&owner=${owner}&role=${role}`,
      })
        .then((res) => {
          setSearchResultGoods(res);
          handleShowResultContainerOpen();
        })
        .catch(() => setIsError(true))
        .finally(() => setIsLoading(false));
    }
  }, [debouncedCode]);

  const handleShowResultContainerOpen = () => setIsResultContainerShown(true);
  const handleShowResultContainerClose = () => setIsResultContainerShown(false);

  useClickOutside(containerResultsRef, handleShowResultContainerClose);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (isError) {
      timer = setTimeout(() => {
        setIsError(false);
      }, 5000);
    }

    return () => clearTimeout(timer);
  }, [isError]);

  const startMode = (mode?: 'editing') => {
    if (mode === 'editing') {
      setIsEditingMode(true);
      return;
    }
    setIsCopyingMode(true);
  };

  const finishMode = useCallback(
    (mode?: 'editing') => {
      setSelectedGoods(null);
      if (mode === 'editing') {
        setSelectedGoods(null);
        setIsEditingMode(false);
        return;
      }

      setSelectedGoods(null);
      setIsCopyingMode(false);
    },
    [isEditingMode, isCopyingMode],
  );

  const toggleSelectedGoods = (goods: GoodsType) => {
    if (selectedGoods?._id === goods._id) {
      setSelectedGoods(null);

      return;
    }

    setSelectedGoods(goods);
  };

  if (isEditingMode && selectedGoods) {
    return (
      <Box sx={styles.editModeWrapper}>
        <HandleGoods
          selectedGoods={selectedGoods}
          finishMode={finishMode}
          isEditing
          category={selectedGoods.category.url}
          key={selectedGoods?._id}
        />
      </Box>
    );
  }

  if (isCopyingMode && selectedGoods) {
    return (
      <Box sx={styles.editModeWrapper}>
        <HandleGoods
          selectedGoods={selectedGoods}
          key={selectedGoods?._id}
          category={selectedGoods.category.url}
          finishMode={finishMode}
        />
      </Box>
    );
  }

  return (
    <Box position="relative" ref={containerResultsRef}>
      <TextField
        sx={styles.inputWidth}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                {isLoading && <CircularProgress size="1rem" />}
                {isError && (
                  <TooltipStyled>
                    <Error color="error" fontSize="small" />
                  </TooltipStyled>
                )}
              </InputAdornment>
            ),
          },
        }}
        onFocus={handleShowResultContainerOpen}
        onChange={(event) => setCodeSearch(event.target.value)}
        placeholder="XXX-XX Пошук за кодом"
      />

      {isResultContainerShown && !!debouncedCode.length && !isLoading && (
        <Box sx={styles.resultsWrapper}>
          <Box sx={{ position: 'absolute', top: 0, right: 0 }}>
            <Button onClick={handleShowResultContainerClose}>&times;</Button>
          </Box>

          {!!searchResultGoods.length ? (
            searchResultGoods?.map((item) => (
              <GoodsRow
                key={item._id}
                item={item}
                toggleSelectedGoods={toggleSelectedGoods}
                selectedGoods={selectedGoods}
                canModify={role === UserRole.owner}
                startMode={startMode}
              />
            ))
          ) : (
            <Typography align="center">Даний товар відсутній</Typography>
          )}
        </Box>
      )}
    </Box>
  );
};

export default SearchByProductCode;
