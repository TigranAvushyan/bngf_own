import { filterAndMap, fromNow } from '../../../src/lib/utils';
import moment from 'moment';


describe('fromNow', () => {
  moment.locale('ru', {
    weekdays: [
      'Воскресенье',
      'Понедельник',
      'Вторник',
      'Среда',
      'Четверг',
      'Пятница',
      'Суббота',
    ],
  });

  test('Today', () => {
    expect(fromNow('2022-02-22T18:27:09.232666+03:00')).toBe('Сегодня');
  });

  test('Yesterday', () => {
    expect(fromNow('2022-02-21T18:00:09.232666+03:00')).toBe('Вчера');
  });

  test('Week', () => {
    expect(fromNow('2022-02-18T18:27:09.232666+03:00')).toBe('Пятница');
  });


  test('Date', () => {
    expect(fromNow('2022-01-30T18:27:09.232666+03:00')).toBe('30.01.2022');
  });
});


describe('filterAndMap', () => {
  const initValue = [{
    a: 1,
    b: null,
    c: 3,
  }, {
    a: 10,
    b: 20,
    c: 30,
  }, {
    a: 100,
    b: null,
    c: 300,
  },
  ];

  const resultValue = [{ a: 20 }];

  test('arrayTest', () => {
    expect(filterAndMap(initValue, (i) => i.b !== null, (i) => ({ a: i.a * 2 }))).toEqual(resultValue);
  });
});

