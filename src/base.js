import Rebase from 're-base'
// make integration easier for firebase
// linked in package.json
import firebase from 'firebase/app'
import 'firebase/database'
//optimize speed to import this way

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyANDPwesm9CSmn8rioQhXusd3uJpHYa4wg",
  authDomain: "chat-app-8b3cc.firebaseapp.com",
  databaseURL: "https://chat-app-8b3cc-default-rtdb.firebaseio.com"
})

const base = Rebase.createClass(firebase.database())

// initialize app
export { firebaseApp }

//handle db
export default base