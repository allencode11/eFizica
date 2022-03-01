import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import { firestore } from './firebase.utils';

export const createPlan = async ( file ) => {
  if(!file) return;

  const questionRef = firestore.collection('physics/plans');
  const createdAt = new Date();

  try {
    await questionRef.add({
      file,
      createdAt
    })
  } catch (error) {
    console.error(error);
  }

  return;
};

export const getPlan = async ( ) => {

  const itemsArr = [];

  const questionRef = firestore.collection('physics');
  const querySnapshot = await questionRef.get();

  querySnapshot.docs.forEach(item=>{

    itemsArr.push(item.data())

  })

  return {
    "pdf": itemsArr
  };
}

