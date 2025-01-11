import React, { useCallback } from 'react';
import ReactDOM from 'react-dom/client';
import InteractiveMenuPresentational from './InteractiveMenuPresentational';
import { useDispatch } from 'react-redux';
import { IGraph } from '../../Shared/Types/animationComponentSlice_types';
import { toggleDFS } from '../AnimationComponent/animationComponentSlice';

interface IInteractiveMenuContainer {
	graph: IGraph;
}

const InteractiveMenuContainer = (props: IInteractiveMenuContainer) => {
	const dispatch = useDispatch();

	const handleOnToggleDFS = useCallback(() => {
		dispatch(toggleDFS());
	}, [dispatch]);

	return (
	<InteractiveMenuPresentational 
		toggleDFS={handleOnToggleDFS}
	/>
	);
}

export default InteractiveMenuContainer;