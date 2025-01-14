import { IVertex } from "../Types/animationComponentSlice_types";

const depthFirstTraversal = (
	start: IVertex,
	callback: (vertex: IVertex) => void,
	visitedVertices: IVertex[] = [start],
	traversedEdges: { from: { x: number; y: number }; to: { x: number; y: number } }[] = []
): { from: { x: number; y: number }, to: { x: number; y: number } }[] => {
	callback(start);

	start.edges.forEach((edge) => {
			const neighbor = edge.end;

			if (!visitedVertices.includes(neighbor)) {
					visitedVertices.push(neighbor);

					if (start.x !== undefined && start.y !== undefined && neighbor.x !== undefined && neighbor.y !== undefined) {
							traversedEdges.push({
									from: { x: start.x, y: start.y },
									to: { x: neighbor.x, y: neighbor.y }
							});
					}

					depthFirstTraversal(neighbor, callback, visitedVertices, traversedEdges);
			}
	});

	return traversedEdges;
};

export default depthFirstTraversal;