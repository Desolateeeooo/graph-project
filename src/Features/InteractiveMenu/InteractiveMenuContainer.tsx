import React, { ChangeEvent, MouseEventHandler, useCallback, useState } from 'react';
import ReactDOM from 'react-dom/client';
import InteractiveMenuPresentational from './InteractiveMenuPresentational';
import { useDispatch } from 'react-redux';
import { IGraph } from '../../Shared/Types/animationComponentSlice_types';
import { addVertex, toggleDFS, addEdgeReducer } from '../AnimationComponent/animationComponentSlice';

interface IInteractiveMenuContainer {
	graph: IGraph;
}

const InteractiveMenuContainer = (props: IInteractiveMenuContainer) => {
	const dispatch = useDispatch();
	const [vertexData, setVertexData] = useState('');
	const [addEdgeTo, setAddEdgeTo] = useState('');
	const [addEdgeFrom, setAddEdgeFrom] = useState('');
	
	const reg = new RegExp('^[0-9]+$');

    const handleOnChangeVertexData = (e: ChangeEvent<HTMLInputElement>) => {
			if (reg.test(e.currentTarget.value)) {
				if (vertexData.length < 2) {
					setVertexData(e.currentTarget.value);
				}
			} else {
				setVertexData('');
			}
    };

		const handleOnChangeAddEdgeTo = (e: ChangeEvent<HTMLInputElement>) => {
			if (reg.test(e.currentTarget.value)) {
				if (addEdgeTo.length < 2) {
					setAddEdgeTo(e.currentTarget.value);
				}
			} else {
				setAddEdgeTo('');
			}
    };

		const handleOnChangeAddEdgeFrom = (e: ChangeEvent<HTMLInputElement>) => {
			if (reg.test(e.currentTarget.value)) {
				if (addEdgeFrom.length < 2) {
					setAddEdgeFrom(e.currentTarget.value);
				}
			} else {
				setAddEdgeFrom('');
			}
    };

	const handleOnToggleDFS = useCallback(() => {
		dispatch(toggleDFS());
	}, [dispatch]);


	const addVertexHandler = useCallback((vertexData: number) => {
		dispatch(addVertex({data: vertexData}))
	}, [dispatch])

	const handleOnAddVertexClick = () => {
		addVertexHandler(parseInt(vertexData));
		setVertexData('');
	}

	const addEdgeHandler = useCallback((from: string, to: string) => {
		dispatch(addEdgeReducer({from: parseInt(from), to: parseInt(to)}));
	}, [dispatch]) 

	const handleOnAddEdgeClick = () => {
		addEdgeHandler(addEdgeFrom, addEdgeTo);
		setAddEdgeFrom('');
		setAddEdgeTo('');

	}

	return (
	<InteractiveMenuPresentational 
		toggleDFS={handleOnToggleDFS}
		updateVertexData={handleOnChangeVertexData}
		vertexData={vertexData}
		handleAddVertex={handleOnAddVertexClick}
		handleOnChangeAddEdgeTo={handleOnChangeAddEdgeTo}
		addEdgeToValue={addEdgeTo}
		handleOnChangeAddEdgeFrom={handleOnChangeAddEdgeFrom}
		addEdgeFromValue={addEdgeFrom}
		handleAddEdge={handleOnAddEdgeClick}
	/>
	);
}

export default InteractiveMenuContainer;