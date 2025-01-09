import React from 'react';
import './App.css';
import AnimationComponentContainer from '../Features/AnimationComponent/AnimationComponentContainer';
import InteractiveMenuContainer from '../Features/InteractiveMenu/InteractiveMenuContainer';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <Navigation></Navigation>
				<Footer></Footer> */}
				<InteractiveMenuContainer />
				<AnimationComponentContainer />
      </header>
    </div>
  );
}

export default App;
