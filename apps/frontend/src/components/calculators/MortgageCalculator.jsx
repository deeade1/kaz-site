const MortgageCalculatorComponent = () => {
    const [values, setValues] = useState({
      principal: 300000,
      rate: 3.5,
      years: 30,
    });
    
    const [results, setResults] = useState(null);
  
    const calculate = () => {
      const calculator = new MortgageCalculator(
        values.principal,
        values.rate,
        values.years
      );
      
      setResults({
        monthlyPayment: calculator.monthlyPayment(),
        totalInterest: calculator.totalInterest(),
        amortization: calculator.amortizationSchedule().slice(0, 12), // First year
      });
    };
  
    return (
      <div className="mortgage-calculator">
        <h3>Mortgage Calculator</h3>
        
        <div className="calculator-inputs">
          <div className="input-group">
            <label>Loan Amount ($)</label>
            <input 
              type="number" 
              value={values.principal} 
              onChange={(e) => setValues({...values, principal: parseFloat(e.target.value) || 0})}
            />
          </div>
          
          <div className="input-group">
            <label>Interest Rate (%)</label>
            <input 
              type="number" 
              step="0.01"
              value={values.rate} 
              onChange={(e) => setValues({...values, rate: parseFloat(e.target.value) || 0})}
            />
          </div>
          
          <div className="input-group">
            <label>Loan Term (years)</label>
            <input 
              type="number" 
              value={values.years} 
              onChange={(e) => setValues({...values, years: parseInt(e.target.value) || 0})}
            />
          </div>
          
          <button onClick={calculate}>Calculate</button>
        </div>
        
        {results && (
          <div className="calculator-results">
            <div className="result-summary">
              <h4>Monthly Payment: {formatCurrency(results.monthlyPayment)}</h4>
              <p>Total Interest: {formatCurrency(results.totalInterest)}</p>
            </div>
            
            <div className="amortization-table">
              <h4>First Year Payments</h4>
              <table>
                <thead>
                  <tr>
                    <th>Month</th>
                    <th>Payment</th>
                    <th>Principal</th>
                    <th>Interest</th>
                    <th>Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {results.amortization.map((row) => (
                    <tr key={row.month}>
                      <td>{row.month}</td>
                      <td>{formatCurrency(row.payment)}</td>
                      <td>{formatCurrency(row.principal)}</td>
                      <td>{formatCurrency(row.interest)}</td>
                      <td>{formatCurrency(row.balance)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    );
  };