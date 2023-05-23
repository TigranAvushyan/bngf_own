import { useState } from 'react';

export function useLoadMoreItems(totalCountItems: number,
    itemsLength: number,
    nextPortionUrl: string,
    callback: any,
    portionLimit: number,
    id?: number,
) {
  const [isLoadingPortion, setIsLoadingPortion] = useState(false);

  const getNextPortion = async () => {
    if (isLoadingPortion) return;
    if (!nextPortionUrl) return;
    if (totalCountItems <= portionLimit || totalCountItems <= (itemsLength ?? 0)) return;

    try {
      setIsLoadingPortion(true);
      if (id) {
        await callback({ next: nextPortionUrl, chatId: id });
      } else {
        await callback(nextPortionUrl);
      }
    } finally {
      setIsLoadingPortion(false);
    }
  };

  return { isLoadingPortion, getNextPortion };
}
