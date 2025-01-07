import React, { useRef, useEffect } from "react";
import { ForceGraph } from "../helperFunctions/forceGraph";
import { IFormattedData } from "../helperFunctions/convertGraphToFormattedData";

interface ITestGraphProps {
	graphData: IFormattedData;
}

const TestGraph = (props: ITestGraphProps) => {
	const {graphData} = props;

  const graphRef = useRef<HTMLInputElement>(null);

	const formattedData = {
    nodes: [
      { id: "parent", group: 1, name: "priority1" },
      { id: "child1", group: 1, name: "abc" },
      { id: "child2", group: 1, name: "cde" },
    ],
    links: [
      { source: "parent", target: "child1", value: 1, label: "value: 12" },
      { source: "parent", target: "child2", value: 1, label: "value: 25" },
    ],
  };

  useEffect(() => {
    if (graphRef.current) {
      const svg = ForceGraph(
        {
          nodes: formattedData.nodes,
          links: formattedData.links,
        },
        {
          nodeId: (d) => d.id,
          nodeTitle: (d) => `${d.name}`,
          nodeStrength: (n) => (n.id.includes("parent") ? -5 : -20),
          linkStrokeWidth: (l) =>
            l.source.includes("parent") || l.target.includes("parent") ? 1 : 1.5,
          linkStroke: (l) =>
            l.source.includes("parent") || l.target.includes("parent")
              ? "#eee"
              : "#ccc",
          width: 4800,
          height: 4800,
        }
      );
      graphRef.current.appendChild(svg);
    }
  }, [formattedData]);

  return <div ref={graphRef}></div>;
};

export default TestGraph;