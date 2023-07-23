/**
 * @file Домашка по FP ч. 1
 *
 * Основная задача — написать самому, или найти в FP библиотеках функции anyPass/allPass
 * Эти функции/их аналоги есть и в ramda и в lodash
 *
 * allPass — принимает массив функций-предикатов, и возвращает функцию-предикат, которая
 * вернет true для заданного списка аргументов, если каждый из предоставленных предикатов
 * удовлетворяет этим аргументам (возвращает true)
 *
 * anyPass — то же самое, только удовлетворять значению может единственная функция-предикат из массива.
 *
 * Если какие либо функции написаны руками (без использования библиотек) это не является ошибкой
 */

import {
  allPass,
  both,
  complement,
  count,
  equals,
  lte,
  map,
  max,
  nth,
  partial,
  pipe,
  prop,
  reduce,
  repeat,
  toPairs,
  useWith,
} from "ramda";

const doubleParam = (fn) => (param) => fn(param, param);
const multyParam =
  (fn, n = fn.length) =>
  (param) =>
    fn(...repeat(param, n));

const toArray = pipe(toPairs, map(nth(1))); // [КРУГ, КВАДРАТ, ТРЕУГОЛЬНИК, ЗВЕЗДА]

const matchColor = equals;
const isRed = partial(matchColor, ["red"]);
const isOrange = partial(matchColor, ["orange"]);
const isGreen = partial(matchColor, ["green"]);
const isBlue = partial(matchColor, ["blue"]);
const isWhite = partial(matchColor, ["white"]);
const isNotRed = complement(isRed);
const isNotOrange = complement(isOrange);
const isNotGreen = complement(isGreen);
const isNotBlue = complement(isBlue);
const isNotWhite = complement(isWhite);
const countRed = pipe(toArray, count(isRed));
const countOrange = pipe(toArray, count(isOrange));
const countGreen = pipe(toArray, count(isGreen));
const countBlue = pipe(toArray, count(isBlue));
const countWhite = pipe(toArray, count(isWhite));

// const getCircle = nth(0);
// const getSquare = nth(1);
// const getTriangle = nth(2);
// const getStar = nth(3);
const getCircle = prop("circle");
const getSquare = prop("square");
const getTriangle = prop("triangle");
const getStar = prop("star");

// 1. Красная звезда, зеленый квадрат, все остальные белые.
export const validateFieldN1 = allPass([
  pipe(getStar, isRed),
  pipe(getSquare, isGreen),
  pipe(getCircle, isWhite),
  pipe(getTriangle, isWhite),
]);

// 2. Как минимум две фигуры зеленые.
export const validateFieldN2 = pipe(countGreen, lte(2));

// 3. Количество красных фигур равно кол-ву синих.
export const validateFieldN3 = doubleParam(
  useWith(equals, [countRed, countBlue]) // eslint-disable-line
);

// 4. Синий круг, красная звезда, оранжевый квадрат треугольник любого цвета
export const validateFieldN4 = allPass([
  pipe(getCircle, isBlue),
  pipe(getStar, isRed),
  pipe(getSquare, isOrange),
]);

// 5. Три фигуры одного любого цвета кроме белого (четыре фигуры одного цвета – это тоже true).
export const validateFieldN5 = pipe(
  multyParam(
    // eslint-disable-next-line
    useWith(pipe(Array, reduce(max, 0)), [
      countRed,
      countOrange,
      countGreen,
      countBlue,
    ])
  ),
  lte(3)
);

// 6. Ровно две зеленые фигуры (одна из зелёных – это треугольник), плюс одна красная. Четвёртая оставшаяся любого доступного цвета, но не нарушающая первые два условия
export const validateFieldN6 = allPass([
  pipe(countGreen, equals(2)),
  pipe(getTriangle, isGreen),
  pipe(countRed, equals(1)),
]);

// 7. Все фигуры оранжевые.
export const validateFieldN7 = pipe(countOrange, equals(4));

// 8. Не красная и не белая звезда, остальные – любого цвета.
export const validateFieldN8 = allPass([
  pipe(getStar, isNotRed),
  pipe(getStar, isNotWhite),
]);

// 9. Все фигуры зеленые.
export const validateFieldN9 = pipe(countGreen, equals(4));

// 10. Треугольник и квадрат одного цвета (не белого), остальные – любого цвета
export const validateFieldN10 = both(
  doubleParam(useWith(equals, [getTriangle, getSquare])), // eslint-disable-line
  pipe(getTriangle, isNotWhite)
);
