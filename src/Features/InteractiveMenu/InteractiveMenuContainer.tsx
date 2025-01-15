import React, { ChangeEvent, useCallback, useState } from 'react';
import InteractiveMenuPresentational from './InteractiveMenuPresentational';
import { useDispatch } from 'react-redux';
import { IGraph } from '../../Shared/Types/animationComponentSlice_types';
import { addVertex, toggleDFS, addEdgeReducer, removeEdge, removeVertex } from '../AnimationComponent/animationComponentSlice';

interface IInteractiveMenuContainer {
	graph: IGraph;
}

const InteractiveMenuContainer = (props: IInteractiveMenuContainer) => {
	const dispatch = useDispatch();
	const [vertexData, setVertexData] = useState('');
	const [vertexToRemoveData, setVertexToRemoveData] = useState('');
	const [addEdgeTo, setAddEdgeTo] = useState('');
	const [addEdgeFrom, setAddEdgeFrom] = useState('');
	const [removeEdgeTo, setRemoveEdgeTo] = useState('');
	const [removeEdgeFrom, setRemoveEdgeFrom] = useState('');


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

	const handleOnChangeRemoveVertexData = (e: ChangeEvent<HTMLInputElement>) => {
		if (reg.test(e.currentTarget.value)) {
			if (vertexData.length < 2) {
				setVertexToRemoveData(e.currentTarget.value);
			}
		} else {
			setVertexToRemoveData('');
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

	const addEdgeHandler = useCallback((from: string, to: string) => {
		dispatch(addEdgeReducer({ from: parseInt(from), to: parseInt(to) }));
	}, [dispatch]);

	const handleOnAddEdgeClick = () => {
		addEdgeHandler(addEdgeFrom, addEdgeTo);
		setAddEdgeFrom('');
		setAddEdgeTo('');
	}

	const handleOnToggleDFS = useCallback(() => {
		dispatch(toggleDFS());
	}, [dispatch]);


	const addVertexHandler = useCallback((vertexData: number) => {
		dispatch(addVertex({ data: vertexData }))
	}, [dispatch])

	const handleOnAddVertexClick = () => {
		addVertexHandler(parseInt(vertexData));
		setVertexData('');
	}

	const removeVertexHandler = useCallback((vertexData: number) => {
		dispatch(removeVertex({ data: vertexData }))
	}, [dispatch])

	const handleOnRemoveVertexClick = () => {
		removeVertexHandler(parseInt(vertexToRemoveData));
		setVertexToRemoveData('');
	}
	
	const handleOnChangeRemoveEdgeFrom = (e: ChangeEvent<HTMLInputElement>) => {
		if (reg.test(e.currentTarget.value)) {
			if (removeEdgeFrom.length < 2) {
				setRemoveEdgeFrom(e.currentTarget.value);
			}
		} else {
			setRemoveEdgeFrom('');
		}
	};

	const handleOnChangeRemoveEdgeTo = (e: ChangeEvent<HTMLInputElement>) => {
		if (reg.test(e.currentTarget.value)) {
			if (removeEdgeTo.length < 2) {
				setRemoveEdgeTo(e.currentTarget.value);
			}
		} else {
			setRemoveEdgeTo('');
		}
	};


	const removeEdgeHandler = useCallback((from: string, to: string) => {
		dispatch(removeEdge({ from: parseInt(from), to: parseInt(to) }));
	}, [dispatch]);

	const handleOnRemoveEdgeClick = () => {
		removeEdgeHandler(removeEdgeFrom, removeEdgeTo);
		setRemoveEdgeFrom('');
		setRemoveEdgeTo('');
	}

	return (
		<InteractiveMenuPresentational
			toggleDFS={handleOnToggleDFS}
			updateVertexData={handleOnChangeVertexData}
			updateVertexToRemoveData={handleOnChangeRemoveVertexData}
			vertexData={vertexData}
			vertexToRemoveData={vertexToRemoveData}
			handleAddVertex={handleOnAddVertexClick}
			handleRemoveVertex={handleOnRemoveVertexClick}
			handleOnChangeAddEdgeFrom={handleOnChangeAddEdgeFrom}
			handleOnChangeAddEdgeTo={handleOnChangeAddEdgeTo}
			handleOnChangeRemoveEdgeFrom={handleOnChangeRemoveEdgeFrom}
			handleOnChangeRemoveEdgeTo={handleOnChangeRemoveEdgeTo}
			addEdgeToValue={addEdgeTo}
			addEdgeFromValue={addEdgeFrom}
			removeEdgeFromValue={removeEdgeFrom}
			removeEdgeToValue={removeEdgeTo}
			handleAddEdge={handleOnAddEdgeClick}
			handleRemoveEdge={handleOnRemoveEdgeClick}
		/>
	);
}

export default InteractiveMenuContainer;