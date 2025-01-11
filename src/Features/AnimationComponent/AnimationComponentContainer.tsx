import React from 'react';
import ReactDOM from 'react-dom/client';
import AnimationComponentPresentational from './AnimationComponentPresentational';
import { IGraph } from '../../Shared/Types/animationComponentSlice_types';

interface IAnimationComponentContainerProps {
	graph: IGraph;
}

const AnimationComponentContainer = (props: IAnimationComponentContainerProps) => {
	const {graph} = props;

	return (
		<AnimationComponentPresentational 
			graph={graph}
		/>
	);
}

export default AnimationComponentContainer;