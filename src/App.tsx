import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import { observer } from 'mobx-react';
import ProfileCards from './components/ProfileCards/ProfileCards';
import {IUser} from "./store/UserStore";
import Profile from "./components/Profile/Profile";
import {useStores} from "./store";

function App() {

  const {app} = useStores().view

  return (
    <div className="App">
      <div className="split-layout">


        <div className="layout-half">
          <ProfileCards />
        </div>
        <div className="layout-half">
          {app.selectedProfile && <Profile profile={app.selectedProfile} /> || <h2>Выберите профиль для просмотра</h2>}
        </div>
      </div>
    </div>
  );
}

export default observer(App);
