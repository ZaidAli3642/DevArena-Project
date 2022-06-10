import {initializeApp} from 'firebase/app';
import {getStorage} from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCeTKvbzwzI6RYZ54MRapE3tsOyII1_IZ0',
  authDomain: 'fir-frontend-966dc.firebaseapp.com',
  projectId: 'fir-frontend-966dc',
  storageBucket: 'fir-frontend-966dc.appspot.com',
  messagingSenderId: '946770395059',
  appId: '1:946770395059:web:5c050d12679f9aa72c55c6',
  measurementId: 'G-XGF2P4XDDP',
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
