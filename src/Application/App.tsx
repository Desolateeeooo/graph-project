import React from 'react';
import './App.css';
import AnimationComponentContainer from '../Features/AnimationComponent/AnimationComponentContainer';
import InteractiveMenuContainer from '../Features/InteractiveMenu/InteractiveMenuContainer';
import { useSelector } from 'react-redux';
import { AppRootState } from '../Shared/Store/store';
import { IGraph } from '../Shared/Types/animationComponentSlice_types';
import GraphMatrices from '../Features/GraphMatrices/GraphMatrices';

function App() {
	const graph = useSelector<AppRootState, IGraph>((state) => state.animationComponentSlice);

	return (
		<div className="App">
			<header className="App-header">
				{/* <Navigation></Navigation>
				<Footer></Footer> */}
				<div className="mainMenu">
					<InteractiveMenuContainer
						graph={graph}
					/>
					<div className="canvas">
					<AnimationComponentContainer
						graph={graph}
					/>
					</div>
				</div>
				<div className="matrices">
					<GraphMatrices graph={graph} />
				</div>
			</header>
		</div>
	);
}

export default App;
