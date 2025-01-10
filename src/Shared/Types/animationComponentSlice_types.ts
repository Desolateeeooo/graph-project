export interface IEdge {
	start: IVertex;
	end: IVertex;
	weight: null | number;
	visited? : boolean;
}

export interface IVertex {
	data: number;
	edges: IEdge[];
	visited?: boolean;
}

export interface IGraph {
	isDirected: boolean;
	isWeighted: boolean;
	vertices: IVertex[];
}

export interface IAddVertex {
	vertexValue: number;
}

export interface IRemoveVertex {
	vertexValue: number;
}
