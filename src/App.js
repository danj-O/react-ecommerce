import React from 'react';
import {Switch, Route} from 'react-router-dom'
import './App.css';
import HomePage from './pages/homepage/homepage.component'
import ShopPage from './pages/shop/shop.component'
import SignInSignUp from './pages/sign-in-sign-up/sign-in-sign-up.component'
import Header from './components/header/header.component'
import { auth, createUserProfileDocument } from './firebase/firebase.utils'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      currentUser: null
    }
  }

  unsubscribeFromAuth = null

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      //when user signs in, check if they are signing in
      if (userAuth) {
        //get the userRef from createUserProfileDocument which is a function in firabase.utils
        const userRef = await createUserProfileDocument(userAuth)
        //get the snapshot of the userAuth
        userRef.onSnapshot(snapshot => {
          //create an object that combines id from snapshot and all the other data.  id is not found in snapshot.data
          this.setState({
            currentUser: {
              id: snapshot.id,
              ...snapshot.data()
            }
          }, 
          //because setstate asyncronous, we need to console.log as another param to setstate, so we are waiting for the state to be set before logging
          () => {
            console.log(this.state)

          })
        })
      } else {
        //otherwise, this will set the user's state to null, which we get back from the auth library
        this.setState({ currentUser: userAuth })
        console.log(this.state)

      }
    })
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth()
  }

  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path='/' component={HomePage}/>
          <Route path='/shop' component={ShopPage}/>
          <Route path='/signin' component={SignInSignUp}/>
        </Switch>
      </div>
    );
  }
}
export default App;
