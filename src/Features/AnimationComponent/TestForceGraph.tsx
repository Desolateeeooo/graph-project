import React, { useRef, useEffect } from "react";
import { ForceGraph } from "../helperFunctions/forceGraph";
import { IFormattedData } from "../helperFunctions/convertGraphToFormattedData";

interface ITestForceGraphProps {
	graphData: IFormattedData;
}

const TestForceGraph = (props: ITestForceGraphProps) => {
	const {graphData} = props;

  const graphRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (graphRef.current && graphData) {
      const svg = ForceGraph(graphData, {
        nodeId: d => d.id,
        nodeTitle: d => d.name,
        nodeStrength: n => n.id.includes("parent") ? -5 : -20,
        linkStrokeWidth: l => l.value || 1,
        width: 800,
        height: 600,
      });

      graphRef.current.appendChild(svg);
    }
  }, [graphData]);

  return <div ref={graphRef}></div>;
};

export default TestForceGraph;