import Vertex from './vertex';

type Matrix = number[][];

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

	print(): void {
		const vertexList = this.vertices;
		vertexList.forEach(vertex => vertex.print());
	}

	getAdjacencyMatrix(): Matrix {
		const vertexMap = this.vertices.map(v => v.data);
		const size = vertexMap.length;
		const matrix: Matrix = Array.from({ length: size }, () => Array(size).fill(0));

		this.vertices.forEach((vertex, i) => {
			vertex.edges.forEach(edge => {
				const j = vertexMap.indexOf(edge.end.data);
				if (j !== -1) {
					matrix[i][j] = this.isWeighted ? edge.weight || 1 : 1;
				}
			});
		});

		return matrix;
	}

	getIncidenceMatrix(): Matrix {
		const vertexMap = this.vertices.map(v => v.data);
		const edgeList = this.vertices.flatMap(vertex => vertex.edges);
		const matrix: Matrix = Array.from({ length: vertexMap.length }, () => Array(edgeList.length).fill(0));

		edgeList.forEach((edge, edgeIndex) => {
			const startIndex = vertexMap.indexOf(edge.start.data);
			const endIndex = vertexMap.indexOf(edge.end.data);

			if (startIndex !== -1) {
				matrix[startIndex][edgeIndex] = this.isWeighted ? edge.weight || 1 : 1;
			}

			if (endIndex !== -1) {
				matrix[endIndex][edgeIndex] = this.isDirected ? -1 : this.isWeighted ? edge.weight || 1 : 1;
			}
		});

		return matrix;
	}
}

export default Graph;