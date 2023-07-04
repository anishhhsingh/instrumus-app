import { useState, useEffect } from 'react';
import LoadingSpinner from 'https://github.com/anishhhsingh/instrumus-app/blob/main/src/LoadingSpinner';

const Planets = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    let isMounted = true; // Flag to check if the component is mounted

    const fetchPlanets = async () => {
      let allPlanets = [];
      let nextPageUrl = 'https://swapi.dev/api/planets/';

      while (nextPageUrl) {
        const response = await fetch(nextPageUrl);
        const data = await response.json();
        allPlanets = allPlanets.concat(data.results);
        nextPageUrl = data.next;
      }

      if (isMounted) {
        setData(allPlanets);
        setIsLoading(false);
      }
    };

    if (isMounted) {
      fetchPlanets().catch((error) => {
        console.error('Error:', error);
        setIsLoading(false);
      });
    }

    return () => {
      isMounted = false; // Cleanup function to update the mounted flag
    };
  }, []);

  useEffect(() => {
    const searchPlanet = () => {
      if (searchTerm.trim() !== '') {
        const planetIndex = data.findIndex((planet) =>
          planet.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        if (planetIndex !== -1) {
          const planetPage = Math.ceil((planetIndex + 1) / 6);
          setCurrentPage(planetPage);
        } else {
          setCurrentPage(1);
        }
      }
    };

    searchPlanet();
  }, [data, searchTerm]);

  const cardsPerPage = 6;
  const totalPages = Math.ceil(data.length / cardsPerPage);
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = data.slice(indexOfFirstCard, indexOfLastCard);

  const handlePaginationClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
  };

  const filteredCards = currentCards.filter((planet) =>
    planet.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <h2 className="text-4xl font-bold mt-8 mb-8 text-center">Planets Page</h2>
      <div className="absolute top-20 right-4">
        <form className="mb-4" onSubmit={handleSearchSubmit}>
          <input
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="border border-gray-300 rounded px-4 py-2 mr-2 focus:outline-none"
          />
          <button
            type="submit"
            className="bg-gray-900 text-white rounded px-4 py-2 focus:outline-none ml-2"
          >
            Search
          </button>
        </form>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {filteredCards.map((planet) => (
          <div key={planet.name} className="bg-gray-200 p-6 rounded-xl flex flex-col items-center">
            <h3 className="text-xl font-semibold text-center">{planet.name}</h3>
            <p className="text-center">Climate: {planet.climate}</p>
            <p className="text-center">Population: {planet.population}</p>
            <p className="text-center">Terrain: {planet.terrain}</p>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-8 gap-4">
        {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => handlePaginationClick(pageNumber)}
            className={`h-8 w-8 flex items-center justify-center rounded-full focus:outline-none border border-gray-500 ${
              currentPage === pageNumber ? 'bg-gray-900 text-white' : 'bg-gray-300 text-gray-900'
            }`}
          >
            {pageNumber}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Planets;
