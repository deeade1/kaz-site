import { useQuery } from '@apollo/client';

const GET_LOYALTY_POINTS = gql`
  query GetLoyaltyPoints {
    me {
      loyaltyPoints
      nextReward {
        pointsNeeded
        reward
      }
    }
  }
`;

export default function LoyaltyPoints() {
  const { loading, error, data } = useQuery(GET_LOYALTY_POINTS);
  
  if (loading) return <div className="loading">Loading points...</div>;
  if (error) return <div className="error">Error loading points</div>;

  const points = data.me.loyaltyPoints;
  const nextReward = data.me.nextReward;

  return (
    <div className="loyalty-points">
      <h3>Your Points</h3>
      <div className="points-display">
        <span className="points">{points}</span>
        <span className="label">Loyalty Points</span>
      </div>
      
      {nextReward && (
        <div className="next-reward">
          <p>Earn {nextReward.pointsNeeded - points} more points for:</p>
          <div className="reward">{nextReward.reward}</div>
        </div>
      )}
    </div>
  );
}