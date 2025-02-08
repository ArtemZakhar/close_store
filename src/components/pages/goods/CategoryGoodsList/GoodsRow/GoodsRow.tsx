import { responseMessages } from '@/app/api/constants/responseMessages';
import { GoodsType } from '@/types/goods/good';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';

import { useState } from 'react';

import ConfirmationModal from '@/components/common/ConfirmationModal';

import { useDeleteGoods } from '@/hooks/api/useGoods';
import useGoodsInCartService from '@/hooks/useGoodsInCartService';
import { useShowFetchResultMessage } from '@/hooks/useShowUpdateResultMessage';

import GoodsDetailsItem from './GoodsDetailsItem';
import { styles } from './GoodsRow.styles';
import TableHeader from './TableHeader';

const GoodsRow = ({
  item,
  selectedGoods,
  toggleSelectedGoods,
  canModify,
  startMode,
}: {
  item: GoodsType;
  selectedGoods: GoodsType | null;
  toggleSelectedGoods: (goods: GoodsType) => void;
  canModify: boolean;
  startMode: (mode?: 'editing') => void;
}) => {
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);

  const { goodsInCart, saveInCart, removeFromCart } = useGoodsInCartService();

  const {
    mutate: deleteGoods,
    isError: isDeleteGoodsError,
    isPending: isDeleteGoodsPending,
    isSuccess: isDeleteGoodsSuccess,
    error: deleteGoodsError,
  } = useDeleteGoods();

  const { _id, goodsDetails } = item;

  const showConfirmationRemoveModal = () => {
    setIsRemoveModalOpen(true);
  };

  const hideConfirmationRemoveModal = () => {
    setIsRemoveModalOpen(false);
  };

  useShowFetchResultMessage({
    isError: isDeleteGoodsError,
    isSuccess: isDeleteGoodsSuccess,
    error: deleteGoodsError,
    closeFunction: hideConfirmationRemoveModal,
    customErrorMessage: [
      {
        errorType: responseMessages.user.forbidden,
        message: 'Заборонена операція',
      },
      {
        errorType: responseMessages.server.error,
        message:
          'Помилка на стороні сервера при видалені товару. Спробуйте пізніше.',
      },
    ],
  });

  const goodsInCartFiltered = goodsInCart.filter((item) => item._id === _id);

  const addGoodsInCart = ({ color, size }: { color: string; size: string }) => {
    if (!selectedGoods) return;

    saveInCart({ _id: selectedGoods._id, color, size });
  };

  const removeGoodsFromCart = ({
    color,
    size,
  }: {
    color: string;
    size: string;
  }) => {
    if (!selectedGoods) return;

    removeFromCart({ _id: selectedGoods._id, color, size });
  };

  return (
    <Tooltip title={selectedGoods?._id === _id ? '' : item.stored} arrow>
      <Box sx={styles.row} onDoubleClick={() => toggleSelectedGoods(item)}>
        <TableHeader
          item={item}
          toggleSelectedGoods={toggleSelectedGoods}
          selectedGoods={selectedGoods}
        />

        {selectedGoods?._id === _id && (
          <>
            {canModify && (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box>
                  <Button onClick={() => startMode('editing')}>
                    Редагування
                  </Button>
                </Box>

                <Box>
                  <Button onClick={() => startMode()}>Створити копію</Button>
                </Box>

                <Box>
                  <Button onClick={showConfirmationRemoveModal}>
                    Видалення
                  </Button>
                </Box>
              </Box>
            )}
          </>
        )}

        {selectedGoods?._id === _id &&
          Object.entries(goodsDetails).map(([key, goods]) => (
            <GoodsDetailsItem
              key={key}
              goods={goods}
              goodsInCart={goodsInCartFiltered}
              addGoodsInCart={addGoodsInCart}
              removeGoodsFromCart={removeGoodsFromCart}
            />
          ))}

        {isRemoveModalOpen && (
          <ConfirmationModal
            openModal={isRemoveModalOpen}
            handleClose={hideConfirmationRemoveModal}
            title="Видалення товару"
            subTitle={`Ви збираєтесь видалити товар (код: ${selectedGoods?.code}, модель: ${selectedGoods?.model}). Цю операцію не можна буде скасувати. Ви впевненні?`}
            isPending={isDeleteGoodsPending}
            confirmFunction={() => deleteGoods(selectedGoods?._id!)}
          />
        )}
      </Box>
    </Tooltip>
  );
};

export default GoodsRow;
