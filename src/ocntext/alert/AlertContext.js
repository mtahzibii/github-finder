import { useState, createContext } from "react";

const AlertContext = createContext();
//

export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState("Oops...please enter something");

  // Set Alert
  const changeAlert = (msg) => {
    setAlert(msg);
  };
  return (
    <AlertContext.Provider value={changeAlert}>
      {children}
    </AlertContext.Provider>
  );
};
export default AlertContext;

// export const AlertProvider = ({ children }) => {
//   // Initial state
//   const initialState = null;

//   // useReducer
//   const [state, dispatch] = useReducer(alertReducer, initialState);

//   // Set an alert
//   const setAlert = (msg, type) => {
//     dispatch({
//       type: "SET_ALERT",
//       payload: { msg, type },
//     });

//     setTimeout(() => dispatch({ type: "REMOVE_ALERT" }), 3000);
//   };

//   return (
//     <AlertContext.Provider value={{ alert: state, setAlert }}>
//       {children}
//     </AlertContext.Provider>
//   );
// };

// export default AlertContext;
