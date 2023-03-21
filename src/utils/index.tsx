import { Point } from "@/types";

const getArea = (pointA: Point, pointB: Point, pointC: Point) => {
  const { X: x1, Y: y1 } = pointA;
  const { X: x2, Y: y2 } = pointB;
  const { X: x3, Y: y3 } = pointC;

  const area = x1 * (y2 - y3) + x2 * (y3 - y1) + x3 * (y1 - y2);
  return area;
};

const isValidTriangle = (pointA: Point, pointB: Point, pointC: Point) => {
  return getArea(pointA, pointB, pointC) !== 0;
};

const getLargestTriangle = (points) => {
  let maxArea = 0;
  let maxPoint;
  for (let i = 0; i < points.length - 2; i++) {
    for (let j = i + 1; j < points.length - 1; j++) {
      for (let k = j + 1; k < points.length; k++) {
        const currentArea = getArea(points[i], points[j], points[k]);
        if (currentArea > maxArea) {
          maxArea = currentArea;
          maxPoint = {
            pointA: points[i],
            pointB: points[j],
            pointC: points[k],
          };
        }
      }
    }
  }
  return { maxArea, maxPoint };
};

const renderPoint = (point: Point) => {
  return `(${point.X}, ${point.Y})`;
};

export { isValidTriangle, getLargestTriangle, renderPoint };
