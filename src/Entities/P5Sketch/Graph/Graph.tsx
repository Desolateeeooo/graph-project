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

	return <div ref={sketchRef}></div>;
};


export default Graph;
