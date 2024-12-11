import React from 'react';

export { default as withStopPropagation } from './withStopPropagation';
export const isNil = (value: any): boolean => value === undefined;
/**
 * 判断数组的每一项是否等同于某个值
 * @param arr 数组
 * @param equalTo 判断条件
 * @returns boolean
 */
export function isArrayElementEqual(
  arr: any[],
  equalTo?: string | number | boolean,
) {
  return arr.every((el) => el === equalTo);
}

export const getMaxFontSizeRatio = (text: string) => {
  const canvas = document.getElementById(
    'signatureBackground',
  ) as HTMLCanvasElement;
  if (!canvas?.getContext) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  ctx.font = '1rem ZhengKai';
  const metrics = ctx.measureText(text);
  const textWidth = metrics.width;
  const textHeight =
    metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
  // return canvas.width / textWidth; // 8
  // return canvas.height / textHeight; // 8.7912080541583
  return Math.min(canvas.width / textWidth, canvas.height / textHeight);
};

export const getCoordinate = (clientX: number, clientY: number) => {
  const canvas = document.getElementById(
    'signatureBackground',
  ) as HTMLCanvasElement;
  const canvasLT = canvas.getBoundingClientRect();
  return { x: clientX - canvasLT.left, y: clientY - canvasLT.top };
};

let rootFontSize: number;

function getRootFontSize() {
  if (!rootFontSize) {
    const doc = document.documentElement;
    const fontSize =
      doc.style.fontSize || window.getComputedStyle(doc).fontSize;

    rootFontSize = parseFloat(fontSize);
  }

  return rootFontSize;
}

function convertRem(value: string) {
  value = value.replace(/rem/g, '');
  return +value * getRootFontSize();
}

function convertVw(value: string) {
  value = value.replace(/vw/g, '');
  return (+value * window.innerWidth) / 100;
}

function convertVh(value: string) {
  value = value.replace(/vh/g, '');
  return (+value * window.innerHeight) / 100;
}
export const inBrowser = typeof window !== 'undefined';

export function unitToPx(value: string | number): number {
  if (typeof value === 'number') {
    return value;
  }

  if (inBrowser) {
    if (value.indexOf('rem') !== -1) {
      return convertRem(value);
    }
    if (value.indexOf('vw') !== -1) {
      return convertVw(value);
    }
    if (value.indexOf('vh') !== -1) {
      return convertVh(value);
    }
  }

  return parseFloat(value);
}
export const ratio = 750 / window.innerWidth;

export const useIsLayoutEffect = inBrowser
  ? React.useLayoutEffect
  : React.useEffect;

export const root = (inBrowser ? window : global) as unknown as Window;

export const isPromise = (
  funResult: unknown,
): funResult is Promise<unknown> => {
  return (
    !!funResult &&
    typeof funResult === 'object' &&
    typeof (funResult as any).then === 'function'
  );
};
