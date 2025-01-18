import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ConcertList = () => {
  const [concerts, setConcerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageErrors, setImageErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchConcerts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/tiket_bola/backend/api/matchs.php');
        setConcerts(response.data);
      } catch (error) {
        console.error('Error fetching matchs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMatchs();
  }, []);

  const handleImageError = (matchId) => {
    setImageErrors(prev => ({
      ...prev,
      [matchId]: true
    }));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-red-500"></div>
      </div>
    );
  }

  return (
    <div className="w-full p-6 bg-gradient-to-br from-red-50 to-red-200 min-h-screen">
      <h2 className="text-4xl font-bold text-gray-900 mb-10 text-center">MATCH AVAILABLE</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {matchs.map((match) => (
          <div
            key={match.id}
            className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden relative transform hover:-translate-y-2"
          >
            <div className="relative h-56">
              {!imageErrors[match.id] ? (
                <img
                  src={`http://localhost:5173${match.image_url}`}
                  alt={concert.title}
                  className="w-full h-full object-cover"
                  onError={() => handleImageError(concert.id)}
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500 text-lg font-medium">{concert.title}</span>
                </div>
              )}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-white">
                <h3 className="text-2xl font-semibold truncate">{concert.title}</h3>
              </div>
            </div>

            <div className="p-6">
              <div className="space-y-3">
                <p className="text-gray-600 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  {concert.venue}
                </p>
                <p className="text-gray-600 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                  {new Date(concert.date).toLocaleDateString()}
                </p>
              </div>

              <div className="flex justify-between items-center mt-6">
              <span className="text-2xl font-bold text-red-600">
                  {new Intl.NumberFormat('id-ID', {
                    style: 'currency',
                      currency: 'IDR',
                  }).format(concert.price)}
              </span>
                <button
                  onClick={() => navigate(`/book/${concert.id}`)}
                  className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 transition duration-300"
                >
                  Book Now
                </button>
              </div>

              <p className="text-sm text-gray-500 mt-4 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
                </svg>
                {concert.available_tickets} seats available
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConcertList;
