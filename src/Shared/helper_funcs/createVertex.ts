import { IEdge, IVertex } from '../Types/animationComponentSlice_types';

export const createVertex = (data: number, edges: IEdge[], x: number, y: number): IVertex => {
	return {
		data,
		edges,
		x,
		y
	}
}