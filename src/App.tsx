import React from 'react';

import { HeroesList } from './components/HeroesList';

function App() {
  return (
    <div className="App" data-testid="app-component">
      <HeroesList/>
    </div>
  );
}

export default App;
