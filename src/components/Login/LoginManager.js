import { createUserWithEmailAndPassword, FacebookAuthProvider, getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { initializeApp } from "firebase/app";
import { firebaseConfig } from './firebase.config';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export const handleGoogleSignIn = () => {
    const GoogleProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, GoogleProvider)
    .then(res=> {
        const {displayName, email, photoURL} = res.user;
        const signedInUser = {
          isSignedIn: true,
          name: displayName,
          email: email,
          img: photoURL,
          success: true
        }
        return signedInUser;
       })
}
export const handleFbSignIn = () => {
    const FbProvider = new FacebookAuthProvider();
    return signInWithPopup(auth, FbProvider)
      .then((result) => {
          const user = result.user;
          user.success = true;
          return user;
           
        })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
      });
}
export const handleSignOut = () => {
    return signOut(auth)
    .then(() => {
       const signedOutUser = {
         isSignedIn: false,
         name:'',
         email:'',
         img:'',
         success: false
       }
        return signedOutUser;
    });
}
export const CreateUserWithEmailAndPassword = (name, email, password) => {
    return createUserWithEmailAndPassword (auth, email, password)
      .then(res => {
        const newUserInfo = res.user;
        newUserInfo.error = '';
        newUserInfo.success = true;
        updateUserName(name);
        return newUserInfo;
      })
      .catch(err => {
        const newUserInfo = {};
        newUserInfo.success = false;
        newUserInfo.error = err.message;
      })
}
export const SignInWithEmailAndPassword = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
      .then(res => {
        const newUserInfo = res.user;
        newUserInfo.error = '';
        newUserInfo.success = true;
        return newUserInfo;
      })
      .catch(err => {
        const newUserInfo = {};
        newUserInfo.success = false;
        newUserInfo.error = err.message;
      })
}
const updateUserName = name => {
    updateProfile(auth.currentUser, {
      displayName: name
    }).then(() => {
      console.log('user name updated successfully!');
    }).catch((error) => {
      console.log("error:", error.message);
    });
  }