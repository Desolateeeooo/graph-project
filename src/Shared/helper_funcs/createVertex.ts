import { IEdge, IVertex } from '../Types/animationComponentSlice_types';

export const createVertex = (data: number, edges: IEdge[]): IVertex => {
	return {
		data,
		edges,
	}
}