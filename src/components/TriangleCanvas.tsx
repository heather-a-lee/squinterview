import { TriangleContext } from "@/pages";
import { PointDict } from "@/types";
import { useContext, useEffect, useRef } from "react";

const TriangleCanvas = () => {
  const { triangles } = useContext(TriangleContext);
  const canvasRef = useRef(null);
  const draw = (ctx: CanvasRenderingContext2D, trianglePoints: PointDict) => {
    console.log("Calling draw with trianglePoints", trianglePoints);
    ctx.beginPath();
    let firstPoint = true;
    Object.keys(trianglePoints).forEach((point) => {
      const { X, Y } = trianglePoints[point];
      if (firstPoint) {
        console.log("Calling moveTo", X, Y);
        ctx.moveTo(X, Y);
        firstPoint = false;
      } else {
        console.log("Calling lineTo", X, Y);
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
      context.clearRect(0, 0, canvas.width, canvas.height);
      triangles.forEach((triangle) => {
        draw(context, triangle);
      });
    };
    render();
  }, [triangles]);

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

export default TriangleCanvas;
