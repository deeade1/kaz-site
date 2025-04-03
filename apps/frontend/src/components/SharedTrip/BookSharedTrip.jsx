import { useMutation, gql } from '@apollo/client';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BOOK_SHARED_TRIP = gql`
  mutation BookSharedTrip($sharedTripId: ID!) {
    bookSharedTrip(sharedTripId: $sharedTripId) {
      booking {
        id
        status
      }
      receipt {
        id
        amount
      }
      sharedTrip {
        id
        availableSeats
      }
    }
  }
`;

export default function BookSharedTrip({ trip }) {
  const [bookTrip, { loading, error }] = useMutation(BOOK_SHARED_TRIP);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleBook = async () => {
    try {
      const { data } = await bookTrip({
        variables: { sharedTripId: trip.id },
        update(cache, { data: { bookSharedTrip } }) {
          cache.modify({
            fields: {
              sharedTrip(existingTripRef) {
                return { ...existingTripRef, ...bookSharedTrip.sharedTrip };
              }
            }
          });
        }
      });
      setSuccess(true);
      setTimeout(() => navigate('/bookings'), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="shared-trip-card">
      <h3>{trip.trip.pickupAddress} → {trip.trip.dropoffAddress}</h3>
      <p>Available seats: {trip.availableSeats}</p>
      <p>Price: ${trip.trip.totalFare.toFixed(2)}</p>
      
      {error && <div className="error">{error.message}</div>}
      {success ? (
        <div className="success">Booking confirmed!</div>
      ) : (
        <button 
          onClick={handleBook} 
          disabled={loading || trip.availableSeats <= 0}
        >
          {loading ? 'Booking...' : 'Book Seat'}
        </button>
      )}
    </div>
  );
}