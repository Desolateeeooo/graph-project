import { IEdge, IVertex } from '../AnimationComponent/animationComponentSlice_types';

export const createVertex = (data: number, edges: IEdge[]): IVertex => {
	return {
		data,
		edges,
	}
}