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
      if (state.isValid) {
        alert("You already have an account!");
        return state;
      }
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
      if (state.loan > 0) {
        alert(
          "You already have an active loan, Pay off before requesting another!"
        );
        return state;
      }
      return {
        ...state,
        balance: state.balance + LOAN_5000,
        loan: LOAN_5000,
      };
    case "payLoan":
      if (state.loan !== 0 && state.balance < LOAN_5000) {
        alert(
          "Your balance isn't up to the loan, fund your account and pay up before due date"
        );
        return state;
      } else if (state.loan === 0) {
        alert(
          "You don't have a pending loan!, You are eligible to apply for a loan"
        );

        return state;
      }

      return {
        ...state,
        balance:
          state.balance >= LOAN_5000
            ? state.balance - LOAN_5000
            : state.balance,
        loan: 0,
      };
    case "closeAcc":
      if (state.balance === 0 && state.loan === 0) {
        return {
          ...initialState,
        };
      } else {
        alert("Account cannot be closed until balance and loan are settled.");
        return state;
      }
    default: {
      return "This action is unknown!";
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
          Deposit 150
        </button>
        <button
          onClick={() => dispatch({ type: "withdraw" })}
          disabled={isDisable}
        >
          Withdraw 50
        </button>
        <button
          onClick={() => dispatch({ type: "requestLoan" })}
          disabled={isDisable}
        >
          Request a loan of 5000
        </button>
        <button
          onClick={() => dispatch({ type: "payLoan" })}
          disabled={isDisable}
        >
          Pay loan
        </button>
        <button
          onClick={() => dispatch({ type: "closeAcc" })}
          disabled={isDisable}
        >
          Close Account
        </button>
      </div>
    </div>
  );
}

export default App;
