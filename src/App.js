import './App.css';
import './App.scss';
import React, { useState, useEffect } from 'react';

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from './Components/Home/Home';
import AdminPage from './Components/AdminPage/AdminPage';
import AllAnnounces from './Components/AllAnnounces/AllAnnounces';
import Footer from './Components/Footer/Footer';
import NavBar from './Components/NavBar/NavBar';
import UserPage from './Components/UserPage/UserPage';
import AnnounceDetail from './Components/AnnounceDetail/AnnounceDetail';
import PostAnnounce from './Components/AdminPage/PostAnnounce/PostAnnounce';

//temporaire :
import CreateAnn from './Components/PostForm/postform';
import AllAnnouncesAdmin from './Components/AnnounceManager/AllAnnouncesAdmin';
import AnnounceDetailAdmin from './Components/AnnounceManager/AnnounceDetailAdmin';
import AllTransacSmart from './Components/UserPage/UserProperties/allTransacSmart';
import AllPropertiesSmart from './Components/UserPage/UserProperties/propertiesSmart';
import AllUpToSales from './Components/UserPage/UserProperties/userSalesSmart';

const axios = require('axios');

function App() {

  const [formState, setFormState] = useState("none");
  const [user, setUser] = useState({});

  //un state pour determiner l'etat du log / le niveau (user/valider/admin)
  //a passer a la navbar pour son affichage conditionnel
  //un state pour l'id user
  // a passer a certaine page (userpage/admin ect...)
  //Créer une fonction qui des l'affichage check le localStorage et verifie le token avec un requete <- recupere l'id
  //et mettre l'id dans un state pour le passé apres dans certains composant enfants ex:userpag

  let isLog = user !== null;

  function hardRefresh() {
    let localToken = localStorage.getItem("@updownstreet-token");
    if (localToken === null) {
      return setUser(null)
    }
    axios.get("http://localhost:1337/api/users/token", { headers: { authorization: `Bearer ${localToken}` } })
      .then((res) => {
        setUser(res.data);
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    hardRefresh();
  }, [])

  return (
    <div className="app">
      <Router>
        <div className="main">
        <NavBar formState={formState} setFormState={setFormState} isLog={isLog} user={user} />
        <Switch>
          <Route exact path="/" >
            <Home formState={formState} setFormState={setFormState} hardRefresh={hardRefresh} />
          </Route>
          <Route path="/announces" >
            <AllAnnounces />
          </Route>
          <Route path="/admin" >
            <AdminPage />
          </Route>
          <Route path="/userpage" >
            <UserPage user={user} hardRefresh={hardRefresh}/>
          </Route>
          {/*TEMPORAIRE :*/}
          <Route path="/createann" >
            <CreateAnn />
          </Route>
          <Route path="/allannouncesadmin">
            <AllAnnouncesAdmin />
          </Route>
          <Route path="/announce-detail-admin">
            <AnnounceDetailAdmin />
          </Route>          
          <Route path="/announce-detail">
            <AnnounceDetail />
          </Route>
          <Route path="/user-transac">
            <AllTransacSmart/>
          </Route>
          <Route path="/user-properties-list">
            <AllPropertiesSmart />
          </Route>
          <Route path="/postAnnounce">
            <PostAnnounce/>
          </Route>
          {/* TEMPORAIRE : */}
          <Route path="/sell">
            <AllUpToSales/>
          </Route>
        </Switch>
        </div>
        <Footer/>
      </Router> 
    </div>
  );
}

export default App;
