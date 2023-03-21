import { createContext } from "react";
import { PointDict } from "../types";

type ITriangleContext = {
  triangles: PointDict[];
  setTriangles: React.Dispatch<React.SetStateAction<PointDict[]>>;
};

export const TriangleContext = createContext<ITriangleContext>({
  triangles: [],
  setTriangles: () => {},
});
