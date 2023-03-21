import { PointDict } from "@/types";
import { isValidTriangle } from "@/utils";
import { Button, Input, Spacer } from "@nextui-org/react";
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
  const [error, setError] = useState("");

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

  const handleSubmit = () => {
    // TODO: Add validation to check that the points are valid and numbers
    const expectedPoints = POINTS.map(({ pointName }) => pointName);
    for (const expectedPoint of expectedPoints) {
      if (!points[expectedPoint]) {
        console.log("There was an issue here");
        return;
      }
    }
    const valid = isValidTriangle(points.pointA, points.pointB, points.pointC);
    if (!valid) {
      setError("Invalid triangle");
      return;
    }
    setTriangles((triangles: PointDict[]) => [...triangles, points]);
  };

  const renderPoint = (pointLabel: string, pointName: string) => {
    return (
      <fieldset key={pointName}>
        <legend>{pointLabel}</legend>
        <Input
          type="text"
          label="X"
          placeholder="X"
          name={`${pointName}X`}
          onChange={updatePoint(pointName, "X")}
          value={points[pointName].X}
        />
        <Spacer y={0.5} />
        <Input
          type="text"
          label="Y"
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
        <Spacer y={0.5} />
        <Button onPress={handleSubmit}>Create Triangle</Button>
      </form>
      {error && <div>{error}</div>}
    </div>
  );
};

export default TriangleForm;
