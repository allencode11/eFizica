import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const config = {
  apiKey: "AIzaSyBwk7eVa17MuOa6_hSiYBcBl3m0bZNaj7Y",
  authDomain: "market-db-1cd7c.firebaseapp.com",
  projectId: "market-db-1cd7c",
  storageBucket: "market-db-1cd7c.appspot.com",
  messagingSenderId: "80060070283",
  appId: "1:80060070283:web:cf766902b1a88b0ed5978e",
  measurementId: "G-YWX6937NJY"
};

export const createUserAccountDocument = async (userAuth, additionalData) => {
  if(!userAuth) return;

  try {
    const { email } = userAuth;

    const userRef = firestore.collection('users');
    const q = userRef.where("email", "==", email);

    const querySnapshot = await q.get();

    if(querySnapshot.empty === false) {
      return;
    } else {
      const createdAt = new Date();
      try {
        await userRef.add({
          createdAt,
          email,
          ...additionalData
        })
      } catch (error) {
        console.error(error);
      }
    }
    return userRef;
  } catch (e) {
    console.log(e);
  }
}

export const isAdmin = async (email) => {
  const usersRef = firestore.collection('users');
  const querySnapshot = await usersRef.get();

  let result = false;
  querySnapshot.docs.filter((user) => user.data().email === email);

  if (querySnapshot.docs[0].data().role === 'admin')
    return true
  else return false

};

export const createQuestion = async ( grade, module, {...question }) => {
  if(!question && !grade && !module) return;

  const questionRef = firestore.collection(`physics/${grade}/${module}`);
  const createdAt = new Date();

  try {
    await questionRef.add({
      createdAt,
      ...question
    })
  } catch (error) {
    console.error(error);
  }

  return;
}

export const getQuestion = async ( grade, module) => {
  if(!grade && !module) return;

  const itemsArr = [];

  const questionRef = firestore.collection(`physics/${grade}/${module}`);
  const querySnapshot = await questionRef.get();

  querySnapshot.docs.forEach(item=>{

    itemsArr.push(item.data())

  })

  return [{
    "discipline": 'Fizica',
    "grade": grade,
    "module": module,
    "questions": itemsArr,
  }];
};

firebase.initializeApp(config);

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account'})

export const auth = firebase.auth();
export const firestore = firebase.firestore();
// export const storage = firebase.storage();

export const signInWithGoogle = async () => {
  await auth.signInWithPopup(provider);
}

export const logInWithEmailAndPassword = async (email, password) => {
  try {
    console.log(email, password)
    await auth.signInWithEmailAndPassword( email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
export default firebase;
