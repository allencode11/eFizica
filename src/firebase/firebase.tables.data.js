import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import { firestore } from './firebase.utils';

export const createTable = async (  file  ) => {
  if(!file) return;


  const tableRef = firestore.collection('tables');
  const createdAt = new Date();

  try {
    await tableRef.add({
      file,
      createdAt
    })
  } catch (error) {
    console.error(error);
  }

  return;
};

export const getTable = async ( ) => {

  const itemsArr = [];

  const tableRef = firestore.collection('tables');
  const querySnapshot = await tableRef.get();

  querySnapshot.docs.forEach(item=>{

    itemsArr.push(item.data())

  })

  return {
    "image": itemsArr
  };
}

