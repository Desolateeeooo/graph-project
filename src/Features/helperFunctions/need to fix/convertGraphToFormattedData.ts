import { IGraph } from "../../AnimationComponent/animationComponentSlice_types";

interface IGraphFormattedDataNode {
	id: string;
	group: number;
	name: string;
}

interface IGraphFormattedDataLink {
	source: string;
	target: string;
	value: number;
	label: string;
}

export interface IFormattedData {
	nodes: IGraphFormattedDataNode[];
	links: IGraphFormattedDataLink[];
}

export function convertGraphToFormattedData(graph: IGraph): IFormattedData {
  const formattedData: IFormattedData = {
    nodes: [],
    links: []
  };

  // Convert vertices to nodes
  graph.vertices.forEach(vertex => {
    formattedData.nodes.push({
      id: `vertex_${vertex.data}`, // Ensure a unique ID
      group: 1, // Assign group as needed
      name: `Vertex ${vertex.data}`
    });
  });

  // Convert edges to links
  graph.vertices.forEach(vertex => {
    vertex.edges.forEach(edge => {
      formattedData.links.push({
        source: `vertex_${edge.start.data}`,
        target: `vertex_${edge.end.data}`,
        value: edge.weight || 1, // Use weight if available, else default to 1
        label: edge.weight !== null ? `Weight: ${edge.weight}` : ""
      });
    });
  });

  return formattedData;
}