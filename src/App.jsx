import React from 'react'
import { AppRouter } from './router'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

export const App = () => {
  return (
    <Provider store={store}>
        <BrowserRouter>
            <AppRouter/>
        </BrowserRouter>
    </Provider>
  
)
}
