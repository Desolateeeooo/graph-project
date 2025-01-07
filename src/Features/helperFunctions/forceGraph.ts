import * as d3 from "d3";

interface Node extends d3.SimulationNodeDatum {
	id: string;
	[key: string]: any; // To accommodate any additional properties
}

interface Link extends d3.SimulationLinkDatum<Node> {
	source: string | Node;
	target: string | Node;
	[key: string]: any; // To accommodate any additional properties
}

interface ForceGraphOptions {
	nodeId?: (d: Node) => string;
	nodeTitle?: (d: Node, i: number) => string;
	nodeFill?: string;
	nodeStroke?: string;
	nodeStrokeWidth?: number;
	nodeStrokeOpacity?: number;
	nodeRadius?: number;
	nodeStrength?: (n: any) => number;
	linkSource?: (d: Link) => string | Node;
	linkTarget?: (d: Link) => string | Node;
	linkStroke?: string | ((d: Link) => string);
	linkStrokeOpacity?: number;
	linkStrokeWidth?: number | ((d: Link) => number);
	linkStrokeLinecap?: string;
	linkStrength?: number;
	colors?: readonly string[];
	width?: number;
	height?: number;
	invalidation?: Promise<void>;
}

function ForceGraph(
	{ nodes, links }: { nodes: Node[]; links: Link[] },
	{
		nodeId = (d: Node) => d.id,
		nodeTitle,
		nodeFill = "currentColor",
		nodeStroke = "#fff",
		nodeStrokeWidth = 1.5,
		nodeStrokeOpacity = 1,
		nodeRadius = 50,
		nodeStrength,
		linkSource = (d: Link) => d.source,
		linkTarget = (d: Link) => d.target,
		linkStroke = "#999",
		linkStrokeOpacity = 0.6,
		linkStrokeWidth = 4,
		linkStrokeLinecap = "round",
		linkStrength,
		colors = d3.schemeTableau10,
		width = 1640,
		height = 1400,
		invalidation,
	}: ForceGraphOptions = {}
): SVGSVGElement & { scales: { color: null } } {
	const N = d3.map(nodes, nodeId).map(intern);
	const LS = d3.map(links, linkSource).map(intern);
	const LT = d3.map(links, linkTarget).map(intern);
	if (nodeTitle === undefined) nodeTitle = (_, i) => N[i];
	const T = nodeTitle == null ? null : d3.map(nodes, nodeTitle);
	const W = typeof linkStrokeWidth !== "function" ? null : d3.map(links, linkStrokeWidth);
	const L = typeof linkStroke !== "function" ? null : d3.map(links, linkStroke);

	nodes = d3.map(nodes, (_, i) => ({ id: N[i] }));
	links = d3.map(links, (_, i) => ({ source: LS[i], target: LT[i] }));

	const color = null;

	const forceNode = d3.forceManyBody();
	const forceLink = d3.forceLink(links).id((_, i) => N[i]);
	if (nodeStrength !== undefined) forceNode.strength(nodeStrength);
	if (linkStrength !== undefined) forceLink.strength(linkStrength);
	 
	const simulation = d3.forceSimulation<Node>(nodes)
  .force("link", forceLink)
  .force("charge", forceNode)
  .force("center", d3.forceCenter())
  .on("tick", ticked);

	const svg = d3
		.create("svg")
		.attr("width", width)
		.attr("height", height)
		.attr("viewBox", [-width / 2, -height / 2, width, height])
		.attr("style", "max-width: 100%; height: auto; height: intrinsic;");

	const link = svg
		.append("g")
		.attr("stroke", typeof linkStroke !== "function" ? linkStroke : null)
		.attr("stroke-opacity", linkStrokeOpacity)
		.attr("stroke-width", typeof linkStrokeWidth !== "function" ? linkStrokeWidth : null)
		.attr("stroke-linecap", linkStrokeLinecap)
		.selectAll("line")
		.data(links)
		.join("line");

	const node = svg
		.append("g")
		.attr("fill", nodeFill)
		.attr("stroke", nodeStroke)
		.attr("stroke-opacity", nodeStrokeOpacity)
		.attr("stroke-width", nodeStrokeWidth)
		.selectAll("circle")
		.data(nodes)
		.join("circle")
		.attr("r", nodeRadius)
		// @ts-ignore
		.call(drag(simulation));
		
	// @ts-ignore	
	if (W) link.attr("stroke-width", ({ index: i }) => W[i]);
	// @ts-ignore
	if (L) link.attr("stroke", ({ index: i }) => L[i]);
	// @ts-ignore
	if (T) node.append("title").text(({ index: i }) => T[i]);
	if (invalidation != null) invalidation.then(() => simulation.stop());

	function intern(value: any): any {
		return value !== null && typeof value === "object" ? value.valueOf() : value;
	}

	function ticked(): void {
		link
			.attr("x1", (d: any) => d.source.x)
			.attr("y1", (d: any) => d.source.y)
			.attr("x2", (d: any) => d.target.x)
			.attr("y2", (d: any) => d.target.y);

		node.attr("cx", (d: any) => d.x).attr("cy", (d: any) => d.y);
	}

	function drag(simulation: d3.Simulation<any, any>): d3.DragBehavior<SVGCircleElement, Node, Node | d3.SubjectPosition> {
		function dragstarted(event: d3.D3DragEvent<SVGCircleElement, Node, Node>): void {
			if (!event.active) simulation.alphaTarget(0.3).restart();
			event.subject.fx = event.subject.x;
			event.subject.fy = event.subject.y;
		}

		function dragged(event: d3.D3DragEvent<SVGCircleElement, Node, Node>): void {
			event.subject.fx = event.x;
			event.subject.fy = event.y;
		}

		function dragended(event: d3.D3DragEvent<SVGCircleElement, Node, Node>): void {
			if (!event.active) simulation.alphaTarget(0);
			event.subject.fx = null;
			event.subject.fy = null;
		}

		return d3.drag<SVGCircleElement, Node>()
			.subject((event) => {
				const node = event.subject;
				if (typeof node === "object" && "id" in node) {
					return event.subject as Node;
				}
				throw new Error("Drag subject is not a valid Node");
			})
			.on("start", dragstarted)
			.on("drag", dragged)
			.on("end", dragended);
	}

	return Object.assign(svg.node() as SVGSVGElement, { scales: { color } });
}

export { ForceGraph };
