import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

//object from fribase website
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

firebase.initializeApp(config)

export const auth = firebase.auth()
export const firestore = firebase.firestore()

//google auth utility
const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({ prompt: 'select_account' })
export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase