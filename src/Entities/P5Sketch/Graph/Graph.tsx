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
        graph.vertices.forEach((vertex) => {
          vertex.edges.forEach((edge) => {
            const { start, end, weight } = edge;

            // Draw the edge
						p.line(start.data * 100, start.data * 100, end.data * 100, end.data * 100)
						

            // Draw the weight (if present)
            if (weight !== null) {
              const midX = (start.data * 100 + end.data * 100) / 2;
              const midY = (start.data * 100 + end.data * 100) / 2;
              p.noStroke();
              p.fill(50);
              p.textSize(14);
              p.text(weight.toString(), midX, midY);
            }
          });
        });

        // Draw vertices
        graph.vertices.forEach((v, index) => {
          const x = v.data * 100;
          const y = v.data * 100;

          p.fill(200, 100, 100);
          p.noStroke();
          p.ellipse(x, y, 40, 40);

          p.fill(255);
          p.textSize(16);
          p.text(index + 1, x, y); // Label the vertex
        });
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
