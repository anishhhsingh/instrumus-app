import { useState } from 'react';
import Navbar from 'https://github.com/anishhhsingh/instrumus-app/blob/main/src/Navbar.jsx';
import Home from 'https://github.com/anishhhsingh/instrumus-app/blob/main/src/Home.jsx';
import Explore from 'https://github.com/anishhhsingh/instrumus-app/blob/main/src/Explore.jsx';
import Planets from 'https://github.com/anishhhsingh/instrumus-app/blob/main/src/Planets.jsx';

const App = () => {
  const [activeComponent, setActiveComponent] = useState('home');

  let content;
  if (activeComponent === 'explore') {
    content = <Explore />;
  } else if (activeComponent === 'planets') {
    content = <Planets />;
  } else {
    content = <Home />;
  }

  return (
    <div>
      <Navbar setActiveComponent={setActiveComponent} />
      <div className="container mx-auto p-4">{content}</div>
    </div>
  );
};

export default App;
