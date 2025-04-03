import { useSubscription } from '@apollo/client';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const TRIP_LOCATION_SUBSCRIPTION = gql`
  subscription TripLocationUpdates($tripId: ID!) {
    tripLocationUpdates(tripId: $tripId) {
      latitude
      longitude
      timestamp
    }
  }
`;

export default function TripMap({ tripId, initialLocation }) {
  const [position, setPosition] = useState(initialLocation);
  
  const { data } = useSubscription(TRIP_LOCATION_SUBSCRIPTION, {
    variables: { tripId }
  });

  useEffect(() => {
    if (data?.tripLocationUpdates) {
      setPosition([data.tripLocationUpdates.latitude, data.tripLocationUpdates.longitude]);
    }
  }, [data]);

  return (
    <div className="trip-map-container">
      <MapContainer 
        center={position} 
        zoom={13} 
        style={{ height: '400px', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position} icon={
          L.icon({
            iconUrl: '/car-icon.png',
            iconSize: [32, 32]
          })
        }>
          <Popup>Driver Location</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}