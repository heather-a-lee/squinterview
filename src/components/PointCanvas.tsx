import { canvasStyle } from "@/styles/canvasStyles";
import { MaxAreaData, Point } from "@/types";
import { useEffect, useRef } from "react";

const PointCanvas = ({
  points,
  maxAreaData,
}: {
  points: Point[];
  maxAreaData: MaxAreaData;
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const draw = (
    ctx: CanvasRenderingContext2D,
    points: Point[],
    area: MaxAreaData
  ) => {
    ctx.beginPath();
    if (area.maxArea && area.maxPoints) {
      ctx.moveTo(area.maxPoints.pointA.X, area.maxPoints.pointA.Y);
      ctx.lineTo(area.maxPoints.pointB.X, area.maxPoints.pointB.Y);
      ctx.lineTo(area.maxPoints.pointC.X, area.maxPoints.pointC.Y);
    }
    ctx.closePath();
    points.forEach((point) => {
      const { X, Y } = point;
      ctx.fillRect(X, Y, 5, 5);
    });
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#666666";
    ctx.stroke();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    const render = () => {
      if (!context) return;
      context.clearRect(0, 0, canvas.width, canvas.height);
      draw(context, points, maxAreaData);
    };
    render();
  }, [points, maxAreaData]);

  return (
    <div className="canvas">
      <canvas width="500" height="500" style={canvasStyle} ref={canvasRef} />
    </div>
  );
};

export default PointCanvas;
