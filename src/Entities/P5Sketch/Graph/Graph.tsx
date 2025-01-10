import React, { useEffect, useRef } from "react";
import p5 from "p5";
import { IGraph, IVertex } from "../../../Shared/Types/animationComponentSlice_types";

interface GraphProps {
	graph: IGraph;
}

const Graph: React.FC<GraphProps> = ({ graph }) => {
	const sketchRef = useRef<HTMLDivElement>(null);

	const traversalArray: { from: IVertex, to: IVertex }[] = [];
	// depthFirstTraversal(graph.vertices[0], (vertex) => {
	// 	console.log(vertex.data);
	// }, traversalArray);

	// console.log(traversalArray);

	useEffect(() => {
		const sketch = (p: p5) => {
			p.setup = () => {
				if (sketchRef.current) {
					p.createCanvas(800, 800).parent(sketchRef.current);
				} else {
					console.error("sketchRef.current is null or undefined.");
				}
				p.textAlign(p.CENTER, p.CENTER);
			};

			p.draw = () => {
				p.background(240);

				// Draw edges
				p.stroke(0);
				p.strokeWeight(2);

				for (let lineX = 0; lineX < 8; lineX++) {
					p.line(100 + lineX * 100, 0, 100 + lineX * 100, p.height);
				}

				for (let lineY = 0; lineY < 8; lineY++) {
					p.line(0, 100 + lineY * 100, p.height, 100 + lineY * 100);
				}

				// Vertex 2 Edges
				// Edge 2 to 1
				drawEdge(p, 500, 100, 200, 150, 1, 0, "subtract", 20, 0, "add", 0, 20);

				// Edge 2 to 3
				drawEdge(p, 500, 100, 700, 150, 1, 3, "subtract", 20, 0, "add", 0, 20);

				// Edge 4 to 3
				drawEdge(p, 700, 350, 700, 150, 3, 0, "subtract", 20, 0);

				// Edge 5 to 2
				drawEdge(p, 450, 350, 500, 100, 4, 1, "subtract", 20, 0, "subtract", 10);

				// Edge 5 to 4
				drawEdge(p, 450, 350, 700, 350, 4, 3, "subtract", 20, 0, "subtract", 10);

				// Edge 5 to 3
				drawEdge(p, 450, 350, 700, 150, 4, 2, "subtract", 20, 0, "subtract", 10);

				// Edge 5 to 1
				drawEdge(p, 450, 350, 200, 150, 4, 0, "subtract", 10, 0, "subtract", 30);

				// Edge 5 to 7
				drawEdge(p, 450, 350, 200, 650, 4, 4, "add", 0, 20, "add", 0, 20);

				// Edge 6 to 1
				drawEdge(p, 150, 450, 200, 150, 5, 0, "subtract", 20, 0, "add", 0, 20);

				// Edge 6 to 2
				drawEdge(p, 150, 450, 500, 100, 5, 1, "subtract", 10, 0, "add", 0, 50);

				// Edge 6 to 7
				drawEdge(p, 150, 450, 200, 650, 6, 1, "subtract", 20);

				// Vertex 1
				drawVertex(p, 200, 150, 70, 0);

				// Vertex 2
				drawVertex(p, 500, 100, 70, 1);

				// Vertex 3
				drawVertex(p, 700, 150, 70, 2);

				// Vertex 4
				drawVertex(p, 700, 350, 70, 3);

				// Vertex 5
				drawVertex(p, 450, 350, 70, 4);

				// Vertex 6
				drawVertex(p, 150, 450, 70, 5);

				// Vertex 7
				drawVertex(p, 200, 650, 70, 6);

			};
		};

		const drawVertex = (p: p5, x: number, y: number, width: number, vertexIndex: number) => {
			p.fill(200, 100, 100);
			p.noStroke();
			p.circle(x, y, width);

			p.fill(255);
			p.textSize(16);
			p.text(graph.vertices[vertexIndex].data.toString(), x, y);
		}

		const drawEdge = (
			p: p5,
			x1: number,
			y1: number,
			x2: number,
			y2: number,
			verticesIndex: number,
			edgesIndex: number,
			xCalculation?: "subtract" | "add",
			subtractX?: number,
			addX?: number,
			yCalculation?: "subtract" | "add",
			subtractY?: number,
			addY?: number,
		) => {

			p.stroke('green');
			p.strokeWeight(5);
			p.line(x1, y1, x2, y2);

			p.noStroke();
			p.fill(50);
			p.textSize(14);

			const weight = graph.vertices[verticesIndex]?.edges[edgesIndex]?.weight;
			let x: number = (x1 + x2) / 2;
			let y: number = (y1 + y2) / 2;

			if (xCalculation) {
				if (xCalculation === "subtract" && subtractX) {
					x = (x1 + x2) / 2 - subtractX;
				} else if (xCalculation === "add" && addX) {
					x = (x1 + x2) / 2 + addX;
				}
			}

			if (yCalculation) {
				if (yCalculation === "subtract" && subtractY) {
					y = (y1 + y2) / 2 - subtractY;
				} else if (yCalculation === "add" && addY) {
					y = (y1 + y2) / 2 + addY;
				}
			}

			if (weight !== null && weight !== undefined) {
				p.text(
					weight.toString(),
					x,
					y
				);
			}

		}

		const myP5 = new p5(sketch);

		return () => {
			myP5.remove();
		};
	}, [graph]);

	console.log(graph.vertices);

	return <div ref={sketchRef}></div>;
};


export default Graph;
