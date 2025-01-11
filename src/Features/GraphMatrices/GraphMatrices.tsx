import React from "react";
import { IGraph } from "../../Shared/Types/animationComponentSlice_types";

interface GraphMatricesProps {
  graph: IGraph;
}

const GraphMatrices: React.FC<GraphMatricesProps> = ({ graph }) => {
  // Get all unique vertices
  const vertices = graph.vertices;
  const vertexMap = new Map<number, number>(); // Maps vertex data to its index
  vertices.forEach((vertex, index) => {
    vertexMap.set(vertex.data, index);
  });

  const vertexCount = vertices.length;

  // Adjacency Matrix
  const adjacencyMatrix: (number | null)[][] = Array.from(
    { length: vertexCount },
    () => Array(vertexCount).fill(null)
  );

  vertices.forEach((vertex) => {
    vertex.edges.forEach((edge) => {
      const startIndex = vertexMap.get(edge.start.data)!;
      const endIndex = vertexMap.get(edge.end.data)!;
      const weight = graph.isWeighted ? edge.weight : 1;

      adjacencyMatrix[startIndex][endIndex] = weight;

      if (!graph.isDirected) {
        adjacencyMatrix[endIndex][startIndex] = weight;
      }
    });
  });

  // Incidence Matrix
  const allEdges = vertices.flatMap((v) => v.edges).filter((_, index, arr) => index % 2 === 0); // Avoid duplicate edges
  const edgeCount = allEdges.length;
  const incidenceMatrix: (number | null)[][] = Array.from(
    { length: vertexCount },
    () => Array(edgeCount).fill(null)
  );

  allEdges.forEach((edge, edgeIndex) => {
    const startIndex = vertexMap.get(edge.start.data)!;
    const endIndex = vertexMap.get(edge.end.data)!;

    incidenceMatrix[startIndex][edgeIndex] = graph.isWeighted ? edge.weight : 1;

    if (!graph.isDirected) {
      incidenceMatrix[endIndex][edgeIndex] = graph.isWeighted ? edge.weight : 1;
    } else {
      incidenceMatrix[endIndex][edgeIndex] = graph.isWeighted ? -edge.weight! : -1;
    }
  });

  // Helper to render a matrix
  const renderMatrix = (matrix: (number | null)[][]) => (
    <table>
      <tbody>
        {matrix.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((value, colIndex) => (
              <td key={colIndex} style={{ padding: "4px", border: "1px solid black" }}>
                {value !== null ? value : 0}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div>
      <h3>Adjacency Matrix</h3>
      {renderMatrix(adjacencyMatrix)}

      <h3>Incidence Matrix</h3>
      {renderMatrix(incidenceMatrix)}
    </div>
  );
};

export default GraphMatrices;