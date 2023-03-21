import { ClientStatus, TriangleContext } from "@/pages";
import { PointDict } from "@/types";
import { renderPoint } from "@/utils";
import { Button, Card, Container, Text } from "@nextui-org/react";
import { useContext } from "react";

const TriangleCard = ({ triangle, deleteTriangle }) => {
  return (
    <Card variant="bordered" key={JSON.stringify(triangle)}>
      <Card.Body>
        {Object.keys(triangle).map((point) => {
          return <span key={point}>{renderPoint(triangle[point])}</span>;
        })}
        <Button color="secondary" size="sm" flat onClick={deleteTriangle}>
          Delete
        </Button>
      </Card.Body>
    </Card>
  );
};

const TriangleList = () => {
  const clientLoaded = useContext(ClientStatus);
  const { triangles, setTriangles } = useContext(TriangleContext);
  const deleteTriangle = (index: number) => () => {
    const newTriangles = triangles.filter((_, idx) => idx !== index);
    setTriangles(newTriangles);
  };

  const renderTriangleList = () => {
    if (!clientLoaded) return null;
    return triangles.map((triangle: PointDict, index: number) => {
      return (
        <TriangleCard
          key={JSON.stringify(triangle)}
          deleteTriangle={deleteTriangle(index)}
          triangle={triangle}
        />
      );
    });
  };

  return (
    <div className="existingTriangles" style={{ flex: 0.5 }}>
      <Text size="$2xl">Triangles</Text>
      {renderTriangleList()}
    </div>
  );
};

export default TriangleList;
