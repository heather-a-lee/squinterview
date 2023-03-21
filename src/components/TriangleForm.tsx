import { TriangleContext } from "@/contexts/triangleContext";
import { Point, PointDict } from "@/types";
import { isValidTriangle } from "@/utils";
import { Button, Input, Spacer } from "@nextui-org/react";
import { useContext } from "react";
import { FieldError, FieldErrors, useForm } from "react-hook-form";

enum PointName {
  A = "pointA",
  B = "pointB",
  C = "pointC",
}

const POINTS = [
  {
    pointLabel: "Point A",
    pointName: PointName.A,
  },
  {
    pointLabel: "Point B",
    pointName: PointName.B,
  },
  {
    pointLabel: "Point C",
    pointName: PointName.C,
  },
];

type FormData = {
  pointA: Point;
  pointB: Point;
  pointC: Point;
};

const TriangleForm = () => {
  const { setTriangles } = useContext(TriangleContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    const { pointA, pointB, pointC } = data;
    const valid = isValidTriangle(pointA, pointB, pointC);
    if (!valid) {
      setError("root.invalidTriangle", {});
      return;
    }
    setTriangles((triangles: PointDict[]) => [...triangles, data]);
    reset();
  };

  const renderInput = (
    type: "X" | "Y",
    pointName: PointName,
    error: FieldError | undefined
  ) => {
    const getTextColor = () => {
      if (error) return "error";
      return "default";
    };
    return (
      <Input
        type="number"
        label={type}
        placeholder={type}
        {...register(`${pointName}.${type}`, {
          valueAsNumber: true,
          required: `${pointName}.${type} is required`,
        })}
        color={getTextColor()}
        status={getTextColor()}
        helperText={error ? errors[pointName]?.[type]?.message : ""}
        helperColor={getTextColor()}
      />
    );
  };

  const renderPoint = (pointLabel: string, pointName: PointName) => {
    return (
      <fieldset key={pointName}>
        <legend>{pointLabel}</legend>
        {renderInput("X", pointName, errors[pointName]?.X)}
        <Spacer y={0.5} />
        {renderInput("Y", pointName, errors[pointName]?.Y)}
      </fieldset>
    );
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {POINTS.map((point) => renderPoint(point.pointLabel, point.pointName))}
        <Spacer y={0.5} />
        <Button type="submit">Create Triangle</Button>
      </form>
      {errors.root?.invalidTriangle && <div>Invalid triangle</div>}
    </div>
  );
};

export default TriangleForm;
