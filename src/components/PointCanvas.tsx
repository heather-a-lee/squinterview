import { Point, PointDict } from "@/types";
import { useEffect, useRef, useState } from "react";

const PointCanvas = ({ points, maxArea }) => {
  const canvasRef = useRef(null);
  const draw = (
    ctx: CanvasRenderingContext2D,
    points: Point[],
    area: { maxArea: number; maxPoint: PointDict }
  ) => {
    console.log("Calling draw with points", points);
    ctx.beginPath();
    let firstPoint = true;
    if (area.maxArea) {
      ctx.moveTo(area.maxPoint.pointA.X, area.maxPoint.pointA.Y);
      ctx.lineTo(area.maxPoint.pointB.X, area.maxPoint.pointB.Y);
      ctx.lineTo(area.maxPoint.pointC.X, area.maxPoint.pointC.Y);
    }
    ctx.closePath();
    points.forEach((point) => {
      const { X, Y } = point;
      ctx.fillRect(X, Y, 5, 5);
    });
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#666666";
    ctx.stroke();

    // // the fill color
    // ctx.fillStyle = "#FFCC00";
    // ctx.fill();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    const render = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      // points.forEach((point) => {
      draw(context, points, maxArea);
      // });
    };
    render();
  }, [points, maxArea]);

  return (
    <div className="canvas">
      <canvas
        width="500"
        height="500"
        style={{
          objectFit: "contain",
          width: 500,
          height: 500,
          border: "1px solid #000",
          display: "block",
        }}
        ref={canvasRef}
      />
    </div>
  );
};

export default PointCanvas;
