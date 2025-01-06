import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import Graph from "../../Entities/Graph/graph.ts"

const initialState = new Graph(false, true);
	
initialState.addVertex(1);
initialState.addVertex(2);
initialState.addVertex(3);
initialState.addVertex(4);
initialState.addVertex(5);
initialState.addVertex(6);
initialState.addVertex(7);

const vertexOne = initialState.getVertexByValue(1);
const vertexTwo = initialState.getVertexByValue(2);
const vertexThree = initialState.getVertexByValue(3);
const vertexFour = initialState.getVertexByValue(4);
const vertexFive = initialState.getVertexByValue(5);
const vertexSix = initialState.getVertexByValue(6);
const vertexSeven = initialState.getVertexByValue(7);

	
// VerteOne's Edges
initialState.addEdge(vertexOne, vertexTwo, 500);
initialState.addEdge(vertexOne, vertexSix, 600);
initialState.addEdge(vertexOne, vertexFive, 50);

// VertexTwo's Edge
initialState.addEdge(vertexTwo, vertexSix, 100)
initialState.addEdge(vertexTwo, vertexFive, 400)
initialState.addEdge(vertexTwo, vertexThree, 300);
	
// VertexThree's Edges
initialState.addEdge(vertexThree, vertexFive, 550);
initialState.addEdge(vertexThree, vertexFour, 200);

// VertexFour's Edges
initialState.addEdge(vertexFour, vertexFive, 450);
	
// VertexFive's Edges
initialState.addEdge(vertexFive, vertexSeven, 500);
	
// VertexSix's Edges
initialState.addEdge(vertexSix, vertexSeven, 700);


const animationComponentSLice = createSlice({
	name: "animationComponent",
	initialState: initialState,
	reducers: {

	}
})

export default animationComponentSLice.reducer;