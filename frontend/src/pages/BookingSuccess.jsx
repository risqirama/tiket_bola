import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const BookingSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { booking, match, customerInfo } = location.state || {};

  if (!booking || !match || !customerInfo) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Invalid booking data</h2>
        <button
          onClick={() => navigate('/')}
          className="text-indigo-600 hover:text-indigo-800"
        >
          Return to Match List
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-gradient-to-r from-red-100 via-red-300 to-white text-black rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
            <svg
              className="w-10 h-10 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-4xl font-extrabold text-gray-900 mb-2">
            Booking Confirmed!
          </h2>
          <p className="text-lg text-gray-700">
            Thank you for your purchase. Your tickets are ready.
          </p>
        </div>

        <div className="border-t border-b border-gray-200 py-6 mb-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">Booking Details</h3>
          <div className="space-y-4">
            <p>
              <span className="font-medium">Booking ID:</span>{' '}
              <span className="text-gray-700">{booking.booking_id}</span>
            </p>
            <p>
              <span className="font-medium">Match:</span>{' '}
              <span className="text-gray-700">{concert.title}</span>
            </p>
            <p>
              <span className="font-medium">Venue:</span>{' '}
              <span className="text-gray-700">{concert.venue}</span>
            </p>
            <p>
              <span className="font-medium">Date:</span>{' '}
              <span className="text-gray-700">
                {new Date(concert.date).toLocaleDateString()}
              </span>
            </p>
            <p>
              <span className="font-medium">Number of Tickets:</span>{' '}
              <span className="text-gray-700">{customerInfo.number_of_tickets}</span>
            </p>
            <p>
              <span className="font-medium">Total Price:</span>{' '}
              <span className="text-red-600 font-bold">
                {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(
                  booking.total_price
                )}
              </span>
            </p>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">Customer Information</h3>
          <div className="space-y-4">
            <p>
              <span className="font-medium">Name:</span>{' '}
              <span className="text-gray-700">{customerInfo.full_name}</span>
            </p>
            <p>
              <span className="font-medium">Email:</span>{' '}
              <span className="text-gray-700">{customerInfo.email}</span>
            </p>
            <p>
              <span className="font-medium">Phone:</span>{' '}
              <span className="text-gray-700">{customerInfo.phone_number}</span>
            </p>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={() => navigate('/')}
            className="bg-red-500 text-white px-8 py-3 rounded-md hover:bg-red-600 transition shadow-lg"
          >
            Return to homepage
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingSuccess;
