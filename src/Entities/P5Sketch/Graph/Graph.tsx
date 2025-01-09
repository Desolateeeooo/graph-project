import React, { useEffect, useRef } from "react";
import p5 from "p5";
import { IGraph } from "../../../Shared/Types/animationComponentSlice_types";

interface GraphProps {
	graph: IGraph;
}

const Graph: React.FC<GraphProps> = ({ graph }) => {
	const sketchRef = useRef<HTMLDivElement>(null);

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

				// Edge 2 to 1
				p.stroke('green');
				p.strokeWeight(5);
				p.line(500, 100, 200, 150);

				p.noStroke();
				p.fill(50);
				p.textSize(14);
				if (graph.vertices[1].edges[0].weight) {
					p.text(
						graph.vertices[1].edges[0].weight.toString(),
						(500 + 200) / 2 - 20,
						(100 + 150) / 2 + 20
					);
				}

				// Edge 2 to 3
				p.stroke('green');
				p.strokeWeight(5);
				p.line(500, 100, 700, 150);

				p.noStroke();
				p.fill(50);
				p.textSize(14);
				if (graph.vertices[1].edges[3].weight) {
					p.text(
						graph.vertices[1].edges[3].weight.toString(),
						(500 + 700) / 2 - 20,
						(100 + 150) / 2 + 20
					);
				}


				// Edge 4 to 3
				p.stroke('green');
				p.strokeWeight(5);
				p.line(700, 350, 700, 150);

				p.noStroke();
				p.fill(50);
				p.textSize(14);
				if (graph.vertices[3].edges[0].weight) {
					p.text(
						graph.vertices[3].edges[0].weight.toString(),
						(700 + 700) / 2 - 20,
						(350 + 150) / 2
					);
				}


				// Edge 5 to 2
				p.stroke('green');
				p.strokeWeight(5);
				p.line(450, 350, 500, 100);

				p.noStroke();
				p.fill(50);
				p.textSize(14);
				if (graph.vertices[4].edges[1].weight) {
					p.text(
						graph.vertices[4].edges[1].weight.toString(),
						(450 + 500) / 2 - 20,
						(350 + 100) / 2 - 10
					);
				}


				// Edge 5 to 4
				p.stroke('green');
				p.strokeWeight(5);
				p.line(450, 350, 700, 350);

				p.noStroke();
				p.fill(50);
				p.textSize(14);
				if (graph.vertices[4].edges[3].weight) {
					p.text(
						graph.vertices[4].edges[3].weight.toString(),
						(450 + 700) / 2 - 20,
						(350 + 350) / 2 - 10
					);
				}

				// Edge 5 to 3
				p.stroke('green');
				p.strokeWeight(5);
				p.line(450, 350, 700, 150);

				p.noStroke();
				p.fill(50);
				p.textSize(14);
				if (graph.vertices[4].edges[2].weight) {
					p.text(
						graph.vertices[4].edges[2].weight.toString(),
						(450 + 700) / 2 - 20,
						(350 + 150) / 2 - 10
					);
				}

				// Edge 5 to 1
				p.stroke('green');
				p.strokeWeight(5);
				p.line(450, 350, 200, 150);

				p.noStroke();
				p.fill(50);
				p.textSize(14);
				if (graph.vertices[4].edges[0].weight) {
					p.text(
						graph.vertices[4].edges[0].weight.toString(),
						(450 + 200) / 2 + 30,
						(350 + 150) / 2 - 30
					);
				}


				// Edge 5 to 7
				p.stroke('green');
				p.strokeWeight(5);
				p.line(450, 350, 200, 650);

				p.noStroke();
				p.fill(50);
				p.textSize(14);
				if (graph.vertices[4].edges[4].weight) {
					p.text(
						graph.vertices[4].edges[4].weight.toString(),
						(450 + 200) / 2 + 20,
						(350 + 650) / 2 + 20
					);
				}

				// Edge 6 to 1
				p.stroke('green');
				p.strokeWeight(5);
				p.line(150, 450, 200, 150);

				p.noStroke();
				p.fill(50);
				p.textSize(14);
				if (graph.vertices[5].edges[0].weight) {
					p.text(
						graph.vertices[5].edges[0].weight.toString(),
						(150 + 200) / 2 - 20,
						(450 + 150) / 2 + 20
					);
				}

				// Edge 6 to 2
				p.stroke('green');
				p.strokeWeight(5);
				p.line(150, 450, 500, 100);

				p.noStroke();
				p.fill(50);
				p.textSize(14);
				if (graph.vertices[5].edges[1].weight) {
					p.text(
						graph.vertices[5].edges[1].weight.toString(),
						(150 + 500) / 2 - 10,
						(450 + 100) / 2 + 50
					);
				}

				// Edge 6 to 7
				p.stroke('green');
				p.strokeWeight(5);
				p.line(150, 450, 200, 650);

				p.noStroke();
				p.fill(50);
				p.textSize(14);
				if (graph.vertices[6].edges[1].weight) {
					p.text(
						graph.vertices[6].edges[1].weight.toString(),
						(150 + 200) / 2 - 20,
						(450 + 650) / 2
					);
				}




				// Vertex 1
				p.fill(200, 100, 100);
				p.noStroke();
				p.circle(200, 150, 70);

				p.fill(255);
				p.textSize(16);
				p.text(graph.vertices[0].data.toString(), 200, 150);

				// Vertex 2
				p.fill(200, 100, 100);
				p.noStroke();
				p.circle(500, 100, 70);

				p.fill(255);
				p.textSize(16);
				p.text(graph.vertices[1].data.toString(), 500, 100);


				// Vertex 3
				p.fill(200, 100, 100);
				p.noStroke();
				p.circle(700, 150, 70);

				p.fill(255);
				p.textSize(16);
				p.text(graph.vertices[2].data.toString(), 700, 150);

				// Vertex 4
				p.fill(200, 100, 100);
				p.noStroke();
				p.circle(700, 350, 70);

				p.fill(255);
				p.textSize(16);
				p.text(graph.vertices[3].data.toString(), 700, 350);


				// Vertex 5
				p.fill(200, 100, 100);
				p.noStroke();
				p.circle(450, 350, 70);

				p.fill(255);
				p.textSize(16);
				p.text(graph.vertices[4].data.toString(), 450, 350);

				// Vertex 6
				p.fill(200, 100, 100);
				p.noStroke();
				p.circle(150, 450, 70);
				p.fill(255);

				p.fill(255);
				p.textSize(16);
				p.text(graph.vertices[5].data.toString(), 150, 450);


				// Vertex 7
				p.fill(200, 100, 100);
				p.noStroke();
				p.circle(200, 650, 70);

				p.fill(255);
				p.textSize(16);
				p.text(graph.vertices[6].data.toString(), 200, 650);

				// graph.vertices.forEach((vertex) => {
				//   vertex.edges.forEach((edge) => {
				//     const { start, end, weight } = edge;

				//     // Draw the edge
				// 		p.line(start.data * 100, start.data * 100, end.data * 100, end.data * 100)


				//     // Draw the weight (if present)
				//     if (weight !== null) {
				//       const midX = (start.data * 100 + end.data * 100) / 2;
				//       const midY = (start.data * 100 + end.data * 100) / 2;
				//       p.noStroke();
				//       p.fill(50);
				//       p.textSize(14);
				//       p.text(weight.toString(), midX, midY);
				//     }
				//   });
				// });

				// Draw vertices
				// graph.vertices.forEach((v, index) => {
				//   const x = v.data * 100;
				//   const y = v.data * 100;

				//   p.fill(200, 100, 100);
				//   p.noStroke();
				//   p.ellipse(x, y, 40, 40);

				//   p.fill(255);
				//   p.textSize(16);
				//   p.text(index + 1, x, y); // Label the vertex
				// });
			};
		};

		const myP5 = new p5(sketch);

		return () => {
			myP5.remove();
		};
	}, [graph]);

	console.log(graph.vertices);

	return <div ref={sketchRef}></div>;
};


export default Graph;
