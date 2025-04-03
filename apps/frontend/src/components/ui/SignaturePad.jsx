const SignaturePad = ({ onSave }) => {
  const [signature, setSignature] = useState(null);
  
  const handleClear = () => {
    setSignature(null);
  };
  
  const handleSave = () => {
    if (signature) {
      onSave(signature);
    }
  };

  return (
    <div className="signature-pad">
      <div className="signature-canvas">
        {/* Signature canvas implementation would go here */}
      </div>
      <div className="signature-actions">
        <button onClick={handleClear}>Clear</button>
        <button onClick={handleSave} disabled={!signature}>
          Save Signature
        </button>
      </div>
    </div>
  );
};