import React, { useEffect, useRef, useState } from "react";
import p5 from "p5";
import { IEdge, IGraph, IVertex } from "../../../Shared/Types/animationComponentSlice_types";
import depthFirstTraversal from "../../../Shared/helper_funcs/dfs";

interface GraphProps {
	graph: IGraph;
}

interface ILineObject {
	x1: number;
	y1: number;
	x2: number;   // Current end point starts at the starting point
	y2: number;
	targetX: number;
	targetY: number;
	color: string;
	started: boolean;
}

interface ITraversedEdge {
	from: {
			x: number;
			y: number;
	};
	to: {
			x: number;
			y: number;
	};
};

const Graph: React.FC<GraphProps> = ({ graph }) => {
	const sketchRef = useRef<HTMLDivElement>(null);
	const [traversedEdges, setTraversedEdges] = useState<ITraversedEdge[]>([]);

	let speed = 1; // Speed of the line movement
	let lines: ILineObject[] = []; // Array to store moving line states

	const additionalVertexes = graph.vertices.filter((v: IVertex, index: number) => index > 6);
	console.log(additionalVertexes);
	const traversedEdgesArr: ITraversedEdge[] = depthFirstTraversal(graph.vertices[0], (vertex) => console.log(vertex.data));
	console.log(traversedEdgesArr);

	useEffect(() => {

		const sketch = (p: p5) => {
			p.setup = () => {
				if (sketchRef.current) {
					p.createCanvas(800, 800).parent(sketchRef.current);
				} else {
					console.error("sketchRef.current is null or undefined.");
				}
				p.textAlign(p.CENTER, p.CENTER);

				const dfsTraversal = [
					{ from: { x: 200, y: 150 }, to: { x: 500, y: 100 } }, // Vertex 1 -> 2
					{ from: { x: 500, y: 100 }, to: { x: 150, y: 450 } }, // Vertex 2 -> 6
					{ from: { x: 150, y: 450 }, to: { x: 200, y: 650 } }, // Vertex 6 -> 7
					{ from: { x: 200, y: 650 }, to: { x: 450, y: 350 } }, // Vertex 7 -> 5
					{ from: { x: 450, y: 350 }, to: { x: 700, y: 150 } }, // Vertex 5 -> 3
					{ from: { x: 700, y: 150 }, to: { x: 700, y: 350 } }, // Vertex 3 -> 4
				];

				let accumulatedDelay = 0;

				dfsTraversal.forEach(({ from, to }, index) => {
					const distance = Math.sqrt(
						Math.pow(to.x - from.x, 2) + Math.pow(to.y - from.y, 2)
					);
					const duration = distance / speed; // Animation duration based on speed

					// Calculate delay for this line
					const delay = accumulatedDelay;
					accumulatedDelay += duration;

					// Add the line animation to the queue
					setTimeout(() => {
						lines.push(createLine(from.x, from.y, to.x, to.y, "red"));
					}, delay * 20); // Convert delay to deciseconds
				});
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

				additionalVertexes.forEach((v: IVertex, index1: number) => {
					v.edges.forEach((e: IEdge, index2: number) => {
						drawEdge(p, e.start.x, e.start.y, e.end.x, e.end.y, index1 + 7, index2);
					})
				})


				if (graph.dfs) {
					// Draw and animate lines with delay
					lines.forEach(lineState => drawAndAnimateLine(p, lineState));
				}

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

				additionalVertexes.forEach((v: IVertex, index: number) => {
					// const randomX = p.random(400, 800);
					// const randomY = p.random(400, 800);
					if (v.x && v.y) {
						drawVertex(p, v.x, v.y, 70, index + 7);
					}
				})

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

			let weight = graph.vertices[verticesIndex]?.edges[edgesIndex]?.weight;
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
					weight,
					x,
					y
				);
			}

		}

		const createLine = (x1: number, y1: number, targetX: number, targetY: number, color: string): ILineObject => {
			return {
				x1,
				y1,
				x2: x1,
				y2: y1,
				targetX,
				targetY,
				color,
				started: false
			};
		}

		// Helper function to draw and animate a moving line
		const drawAndAnimateLine = (p: p5, lineObject: ILineObject) => {
			p.stroke(lineObject.color);
			p.strokeWeight(5);
			p.line(lineObject.x1, lineObject.y1, lineObject.x2, lineObject.y2);

			// Update the position of the moving line's end point
			let dx = lineObject.targetX - lineObject.x2;
			let dy = lineObject.targetY - lineObject.y2;
			let distance = Math.sqrt(dx * dx + dy * dy);

			if (distance > speed) {
				lineObject.x2 += (dx / distance) * speed; // Normalize and scale by speed
				lineObject.y2 += (dy / distance) * speed; // Normalize and scale by speed
			}
		}

		const myP5 = new p5(sketch);

		return () => {
			myP5.remove();
		};
	}, [graph.vertices, graph.dfs, speed, additionalVertexes]);

	console.log(graph.vertices);

	return <div ref={sketchRef}></div>;
};


export default Graph;
