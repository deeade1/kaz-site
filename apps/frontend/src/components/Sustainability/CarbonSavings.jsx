import { useQuery } from '@apollo/client';

const GET_CARBON_SAVINGS = gql`
  query GetCarbonSavings($tripId: ID!) {
    trip(id: $tripId) {
      carbonSavings
      equivalent
    }
  }
`;

export default function CarbonSavings({ tripId }) {
  const { loading, error, data } = useQuery(GET_CARBON_SAVINGS, {
    variables: { tripId }
  });

  if (loading) return <div className="loading">Calculating impact...</div>;
  if (error) return <div className="error">Error calculating savings</div>;

  const savings = data.trip.carbonSavings;
  const equivalent = data.trip.equivalent;

  return (
    <div className="carbon-savings">
      <h3>Environmental Impact</h3>
      <div className="savings">
        <span className="amount">{savings.toFixed(2)} kg</span>
        <span className="label">CO₂ saved</span>
      </div>
      <div className="equivalent">
        Equivalent to {equivalent}
      </div>
    </div>
  );
}