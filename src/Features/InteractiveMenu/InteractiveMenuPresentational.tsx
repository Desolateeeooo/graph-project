import React, {ChangeEvent, MouseEventHandler} from 'react';
import ReactDOM from 'react-dom/client';
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
  },
};

interface IInteractiveMenuPresentational {
	toggleDFS: () => void;
	updateVertexData: (e: ChangeEvent<HTMLInputElement>) => void;
	vertexData: string;
	handleAddVertex: () => void;
} 

const InteractiveMenuPresentational = (props: IInteractiveMenuPresentational) => {
	return (
    <div style={styles.container}>
			
			<button style={{...styles.button, backgroundColor: "#FF007F"}} onClick={props.toggleDFS}>Toggle Recursive Search</button>

      <div style={styles.formContainer}>
        <h4>Add Vertex</h4>
        <input type="text" placeholder="Enter vertex" style={styles.input} onChange={props.updateVertexData} value={props.vertexData}/>
        <button style={styles.button} onClick={props.handleAddVertex}>Add Vertex</button>
      </div>

      <div style={styles.formContainer}>
        <h4>Add Edge</h4>
        <input type="text" placeholder="From" style={styles.input} />
        <input type="text" placeholder="To" style={styles.input} />
        <button style={styles.button}>Add Edge</button>
      </div>

      <div style={styles.formContainer}>
        <h4>Remove Edge</h4>
        <input type="text" placeholder="From" style={styles.input} />
        <input type="text" placeholder="To" style={styles.input} />
        <button style={styles.button}>Remove Edge</button>
      </div>
    </div>
  );
}

export default InteractiveMenuPresentational;