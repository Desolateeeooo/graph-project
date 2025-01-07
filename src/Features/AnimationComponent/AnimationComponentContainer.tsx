import React from 'react';
import ReactDOM from 'react-dom/client';
import {useDispatch, useSelector} from 'react-redux';
import AnimationComponentPresentational from './AnimationComponentPresentational';
import { convertGraphToFormattedData } from '../helperFunctions/need to fix/convertGraphToFormattedData';
import { AppRootState } from '../../Shared/Store/store';
import { IGraph } from './animationComponentSlice_types';
import animationComponentSlice from './animationComponentSlice';

const AnimationComponentContainer = () => {
	const graph = useSelector<AppRootState, IGraph>((state) => state.animationComponentSlice);

	return (
		<AnimationComponentPresentational 
			
		/>
	);
}

export default AnimationComponentContainer;