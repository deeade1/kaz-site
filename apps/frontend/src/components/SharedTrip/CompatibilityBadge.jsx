import { useQuery } from '@apollo/client';

const GET_COMPATIBILITY = gql`
  query GetCompatibility($tripId: ID!) {
    sharedTrip(id: $tripId) {
      id
      compatibilityScore
      matchedPreferences {
        music
        conversation
      }
    }
  }
`;

export default function CompatibilityBadge({ tripId }) {
  const { loading, error, data } = useQuery(GET_COMPATIBILITY, {
    variables: { tripId }
  });

  if (loading) return <div className="loading">Checking compatibility...</div>;
  if (error) return <div className="error">Error loading compatibility</div>;

  const score = data?.sharedTrip?.compatibilityScore || 0;
  
  return (
    <div className="compatibility-badge">
      <div className="score-meter">
        <div 
          className="score-fill" 
          style={{ width: `${score}%` }}
          data-score={score}
        ></div>
      </div>
      <div className="score-details">
        {data.sharedTrip.matchedPreferences.music && (
          <span>🎵 Music Match</span>
        )}
        {data.sharedTrip.matchedPreferences.conversation && (
          <span>💬 Conversation Style</span>
        )}
      </div>
    </div>
  );
}