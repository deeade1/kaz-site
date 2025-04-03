import { useMutation } from '@apollo/client';

const VERIFY_DRIVER = gql`
  mutation VerifyDriver($tripId: ID!, $image: String!) {
    verifyDriver(tripId: $tripId, image: $image) {
      success
      message
    }
  }
`;

const EMERGENCY_ALERT = gql`
  mutation TriggerEmergency($tripId: ID!) {
    triggerEmergency(tripId: $tripId) {
      success
      message
    }
  }
`;

export default function SafetyControls({ tripId }) {
  const [verifyDriver] = useMutation(VERIFY_DRIVER);
  const [triggerEmergency] = useMutation(EMERGENCY_ALERT);
  const [verificationImage, setVerificationImage] = useState(null);

  const handleVerification = async () => {
    if (!verificationImage) return;
    
    try {
      const { data } = await verifyDriver({
        variables: {
          tripId,
          image: verificationImage
        }
      });
      alert(data.verifyDriver.message);
    } catch (error) {
      console.error("Verification failed:", error);
    }
  };

  const handleEmergency = () => {
    if (window.confirm("Are you sure you want to trigger emergency services?")) {
      triggerEmergency({ variables: { tripId } });
      alert("Emergency services notified!");
    }
  };

  return (
    <div className="safety-controls">
      <div className="verification">
        <input 
          type="file" 
          accept="image/*" 
          capture="environment"
          onChange={(e) => setVerificationImage(e.target.files[0])}
        />
        <button onClick={handleVerification}>Verify Driver</button>
      </div>
      <button className="emergency-btn" onClick={handleEmergency}>
        🆘 Emergency Help
      </button>
    </div>
  );
}