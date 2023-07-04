import PropTypes from 'prop-types';

const Navbar = ({ setActiveComponent }) => {
    return (
      <nav className="flex items-center justify-between bg-gray-900 text-white p-4">
        <h1 className="text-xl">SWAPI</h1>
        <ul className="flex space-x-4">
          <li className="cursor-pointer hover:text-gray-500" onClick={() => setActiveComponent('home')}>
            Home
          </li>
          <li className="cursor-pointer hover:text-gray-500" onClick={() => setActiveComponent('explore')}>
            Explore
          </li>
          <li className="cursor-pointer hover:text-gray-500" onClick={() => setActiveComponent('planets')}>
            Planets
          </li>
        </ul>
      </nav>
    );
  };

  Navbar.propTypes = {
    setActiveComponent: PropTypes.func.isRequired,
  };

  export default Navbar;