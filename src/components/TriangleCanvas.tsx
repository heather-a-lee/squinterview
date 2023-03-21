import { TriangleContext } from "@/contexts/triangleContext";
import { canvasStyle } from "@/styles/canvasStyles";
import { PointDict } from "@/types";
import { useContext, useEffect, useRef } from "react";

const TriangleCanvas = () => {
  const { triangles } = useContext(TriangleContext);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const draw = (ctx: CanvasRenderingContext2D, trianglePoints: PointDict) => {
    ctx.beginPath();
    let firstPoint = true;
    Object.keys(trianglePoints).forEach((point) => {
      const { X, Y } = trianglePoints[point];
      if (firstPoint) {
        ctx.moveTo(X, Y);
        firstPoint = false;
      } else {
        ctx.lineTo(X, Y);
      }
    });
    ctx.closePath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#666666";
    ctx.stroke();

    // the fill color
    ctx.fillStyle = "#FFCC00";
    ctx.fill();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    const render = () => {
      if (!context) return;
      context.clearRect(0, 0, canvas.width, canvas.height);
      triangles.forEach((triangle) => {
        draw(context, triangle);
      });
    };
    render();
  }, [triangles]);

  return (
    <div className="canvas">
      <canvas width="500" height="500" style={canvasStyle} ref={canvasRef} />
    </div>
  );
};

export default TriangleCanvas;
