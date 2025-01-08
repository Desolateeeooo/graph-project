import { IEdge, IVertex } from '../../Shared/Types/animationComponentSlice_types';

export const createVertex = (data: number, edges: IEdge[]): IVertex => {
	return {
		data,
		edges,
	}
}