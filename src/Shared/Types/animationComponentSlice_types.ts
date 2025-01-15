export interface IEdge {
	start: IVertex;
	end: IVertex;
	weight: null | number;
}

export interface IVertex {
	data: number;
	edges: IEdge[];
	x: number;
	y: number;
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

export interface IRemoveVertex {
	data: number;
}

export interface IToggleDFS {
	depthFirstSearch: boolean;
}

export interface IAddEdge {
	from: number;
	to: number;
}

export interface IRemoveEdge {
	from: number;
	to: number;
}