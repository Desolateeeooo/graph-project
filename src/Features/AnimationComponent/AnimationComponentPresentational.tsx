import React from 'react';
import ReactDOM from 'react-dom/client';
import P5Sketch from '../../Entities/P5Sketch/P5Sketch';
import { IGraph } from '../../Shared/Types/animationComponentSlice_types';

interface IAnimationComponentPresentationalProps {
	graph: IGraph;
}

const AnimationComponentPresentational = (props: IAnimationComponentPresentationalProps) => {
	return (
		<P5Sketch 
			graph={props.graph}
		/>
	);
}

export default AnimationComponentPresentational;