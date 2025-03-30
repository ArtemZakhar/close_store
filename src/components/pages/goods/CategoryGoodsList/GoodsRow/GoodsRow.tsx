import { responseMessages } from '@/app/api/constants/responseMessages';
import { routePaths } from '@/constants/routePaths';
import { GoodsType } from '@/types/goods/good';
import { GoodsInCartType } from '@/types/localStorage/goods';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';

import { useState } from 'react';

import Link from 'next/link';

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

  const { goodsInCart, saveInCart, removeFromCart, removeManyFromCart } =
    useGoodsInCartService();

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

  const goodsInCartFiltered = goodsInCart.filter((item) => item._id === _id);

  const addGoodsInCart = ({
    color,
    size,
    goodsDetailsKey,
    itemId,
  }: {
    color: string;
    size: string;
    goodsDetailsKey: string;
    itemId: string;
  }) => {
    if (!selectedGoods) return;

    saveInCart({
      _id: selectedGoods._id,
      color,
      size,
      goodsDetailsKey,
      itemId,
    });
  };

  const removeGoodsFromCart = ({
    size,
    goodsDetailsKey,
    itemId,
  }: {
    size: string;
    goodsDetailsKey: string;
    itemId: string;
  }) => {
    if (!selectedGoods) return;

    removeFromCart({
      _id: selectedGoods._id,
      size,
      goodsDetailsKey,
      itemId,
    });
  };

  const handleSuccessDeletion = () => {
    if (!selectedGoods) return;
    const shouldBeRemoved = Object.entries(selectedGoods.goodsDetails).reduce(
      (acc, [key, value]) => {
        for (const size of value.countAndSizes) {
          acc.push({
            _id: selectedGoods._id,
            size: size.size,
            itemId: value._id!,
            goodsDetailsKey: key,
          });
        }

        return acc;
      },
      [] as Omit<GoodsInCartType, 'color'>[],
    );

    removeManyFromCart(shouldBeRemoved);
    hideConfirmationRemoveModal();
  };

  useShowFetchResultMessage({
    isError: isDeleteGoodsError,
    isSuccess: isDeleteGoodsSuccess,
    error: deleteGoodsError,
    closeFunction: handleSuccessDeletion,
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
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Button
                component={Link}
                href={`/${routePaths.goods.root}/${selectedGoods.category.url}/${_id}`}
              >
                Деталі
              </Button>

              {canModify && (
                <>
                  <Button onClick={() => startMode('editing')}>
                    Редагування
                  </Button>

                  <Button onClick={() => startMode()}>Створити копію</Button>

                  <Button onClick={showConfirmationRemoveModal}>
                    Видалення
                  </Button>
                </>
              )}
            </Box>
          </>
        )}

        {selectedGoods?._id === _id &&
          Object.entries(goodsDetails).map(([key, goods]) => (
            <GoodsDetailsItem
              key={key}
              goods={goods}
              id={key}
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
