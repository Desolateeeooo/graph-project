import { IVertex } from "../Types/animationComponentSlice_types";

const depthFirstTraversal = (
	start: IVertex, 
	callback: (vertex: IVertex) => void, 
	visitedVertices = [start], 
) => {
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