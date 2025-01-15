import { IEdge, IVertex } from "../Types/animationComponentSlice_types";


export const removeEdgeFunc = (vertexToRemove: IVertex, vertexFromRemove: IVertex) => {
	return vertexFromRemove.edges.filter((edge: IEdge) => edge.end.data !== vertexToRemove.data);
}