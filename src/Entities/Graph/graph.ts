import Vertex from './vertex';

// type Matrix = number[][];
class Graph {
	vertices: Vertex[];
	isDirected: boolean;
	isWeighted: boolean;

	constructor(isDirected = false, isWeighted = false) {
		this.vertices = [];
		this.isDirected = isDirected;
		this.isWeighted = isWeighted;
	}

	addVertex(data: number): Vertex {
		const newVertex = new Vertex(data);
		this.vertices.push(newVertex);
		console.log(`Вершина: ${newVertex} была успешно добавлена в граф!`)
		return newVertex;
	}

	removeVertex(vertex: Vertex): void {
		this.vertices = this.vertices.filter(v => v !== vertex);
	}

	addEdge(vertexOne: Vertex | undefined, vertexTwo: Vertex | undefined, weight: number | null): void {
		const edgeWeight = this.isWeighted ? weight : null;

		if (vertexOne instanceof Vertex && vertexTwo instanceof Vertex) {
			vertexOne.addEdge(vertexTwo, edgeWeight);

			if (!this.isDirected) {
				vertexTwo.addEdge(vertexOne, edgeWeight);
			}
		} else {
			throw new Error('Ожидаемые аргументы должны быть вершинами.');
		}
	}

	removeEdge(vertexOne: Vertex | undefined, vertexTwo: Vertex | undefined): void {
		if (vertexOne instanceof Vertex && vertexTwo instanceof Vertex) {
			vertexOne.removeEdge(vertexTwo);

			if (!this.isDirected) {
				vertexTwo.removeEdge(vertexOne);
			}

		} else {
			throw new Error('Ожидаемые аргументы должны быть вершинами.');
		}
	}

	getVertexByValue(value: number): Vertex | undefined {
		return this.vertices.find(vertex => vertex.data === value);
	}
	
}

export default Graph;