import { getRandomNumber } from '../../index';


export const imageGridPattern = (dataLength: number): number[] => {
  switch (dataLength) {
    case 5:
      return [2, 3];
    case 6:
      return [2, 2, 2];
    case 7:
      return [2, 3, 2];
    case 8:
      return [3, 2, 3];
    case 9:
      return [3, 3, 3];
    case 10:
      return [3, 2, 3, 2];
  }
  return [dataLength];
};


export const getImageRowWidthRatio = (sum: number) => {
  if (sum === 1) return [1];

  if (sum === 2) {
    const random = getRandomNumber(25, 100) + 50;
    return [random / 100, (sum * 100 - random) / 100];
  }

  if (sum === 3) {
    const res1 = getRandomNumber(25, 75) + 50;
    const res2 = getRandomNumber(25, 75) + 50;

    const res3 = sum * 100 - res1 - res2;

    return [res1 / 100, res2 / 100, res3 / 100];
  }

  return [];
};


export const getImageGrid = (images: string[]): string[][] => {
  const res: string[][] = [];
  const pattern = imageGridPattern(images.length);

  let prevSliceCount = 0;
  pattern.forEach((sliceCount) => {
    res.push(images.slice(prevSliceCount, prevSliceCount + sliceCount));
    prevSliceCount += sliceCount;
  });

  return res;
};

