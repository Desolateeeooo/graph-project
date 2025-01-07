import React from 'react';
import ReactDOM from 'react-dom/client';
import { IFormattedData } from '../helperFunctions/convertGraphToFormattedData';
import TestForceGraph from './TestForceGraph';
import TestGraph from './TestGraph';

interface IAnimationComponentPresentationalProps {
	graphData: IFormattedData;
}

const AnimationComponentPresentational = (props: IAnimationComponentPresentationalProps) => {
	return (
		<TestForceGraph 
			graphData={props.graphData}
		/>
	);
}

export default AnimationComponentPresentational;