import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import firebase from 'firebase/app'
import 'firebase/auth'
import initFirebase from '../utils/auth/initFirebase'
import { setUserCookie } from '../utils/auth/userCookies'
import { mapUserData } from '../utils/auth/mapUserData'
import { Props } from 'react-firebaseui/index';

// Init the Firebase app.
initFirebase()

const firebaseAuthConfig: Props["uiConfig"] = {
  signInFlow: 'popup',
  // Auth providers
  // https://github.com/firebase/firebaseui-web#configure-oauth-providers
  signInOptions: [
    {
      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
      requireDisplayName: false,
    },
  ],
  signInSuccessUrl: '/',
  credentialHelper: 'none',
  callbacks: {
    signInSuccessWithAuthResult: (authResult, redirectUrl) => {
      const userData = mapUserData(authResult.user)
      Promise.all([userData]).then(()=>{
        setUserCookie(userData)
      })
      return true
    },
  },
}

const FirebaseAuth = () => {
  return (
    <div>
      <StyledFirebaseAuth
        uiConfig={firebaseAuthConfig}
        firebaseAuth={firebase.auth()}
      />
    </div>
  )
}

export default FirebaseAuth
