import _ from 'lodash';
import moment from 'moment';
import mime from 'mime';


export const zeroPad = (num: number, places = 2) => {
  const zero = places - num.toString().length + 1;
  return Array(+(zero > 0 && zero)).join('0') + num;
};


export const addRemove = <T>(arr: T[], item: T): T[] => {
  const newArr = [...arr];
  for (let i = 0; i < newArr.length; i++) {
    if (_.isEqual(newArr[i], item)) {
      newArr.splice(i, 1);
      return newArr;
    }
  }
  newArr.push(item);
  return newArr;
};


export const filterByFirstAndSecondName = <T extends { first_name: string, last_name: string }>(arr: T[], text: string) => {
  if (arr.length > 0) {
    return arr.filter((i) => i.first_name.startsWith(text) || i.last_name.startsWith(text));
  }
};


export const declOfNum = (number: number, words: string[]): string =>
  number + ' ' + words[(number % 100 > 4 && number % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][(number % 10 < 5) ? Math.abs(number) % 10 : 5]];


export const getRandomNumber = (min: number, max: number) => Math.round(Math.random() * (max - min) + min);


/**
 * Format bytes as human-readable text.
 *
 * @param bytes Number of bytes.
 * @param si True to use metric (SI) units, aka powers of 1000. False to use
 *           binary (IEC), aka powers of 1024.
 * @param dp Number of decimal places to display.
 *
 * @return Formatted string.
 */
export const humanFileSize = (bytes: number, si = false, dp = 1): string => {
  const thresh = si ? 1000 : 1024;

  if (Math.abs(bytes) < thresh) {
    return bytes + ' B';
  }

  const units = si ?
    ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'] :
    ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
  let u = -1;
  const r = 10 ** dp;

  do {
    bytes /= thresh;
    ++u;
  } while (Math.round(Math.abs(bytes) * r) / r >= thresh && u < units.length - 1);


  return bytes.toFixed(dp) + ' ' + units[u];
};


export const findFirstAndChange = <T>(arr: T[], newItemFn: (item: T, index: number) => T, predicate: (item: T, index: number) => boolean): T[] => {
  const res: T[] = [...arr];

  arr.forEach((el, idx) => {
    if (predicate(el, idx)) {
      res[idx] = newItemFn(el, idx);
      return res;
    }
  });
  return arr;
};


export const fromNow = (date: string | Date | number, showTime = false, short = false) => {
  const now = new Date();
  const diff = (now.getTime() - new Date(date).getTime());

  const hour = diff / 1000 / 60 / 60;
  if (hour < 24) return showTime ? moment(date).format('HH:mm') : 'Сегодня';

  if (hour < 48) return 'Вчера';

  const day = hour / 24;
  if (day > 2 && day < 7) return moment(date).format(short ? 'ddd' : 'dddd');

  if (now.getFullYear() === new Date(date).getFullYear()) return moment(date).format('DD.MM');

  return moment(date).format('DD.MM.YY');
};

export const convertLocalIdentifierToAssetLibrary = (localIdentifier: string, ext: string) => {
  const hash = localIdentifier.split('/')[0];
  return `assets-library://asset/asset.${ext}?id=${hash}&ext=${ext}`;
};

export const getFileObject = (uri: string, filename?: string) => {
  return {
    uri,
    name: filename || uri.split('/').pop(),
    type: mime.getType(uri) || '',
  };
}
;

export const filterAndMap = <T, S>(
  arr: T[],
  filterFn: (item: T, index: number) => boolean,
  mapFn: (item: T, index: number) => S,
): S[] => {
  const res: S[] = [];


  arr.forEach((item, index) => {
    const isFilter = filterFn(item, index);
    if (isFilter) res.push(mapFn(item, index));
  });

  return res;
};

export const getFileName = (fileURI: string) => {
  return fileURI.split('/').slice(-1).join('');
};

export const getFullName = (firstName: string | undefined, lastName: string | undefined) => firstName + ' ' + lastName;
