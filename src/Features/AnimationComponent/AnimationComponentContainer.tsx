import React from 'react';
import ReactDOM from 'react-dom/client';
import {useDispatch, useSelector} from 'react-redux';
import AnimationComponentPresentational from './AnimationComponentPresentational';
import { convertGraphToFormattedData } from '../helperFunctions/convertGraphToFormattedData';
import { AppRootState } from '../../Shared/Store/store';
import { IGraph } from './animationComponentSlice_types';
import animationComponentSlice from './animationComponentSlice';

const AnimationComponentContainer = () => {
	const graph = useSelector<AppRootState, IGraph>((state) => state.animationComponentSlice);
	const convertedGraph = convertGraphToFormattedData(graph);

	return (
		<AnimationComponentPresentational 
			graphData={convertedGraph}
		/>
	);
}

export default AnimationComponentContainer;