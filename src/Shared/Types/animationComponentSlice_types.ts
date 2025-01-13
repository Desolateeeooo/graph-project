export interface IEdge {
	start: IVertex;
	end: IVertex;
	weight: null | number;
}

export interface IVertex {
	data: number;
	edges: IEdge[];
}

export interface IGraph {
	isDirected: boolean;
	isWeighted: boolean;
	vertices: IVertex[];
	dfs: boolean;
}

export interface IAddVertex {
	data: number;
}

export interface IToggleDFS {
	depthFirstSearch: boolean;
}

