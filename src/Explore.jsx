import { useState, useEffect } from 'react';
import LoadingSpinner from 'https://github.com/anishhhsingh/instrumus-app/blob/main/src/LoadingSpinner';

const Explore = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [searchedPerson, setSearchedPerson] = useState('');

  useEffect(() => {
    let isMounted = true;

    const fetchPeople = async () => {
      let allPeople = [];
      let nextPageUrl = 'https://swapi.dev/api/people/';

      while (nextPageUrl) {
        const response = await fetch(nextPageUrl);
        const data = await response.json();
        allPeople = allPeople.concat(data.results);
        nextPageUrl = data.next;
      }

      if (isMounted) {
        setData(allPeople);
        setIsLoading(false);
      }
    };

    if (isMounted) {
      fetchPeople().catch((error) => {
        console.error('Error:', error);
        setIsLoading(false);
      });
    }

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const searchPerson = () => {
      if (searchTerm.trim() !== '') {
        const personIndex = data.findIndex((person) =>
          person.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        if (personIndex !== -1) {
          const personPage = Math.ceil((personIndex + 1) / 6);
          setCurrentPage(personPage);
        } else {
          setCurrentPage(1);
        }
      }
    };

    searchPerson();
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
    setSearchedPerson('');
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    setSearchedPerson(searchTerm);
  };

  const filteredCards = currentCards.filter((person) =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <h2 className="text-4xl font-bold mt-8 mb-8 text-center">Explore Page</h2>
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
        {filteredCards.map((person) => (
          <div key={person.name} className="bg-gray-200 p-6 rounded-xl flex flex-col items-center">
            <h3 className="text-xl font-semibold text-center">{person.name}</h3>
            <p className="text-center">Height: {person.height}</p>
            <p className="text-center">Mass: {person.mass}</p>
            <p className="text-center">Gender: {person.gender}</p>
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

export default Explore;
