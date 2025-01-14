/* eslint-disable @typescript-eslint/no-redeclare */
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { IAddVertex, IToggleDFS, IAddEdge } from '../../Shared/Types/animationComponentSlice_types';
import { IGraph, IVertex } from "../../Shared/Types/animationComponentSlice_types";
import { createVertex } from "../../Shared/helper_funcs/createVertex";
import { addEdge } from "../../Shared/helper_funcs/addEdge";

const vertexOne: IVertex = createVertex(1, [], 200, 150);
const vertexTwo: IVertex = createVertex(2, [], 500, 100);
const vertexThree: IVertex = createVertex(3, [], 700, 150);
const vertexFour: IVertex = createVertex(4, [], 700, 350);
const vertexFive: IVertex = createVertex(5, [], 450, 350);
const vertexSix: IVertex = createVertex(6, [], 150, 450);
const vertexSeven: IVertex = createVertex(7, [], 200, 650);


const initialState: IGraph = {
	isDirected: false,
	isWeighted: true,
	vertices: [
		vertexOne, vertexTwo, vertexThree, 
		vertexFour, vertexFive, vertexSix, vertexSeven
	],
	dfs: false
}

// Edge from v1 to v2 with weight 500
const edge1To2 = addEdge(false, vertexOne, vertexTwo, 500);
vertexOne.edges.push(edge1To2[0]);
vertexTwo.edges.push(edge1To2[1]);

// Edge from v1 to v6 with weight 600
const edge1To6 = addEdge(false, vertexOne, vertexSix, 600);
vertexOne.edges.push(edge1To6[0]);
vertexSix.edges.push(edge1To6[1]);

// Edge from v1 to v5 with weight 50
const edge1To5 = addEdge(false, vertexOne, vertexFive, 50);
vertexOne.edges.push(edge1To5[0]);
vertexFive.edges.push(edge1To5[1]);

// Edge from v2 to v6 with weight 100
const edge2To6 = addEdge(false, vertexTwo, vertexSix, 100);
vertexTwo.edges.push(edge2To6[0]);
vertexSix.edges.push(edge2To6[1]);

// Edge from v2 to v5 with weight 400
const edge2To5 = addEdge(false, vertexTwo, vertexFive, 400);
vertexTwo.edges.push(edge2To5[0]);
vertexFive.edges.push(edge2To5[1]);
	
// Edge from v2 to v3 with weight 300
const edge2To3 = addEdge(false, vertexTwo, vertexThree, 300);
vertexTwo.edges.push(edge2To3[0]);
vertexThree.edges.push(edge2To3[1]);

// Edge from v3 to v5 with weight 550
const edge3To5 = addEdge(false, vertexThree, vertexFive, 550);
vertexThree.edges.push(edge3To5[0]);
vertexFive.edges.push(edge3To5[1]);

// Edge from v3 to v4 with weight 200
const edge3To4 = addEdge(false, vertexThree, vertexFour, 200);
vertexThree.edges.push(edge3To4[0]);
vertexFour.edges.push(edge3To4[1]);

// Edge from v4 to v5 with weight 450
const edge4To5 = addEdge(false, vertexFour, vertexFive, 450);
vertexFour.edges.push(edge4To5[0]);
vertexFive.edges.push(edge4To5[1]);

// Edge from v5 to v7 with weight 500
const edge5To7 = addEdge(false, vertexFive, vertexSeven, 500);
vertexFive.edges.push(edge5To7[0]);
vertexSeven.edges.push(edge5To7[1]);

// Edge from v6 to v7 with weight 700
const edge6To7 = addEdge(false, vertexSix, vertexSeven, 700);
vertexSix.edges.push(edge6To7[0]);
vertexSeven.edges.push(edge6To7[1]);


const animationComponentSlice = createSlice({
  name: "animationComponent",
  initialState: initialState,
  reducers: {
    addVertex: (state, action: PayloadAction<IAddVertex>) => {
			const newVertex = {
				data: action.payload.data,
				edges: [],
				x: Math.floor(Math.random() * (800 - 400) + 400),
				y: Math.floor(Math.random() * (800 - 400) + 400),
			}

			state.vertices.push(newVertex);
    },

		toggleDFS: (state) => {
			return {
				...state,
				dfs:  state.dfs ? false : true
			}
		},

		addEdgeReducer: (state, action: PayloadAction<IAddEdge>) => {
			const vertexIndexFrom = state.vertices.findIndex((vertex: IVertex) => vertex.data === action.payload.from);
			const vertexIndexTo = state.vertices.findIndex((vertex: IVertex) => vertex.data === action.payload.to);
			const weight = Math.floor(Math.random() * 1000);

			const vertexFrom = state.vertices[vertexIndexFrom];
			const vertexTo = state.vertices[vertexIndexTo];

			if (vertexFrom && vertexTo) {
				const edge = addEdge(false, vertexFrom , vertexTo, weight);
				state.vertices[vertexIndexFrom].edges.push(edge[0]);
				state.vertices[vertexIndexTo].edges.push(edge[1]);
			}
		},
  },
});

export const {
	addVertex,
	toggleDFS,
	addEdgeReducer,
} = animationComponentSlice.actions;

export default animationComponentSlice.reducer;