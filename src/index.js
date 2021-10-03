import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'antd/dist/antd.css';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './redux/configStore';
import * as signalR from '@aspnet/signalr'
import { DOMAIN } from './util/settings';
import './i18n'


export const connection = new signalR.HubConnectionBuilder().withUrl(`${DOMAIN}/DatVeHub`).configureLogging(signalR.LogLevel.Information).build();

connection.start().then(() => {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>
    ,
    document.getElementById('root')
  );
}).catch((errors) => {
  console.log(errors)
})