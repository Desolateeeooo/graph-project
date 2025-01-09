import React, { SetStateAction, useState } from 'react';
import ReactDOM from 'react-dom/client';
import {useSelector} from 'react-redux';
import AnimationComponentPresentational from './AnimationComponentPresentational';
import { AppRootState } from '../../Shared/Store/store';
import { IGraph, IVertex } from '../../Shared/Types/animationComponentSlice_types';
import depthFirstTraversal from '../../Shared/helper_funcs/dfs';

const AnimationComponentContainer = () => {
	const graph = useSelector<AppRootState, IGraph>((state) => state.animationComponentSlice);

	return (
		<AnimationComponentPresentational 
			graph={graph}
		/>
	);
}

export default AnimationComponentContainer;