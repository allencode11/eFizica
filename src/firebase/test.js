import firebase from 'firebase/compat/app';
import 'firebase/firestore';

const firestore = firebase.firestore();

firestore.collection('users')