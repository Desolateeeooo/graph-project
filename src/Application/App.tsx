import React from 'react';
import './App.css';
import AnimationComponentContainer from '../Features/AnimationComponent/AnimationComponentContainer';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <Navigation></Navigation>
				<InteractiveMenu></InteractiveMenu>
				<Footer></Footer> */}

				<AnimationComponentContainer />
      </header>
    </div>
  );
}

export default App;
