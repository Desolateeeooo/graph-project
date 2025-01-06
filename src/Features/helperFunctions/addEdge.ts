import { IEdge, IVertex } from "../AnimationComponent/animationComponentSlice_types"

export const addEdge = (isDirected: boolean, vertexOne: IVertex, vertexTwo: IVertex, weight: number | null): IEdge[] => {
	if (isDirected) {
		return [
			{
				start: vertexOne,
				end: vertexTwo,
				weight: weight
			}
		]
	} else {
		return [
			{
				start: vertexOne,
				end: vertexTwo,
				weight: weight,
			},
			{
				start: vertexTwo,
				end: vertexOne,
				weight: weight
			}
		]
	}
}
