import Edge from "./edge.ts";

class Vertex {
	readonly data: number;
	edges: Edge[];

	constructor(data: number) {
		this.data = data;
		this.edges = [];
	}

	addEdge(vertex: Vertex, weight: number | null) {
		if (vertex instanceof Vertex) {
			this.edges.push(new Edge(this, vertex, weight));
		} else {
			throw new Error('Начало и конец ребра должны быть вершинами');
		}
	}

	removeEdge(vertex: Vertex) {
		this.edges = this.edges.filter(edge => edge.end !== vertex);
	}

	print() {
		const edgeList = this.edges.map(edge =>
			edge.weight !== null ? `${edge.end.data} (${edge.weight})` : edge.end.data) || [];

		const output = `${this.data} --> ${edgeList.join(', ')}`;
		console.log(output);
	}

}

export default Vertex;