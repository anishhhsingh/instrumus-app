import { useState } from 'react';
import Navbar from './Navbar';
import Home from './Home';
import Explore from './Explore';
import Planets from './Planets';

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
