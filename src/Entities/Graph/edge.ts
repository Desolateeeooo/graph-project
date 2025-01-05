import Vertex from './vertex';

class Edge {
	start: Vertex;
	end: Vertex;
	weight: null | number;

	constructor(start: Vertex, end: Vertex, weight: null | number = null) {
		this.start = start;
		this.end = end;
		this.weight = weight;
	}
}

export default Edge;