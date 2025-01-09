import Vertex from "../../Entities/GraphClass/vertex";

const depthFirstTraversal = (start: Vertex, callback: (vertex: Vertex) => void, visitedVertices = [start]) => {
	callback(start);

	start.edges.forEach((edge) => {
		const neighbor = edge.end;

		if (!visitedVertices.includes(neighbor)) {
			visitedVertices.push(neighbor);
			depthFirstTraversal(neighbor, callback, visitedVertices);
		}

	});
};

export default depthFirstTraversal;