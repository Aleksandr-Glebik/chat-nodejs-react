import React, { useReducer } from 'react';
import './App.css';
import JoinBlock from './components/JoinBlock';
import reducer from './reducer';
import { AuthActionEnum } from './reducer';


const App: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, {
    isAuth: false,
  })

  const onLogin = () => {
    dispatch({
      type: AuthActionEnum.IS_AUTH,
      payload: true,
    })
  }

  console.log('state', state)

  return (
    <div className="wrapper">
      {!state.isAuth
        ? <JoinBlock onLogin={onLogin} />
        : <div>Messages</div> 
      }
    </div>
  );
}

export default App;
