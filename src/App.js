import React from 'react';
import {Switch, Route} from 'react-router-dom'
import { connect } from 'react-redux'
import './App.css';
import HomePage from './pages/homepage/homepage.component'
import ShopPage from './pages/shop/shop.component'
import SignInSignUp from './pages/sign-in-sign-up/sign-in-sign-up.component'
import Header from './components/header/header.component'
import { auth, createUserProfileDocument } from './firebase/firebase.utils'
import { setCurrentUser } from './redux/user/user.actions'

class App extends React.Component {

  unsubscribeFromAuth = null

  componentDidMount() {
    const {setCurrentUser} = this.props

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      //when user signs in, check if they are signing in
      if (userAuth) {
        //get the userRef from createUserProfileDocument which is a function in firabase.utils
        const userRef = await createUserProfileDocument(userAuth)
        //get the snapshot of the userAuth
        userRef.onSnapshot(snapshot => {
          //create an object that combines id from snapshot and all the other data.  id is not found in snapshot.data
          setCurrentUser({
            id: snapshot.id,
            ...snapshot.data()
          })
        })
      } else {
        //otherwise, this will set the user's state to null, which we get back from the auth library
        setCurrentUser(userAuth)
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
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage}/>
          <Route path='/shop' component={ShopPage}/>
          <Route path='/signin' component={SignInSignUp}/>
        </Switch>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(null, mapDispatchToProps)(App);
