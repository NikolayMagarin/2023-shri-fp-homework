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
  juxt,
  length,
  lte,
  max,
  partial,
  pipe,
  prop,
  reduce,
  uniq,
  values,
} from "ramda";

const isRed = partial(equals, ["red"]);
const isOrange = partial(equals, ["orange"]);
const isGreen = partial(equals, ["green"]);
const isBlue = partial(equals, ["blue"]);
const isWhite = partial(equals, ["white"]);

const isNotRed = complement(isRed);
const isNotWhite = complement(isWhite);

const countRed = pipe(values, count(isRed));
const countOrange = pipe(values, count(isOrange));
const countGreen = pipe(values, count(isGreen));
const countBlue = pipe(values, count(isBlue));

const getCircle = prop("circle");
const getSquare = prop("square");
const getTriangle = prop("triangle");
const getStar = prop("star");

const allSame = pipe(uniq, length, equals(1));

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
export const validateFieldN3 = pipe(
  values,
  juxt([countRed, countBlue]),
  allSame
);

// 4. Синий круг, красная звезда, оранжевый квадрат треугольник любого цвета
export const validateFieldN4 = allPass([
  pipe(getCircle, isBlue),
  pipe(getStar, isRed),
  pipe(getSquare, isOrange),
]);

// 5. Три фигуры одного любого цвета кроме белого (четыре фигуры одного цвета – это тоже true).
export const validateFieldN5 = pipe(
  values,
  juxt([countRed, countOrange, countGreen, countBlue]),
  reduce(max, 0),
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
  pipe(juxt([getTriangle, getSquare]), allSame),
  pipe(getTriangle, isNotWhite)
);
