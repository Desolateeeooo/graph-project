import React, { ChangeEvent, MouseEventHandler, useCallback, useState } from 'react';
import ReactDOM from 'react-dom/client';
import InteractiveMenuPresentational from './InteractiveMenuPresentational';
import { useDispatch } from 'react-redux';
import { IGraph } from '../../Shared/Types/animationComponentSlice_types';
import { addVertex, toggleDFS } from '../AnimationComponent/animationComponentSlice';

interface IInteractiveMenuContainer {
	graph: IGraph;
}

const InteractiveMenuContainer = (props: IInteractiveMenuContainer) => {
	const dispatch = useDispatch();
	const [vertexData, setVertexData] = useState('');
	
	const reg = new RegExp('^[0-9]+$');

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
			if (reg.test(e.currentTarget.value)) {
				if (vertexData.length < 1) {
					setVertexData(e.currentTarget.value);
				}
			} else {
				setVertexData('');
			}
    };

	const handleOnToggleDFS = useCallback(() => {
		dispatch(toggleDFS());
	}, [dispatch]);


	const addVertexHandler = useCallback((vertexData: number) => {
		dispatch(addVertex({data: vertexData}))
	}, [dispatch])

	const handleOnClick = () => {
		addVertexHandler(parseInt(vertexData));
		setVertexData('');
	}

	return (
	<InteractiveMenuPresentational 
		toggleDFS={handleOnToggleDFS}
		updateVertexData={handleOnChange}
		vertexData={vertexData}
		handleAddVertex={handleOnClick}
	/>
	);
}

export default InteractiveMenuContainer;