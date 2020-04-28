import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

//object from firebase website
const config = {
  apiKey: "AIzaSyBjBr3C41uKHoZA9N2k6Kmw3dSs_WBI6wQ",
  authDomain: "ztm-ecommerce.firebaseapp.com",
  databaseURL: "https://ztm-ecommerce.firebaseio.com",
  projectId: "ztm-ecommerce",
  storageBucket: "ztm-ecommerce.appspot.com",
  messagingSenderId: "435269420717",
  appId: "1:435269420717:web:5a05323097c3e2c50da824",
  measurementId: "G-X5WBQMTJ9G"
}

//userAuth is the massive object coming from google containing all users info
export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  //query to see if the uid already exists
  const userRef = firestore.doc(`users/${userAuth.uid}`)
  //get the snapshot of the user data from google
  const snapshot = await userRef.get()

  //exists is a property of the snapshot object. if the snapshot doesnt exist, create one in the try catch
  if (!snapshot.exists) {
    const { displayName, email } = userAuth
    const createdAt = new Date()

    //async req to store the data in the firebase DB
    try {
      //.set is to create object - a new user object gets stored in the db with set
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      console.log('error creating user', error.message)
    }
  }
  //return userRef in case we want to use this data somewhere else
  // console.log(userRef)
  return userRef
}

firebase.initializeApp(config)

export const auth = firebase.auth()
export const firestore = firebase.firestore()

//google auth utility
const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({ prompt: 'select_account' })
export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase