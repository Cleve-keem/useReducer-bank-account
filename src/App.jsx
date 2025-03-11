import { useReducer } from "react";
import "./App.css";

const initialState = {
  balance: 0,
  loan: 0,
  isValid: false,
};

const DEBIT_150 = 150;
const WITHDRAW_50 = 50;
const LOAN_5000 = 5000;

function reducer(state, action) {
  switch (action.type) {
    case "openAcc":
      return {
        ...state,
        balance: 500,
        isValid: true,
      };

    case "deposit":
      return {
        ...state,
        balance: state.balance > 0 ? state.balance + DEBIT_150 : state.balance,
      };

    case "withdraw":
      return {
        ...state,
        balance:
          state.balance >= WITHDRAW_50
            ? state.balance - WITHDRAW_50
            : state.balance,
      };
    case "requestLoan":
      return {
        ...state,
        balance: state.balance + LOAN_5000,
        loan: LOAN_5000,
      };
    default: {
      return state;
    }
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { balance, loan, isValid } = state;
  const isDisable = !isValid;

  return (
    <div className="app">
      <h1>useReducer Bank Account</h1>
      <p>Balance: {balance}</p>
      <p>Loan: {loan}</p>
      <div className="buttons">
        <button onClick={() => dispatch({ type: "openAcc" })}>
          Open Account
        </button>
        <button
          onClick={() => dispatch({ type: "deposit" })}
          disabled={isDisable}
        >
          Deposit
        </button>
        <button
          onClick={() => dispatch({ type: "withdraw" })}
          disabled={isDisable}
        >
          Withdraw
        </button>
        <button
          onClick={() => dispatch({ type: "requestLoan" })}
          disabled={isDisable}
        >
          Request a loan of 5000
        </button>
        <button disabled={isDisable}>Pay loan</button>
        <button disabled={isDisable}>Close Account</button>
      </div>
    </div>
  );
}

export default App;
