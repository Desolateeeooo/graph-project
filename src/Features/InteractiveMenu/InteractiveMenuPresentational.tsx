import React, { ChangeEvent } from 'react';
interface IContainer {
	display: "flex";
	flexDirection: "column";
	alignItems: string;
	gap: string;
	padding: string;
	fontFamily: string;
}

interface IButton {
	padding: string;
	fontSize: string;
	backgroundColor: string;
	color: string;
	border: string;
	borderRadius: string;
	cursor: string;
}

interface IFormContainer {
	display: "flex";
	flexDirection: "column";
	alignItems: string;
	gap: string;
	width: string;
	maxWidth: string;
}

interface IInput {
	width: string;
	padding: string;
	fontSize: string;
	border: string;
	borderRadius: string;
	boxSizing: "border-box",
}
interface IStyles {
	container: IContainer;
	button: IButton;
	formContainer: IFormContainer;
	input: IInput;
}

const styles: IStyles = {
	container: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		gap: "5px",
		padding: "10px",
		fontFamily: "Arial, sans-serif",
	},
	button: {
		padding: "10px 20px",
		fontSize: "16px",
		backgroundColor: "#007BFF",
		color: "white",
		border: "none",
		borderRadius: "5px",
		cursor: "pointer",
	},
	formContainer: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		gap: "5px",
		width: "100%",
		maxWidth: "300px",
	},
	input: {
		width: "100%",
		padding: "10px",
		fontSize: "14px",
		border: "1px solid #ccc",
		borderRadius: "5px",
		boxSizing: "border-box",
	},
};

interface IInteractiveMenuPresentational {
	toggleDFS: () => void;
	updateVertexData: (e: ChangeEvent<HTMLInputElement>) => void;
	updateVertexToRemoveData: (e: ChangeEvent<HTMLInputElement>) => void;
	vertexData: string;
	vertexToRemoveData: string;
	handleAddVertex: () => void;
	handleRemoveVertex: () => void;
	handleOnChangeAddEdgeFrom: (e: ChangeEvent<HTMLInputElement>) => void;
	handleOnChangeAddEdgeTo: (e: ChangeEvent<HTMLInputElement>) => void;
	handleOnChangeRemoveEdgeFrom: (e: ChangeEvent<HTMLInputElement>) => void;
	handleOnChangeRemoveEdgeTo: (e: ChangeEvent<HTMLInputElement>) => void;
	addEdgeToValue: string;
	addEdgeFromValue: string;
	removeEdgeFromValue: string;
	removeEdgeToValue: string;
	handleAddEdge: () => void;
	handleRemoveEdge: () => void;
}

const InteractiveMenuPresentational = (props: IInteractiveMenuPresentational) => {
	return (
		<div style={styles.container}>

			<button style={{ ...styles.button, backgroundColor: "#FF007F" }} onClick={props.toggleDFS}>Toggle Recursive Search</button>

			<div style={styles.formContainer}>
				<h4>Add Vertex</h4>
				<input type="text" placeholder="Enter vertex" style={styles.input} onChange={props.updateVertexData} value={props.vertexData} />
				<button style={styles.button} onClick={props.handleAddVertex}>Add Vertex</button>

				<h4>Remove Vertex</h4>
				<input type="text" placeholder="Enter vertex" style={styles.input} onChange={props.updateVertexToRemoveData} value={props.vertexToRemoveData}/>
				<button style={styles.button} onClick={props.handleRemoveVertex}>Remove Vertex</button>
			</div>

			<div style={styles.formContainer}>
				<h4>Add Edge</h4>
				<input
					type="text"
					placeholder="From"
					style={styles.input}
					onChange={props.handleOnChangeAddEdgeFrom}
					value={props.addEdgeFromValue}
				/>
				<input
					type="text"
					placeholder="To"
					style={styles.input}
					onChange={props.handleOnChangeAddEdgeTo}
					value={props.addEdgeToValue}
				/>
				<button style={styles.button} onClick={props.handleAddEdge}>Add Edge</button>
			</div>

			<div style={styles.formContainer}>
				<h4>Remove Edge</h4>
				<input
					type="text"
					placeholder="From"
					style={styles.input}
					onChange={props.handleOnChangeRemoveEdgeFrom}
					value={props.removeEdgeFromValue}
				/>
				<input
					type="text"
					placeholder="To"
					style={styles.input}
					onChange={props.handleOnChangeRemoveEdgeTo}
					value={props.removeEdgeToValue}
				/>
				<button style={styles.button} onClick={props.handleRemoveEdge}>Remove Edge</button>
			</div>
		</div>
	);
}

export default InteractiveMenuPresentational;