import { useState } from "react";
import "./App.css";

function App() {
  const [balance, setBalance] = useState(0);
  const [loan, setLoan] = useState(0);

  return (
    <div className="app">
      <h1>useReducer Bank Account</h1>
      <p>Balance: {balance}</p>
      <p>Loan: {loan}</p>
      <div className="buttons">
        <button>Open Account</button>
        <button>Deposit</button>
        <button>Withdraw</button>
        <button>Request a loan of 5000</button>
        <button>Pay loan</button>
        <button>Close Account</button>
      </div>
    </div>
  );
}

export default App;
