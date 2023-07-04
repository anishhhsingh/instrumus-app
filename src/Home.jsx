const Home = () => {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h2 className="text-4xl font-bold text-center">Welcome Star Wars</h2>
        <div className="animate-bounce">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-16 w-16 text-gray-900 mt-4">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
        </div>
      </div>
    );
  };

  export default Home;