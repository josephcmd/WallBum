import React,{useEffect,useState} from 'react'
import Home from "./components/Home"
import "./animation/style.css";
import axios from 'axios'
import {
  TransitionGroup,
  CSSTransition
} from "react-transition-group";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  
  useLocation,

} from "react-router-dom";
import {useSearch} from "./state/searchState"
import Welcome from './components/Welcome';
import Image from './components/Image';
import { useStore } from './state/state';
function App() {
  
  const {page, img, setImg}= useStore();
 const{search} = useSearch();
  useEffect( () => {
    async function a(){
      axios.get(`https://api.unsplash.com/search/photos/?page=1&&query=${search}`, {
        headers: {
          Authorization: 'Client-ID '+'UNSPLASH API'
        }
       }).then(res=>{setImg(res.data.results)})

       }
       return a()
  },[search])
  useEffect( () => {
    async function a(){
      axios.get(`https://api.unsplash.com/search/photos/?page=1&&query=${page}${search}`, {
        headers: {
          Authorization: 'Client-ID '+'AcV32JsGG4T0ovNLHiiTcL0eb8MNOd2rzV2zEQFdDSk'
        }
       }).then(res=>{setImg(img.concat(res.data.results))})

       }
       return a()
  },[page])
console.log(img)
  return (
    
    <Router>
      <Switch>
      <AnimationApp />
      </Switch>
    </Router>

  );
}

function AnimationApp() {
  let location = useLocation();

  return (
    <div style={styles.fill}>
     

      
        <TransitionGroup>
          {/*
            This is no different than other usage of
            <CSSTransition>, just make sure to pass
            `location` to `Switch` so it can match
            the old location as it animates out.
          */}
          <CSSTransition
            key={location.key}
            classNames="fade"
            timeout={300}
          >
            <Switch location={location}>
              <Route exact path="/" component={Welcome} />
              <Route exact path="/home"  ><Home /></Route>
              <Route path="/home/:id" component={Image}/>
              
            </Switch>
          </CSSTransition>
        </TransitionGroup>
    
    </div>
  );
}

export default App;
const styles = {};

styles.fill = {
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0
};

styles.content = {
  ...styles.fill,
  top: "40px",
  textAlign: "center"
};

styles.nav = {
  padding: 0,
  margin: 0,
  position: "absolute",
  top: 0,
  height: "40px",
  width: "100%",
  display: "flex"
};

styles.navItem = {
  textAlign: "center",
  flex: 1,
  listStyleType: "none",
  padding: "10px"
};

styles.hsl = {
  ...styles.fill,
  color: "white",
  paddingTop: "20px",
  fontSize: "30px"
};

styles.rgb = {
  ...styles.fill,
  color: "white",
  paddingTop: "20px",
  fontSize: "30px"
};
