export type Point = {
  X: number;
  Y: number;
};

export type PointDict = {
  [key: string]: Point;
};

export type MaxAreaData = {
  maxArea: number;
  maxPoints?: PointDict;
};
