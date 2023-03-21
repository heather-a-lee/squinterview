import { PointDict } from "@/types";
import { useEffect, useRef, useState } from "react";

const POINTS = [
  {
    pointLabel: "Point A",
    pointName: "pointA",
  },
  {
    pointLabel: "Point B",
    pointName: "pointB",
  },
  {
    pointLabel: "Point C",
    pointName: "pointC",
  },
];

const DEFAULT_POINTS = {
  pointA: {
    X: "",
    Y: "",
  },
  pointB: {
    X: "",
    Y: "",
  },
  pointC: {
    X: "",
    Y: "",
  },
};

const TriangleForm = ({ triangles, setTriangles }) => {
  const [points, setPoints] = useState<PointDict>(DEFAULT_POINTS);
  useEffect(() => {
    setPoints(DEFAULT_POINTS);
  }, [triangles]);

  console.log("points", points);

  const updatePoint = (pointName: string, axis: string) => (e) => {
    const { value } = e.target;
    setPoints((points) => {
      return {
        ...points,
        [pointName]: { ...points[pointName], [axis]: Number(value) },
      };
    });
  };

  const handleSubmit = (e) => {
    // TODO: Add validation to check that the points are valid and numbers
    e.preventDefault();
    const expectedPoints = POINTS.map(({ pointName }) => pointName);
    for (const expectedPoint of expectedPoints) {
      if (!points[expectedPoint]) {
        console.log("There was an issue here");
        return;
      }
    }
    setTriangles((triangles: PointDict[]) => [...triangles, points]);
  };

  const renderPoint = (pointLabel: string, pointName: string) => {
    return (
      <fieldset key={pointName}>
        <legend>{pointLabel}</legend>
        <input
          type="text"
          placeholder="X"
          name={`${pointName}X`}
          onChange={updatePoint(pointName, "X")}
          value={points[pointName].X}
        />
        <input
          type="text"
          placeholder="Y"
          name={`${pointName}Y`}
          onChange={updatePoint(pointName, "Y")}
          value={points[pointName] ? points[pointName].Y : ""}
        />
      </fieldset>
    );
  };

  return (
    <div>
      <form>
        {POINTS.map((point) => renderPoint(point.pointLabel, point.pointName))}
        <button type="submit" onClick={handleSubmit}>
          Create Triangle
        </button>
      </form>
    </div>
  );
};

export default TriangleForm;
