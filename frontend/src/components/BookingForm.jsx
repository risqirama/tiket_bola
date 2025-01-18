import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const BookingForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [concert, setConcert] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone_number: '',
    number_of_tickets: 1
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchConcert = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/tiket_bola/backend/api/concerts.php?id=${id}`);
        setConcert(response.data);
      } catch (error) {
        console.error('Error fetching concert:', error);
        setError('Concert not found');
      } finally {
        setLoading(false);
      }
    };

    fetchMatch();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:8080/tiket_bola/backend/api/book_ticket.php', {
        concert_id: concert.id,
        ...formData
      });

      setSuccess(true);
      setTimeout(() => {
        navigate('/booking-success', { 
          state: { 
            booking: response.data,
            concert: concert,
            customerInfo: formData
          }
        });
      }, 2000);

    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred while booking the ticket');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-red-600 mb-4">{error}</h2>
        <button
          onClick={() => navigate('/')}
          className="text-indigo-600 hover:text-indigo-800"
        >
          Return to Concert List
        </button>
      </div>
    );
  }

  if (success) {
    return (
      <div className="text-center p-4">
        <div className="text-green-600 text-xl mb-4">Booking successful!</div>
        <div className="text-gray-600">Redirecting to confirmation page...</div>
      </div>
    );
  }

  if (!concert) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Concert not found</h2>
        <button
          onClick={() => navigate('/')}
          className="text-indigo-600 hover:text-indigo-800"
        >
          Return to Concert List
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
  <div className="bg-gradient-to-r from-red-500 via-pink-400 to-pink-500 text-white rounded-lg shadow-lg overflow-hidden">
    <div className="p-8">
      <h2 className="text-3xl font-extrabold mb-6 text-center">CONFIRM BOOK</h2>
      <div className="mb-6">
        <h3 className="text-2xl font-semibold">{concert.title}</h3>
        <p className="text-lg">Venue: <span className="font-medium">{concert.venue}</span></p>
        <p className="text-lg">Date: <span className="font-medium">{new Date(concert.date).toLocaleDateString()}</span></p>
        <p className="text-xl font-bold mt-4">
          {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(concert.price)}
          <span className="text-sm font-normal">/ ticket</span>
        </p>
        <p className="text-sm mt-2">Available tickets: <span className="font-medium">{concert.available_tickets}</span></p>
      </div>

      {error && (
        <div className="bg-red-100 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-lg font-medium mb-2">Full Name</label>
          <input
            type="text"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:ring-2  focus:ring-indigo-300 bg-white text-black"
          />
        </div>
        <div>
          <label className="block text-lg font-medium mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-300 bg-white text-black"
          />
        </div>
        <div>
          <label className="block text-lg font-medium mb-2">Phone Number</label>
          <input
            type="tel"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-300 bg-white text-black"
          />
        </div>
        <div>
          <label className="block text-lg font-medium mb-2">Number of Tickets</label>
          <input
            type="number"
            name="number_of_tickets"
            value={formData.number_of_tickets}
            onChange={handleChange}
            min="1"
            max={concert.available_tickets}
            required
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-300 bg-white text-black"
          />
        </div>
        <div>
          <label className="block text-lg font-medium mb-2">Metode Pembayaran</label>
          <select
            name="payment_method"
            value={formData.payment_method}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-300 bg-white text-black"
          >
          <option value="">Pilih Metode Pembayaran</option>
          <option value="qris">QRIS</option>
          <option value="ovo">OVO</option>
          <option value="gopay">GoPay</option>
          <option value="dana">DANA</option>
          <option value="bank_transfer">Transfer Bank</option>
        </select>
        </div>

        <div className="flex justify-between items-center mt-8">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-red-500 hover:text-white transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className={`px-8 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Booking...' : 'Book Now'}
          </button>
        </div>
      </form>
    </div>
  </div>
</div>
  );
};

export default BookingForm;