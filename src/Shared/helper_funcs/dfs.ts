import { IVertex } from "../Types/animationComponentSlice_types";

const depthFirstTraversal = (
	start: IVertex, 
	callback: (vertex: IVertex) => void, 
	traversalArray: { from: IVertex, to: IVertex }[] = [],
	visitedVertices = [start], 
) => {
	callback(start);

	start.edges.forEach((edge) => {
		const neighbor = edge.end;

		// Add the traversed edge to the traversalArray
		traversalArray.push({ from: start, to: neighbor });

		if (!visitedVertices.includes(neighbor)) {
			visitedVertices.push(neighbor);
			depthFirstTraversal(neighbor, callback, traversalArray, visitedVertices);
		}
	});
};

export default depthFirstTraversal;