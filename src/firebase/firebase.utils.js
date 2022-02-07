

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const config = {
  apiKey: "AIzaSyAYlA26ntOTyN6_fuFWSFL6xk36PU-Atrw",
  authDomain: "e-commerce-a0885.firebaseapp.com",
  projectId: "e-commerce-a0885",
  storageBucket: "e-commerce-a0885.appspot.com",
  messagingSenderId: "809388280364",
  appId: "1:809388280364:web:32b4dcc3d526e043361f89",
  measurementId: "G-DZ4MB5MWVP"
};

export const createUserProfileDocument = async (userAuth,additionalData) =>{

  if(!userAuth) return;

  const userRef =firestore.doc(`users/${userAuth.uid}`);

  // const collectionRef = firestore.collection('users');

  const snapShot = await userRef.get();

  // const collectionSnap = await collectionRef.get();
  // console.log({collection: collectionSnap.docs.map(doc => doc.data())});



  if(!snapShot.exists){
    const { displayName, email}= userAuth;
    const createAt = new Date();
    
    try{
      await userRef.set({
        displayName,
        email,
        createAt,
        ...additionalData
      })
    }catch(error) {
      console.log('error creating user',error.message); 
    }
    } 
    return userRef;
};

firebase.initializeApp(config);

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = firestore.collection(collectionKey);
  console.log(collectionRef)

  const batch = firestore.batch();
  objectsToAdd.forEach(obj =>{
    const newDocRef=collectionRef.doc();
    batch.set(newDocRef,obj);
    // console.log(newDocRef);
  });

  return await batch.commit()//fires off our batch request/return a promise / null value when it succeds 
}

export const convertCollectionsSnapShotToMap=(collections)=>{
const transformedCollection = collections.docs.map(
  doc=>{
    const{title,items} = doc.data();
    return{
      routeName:encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items
    }
  });
// console.log(transformedCollection)
return transformedCollection.reduce((accumulator, collection) => {
  accumulator[collection.title.toLowerCase()] = collection;
  return accumulator;
}, {});
};
//pass initial object, it goes to the first new collection/elements/set the first value/returns the object/ new property


export const auth = firebase.auth();

export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt:'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;

