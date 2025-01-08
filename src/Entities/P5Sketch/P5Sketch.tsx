import Graph from './Graph/Graph';
import { IGraph } from '../../Shared/Types/animationComponentSlice_types';

interface IP5SketchProps {
	graph: IGraph;
}

const P5Sketch = (props: IP5SketchProps) => {
  return (
		<Graph 
			graph={props.graph}
		/>
	);
};

export default P5Sketch;
