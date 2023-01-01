import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

const firebaseConfig = {
  // firebase 설정과 관련된 개인 정보
  apiKey: "AIzaSyCh4fhSvFkTEkcItt0rnAyBiKlPwz3Jr_s",
  authDomain: "todo-ts-3ea0b.firebaseapp.com",
  projectId: "todo-ts-3ea0b",
  storageBucket: "todo-ts-3ea0b.appspot.com",
  messagingSenderId: "957364093498",
  appId: "1:957364093498:web:a7b5709c16d1bd7d8bab03",
  measurementId: "G-TBJL9XMB9Z",
};

// firebaseConfig 정보로 firebase 시작
firebase.initializeApp(firebaseConfig);

// firebase의 firestore 인스턴스를 변수에 저장
const firestore = firebase.firestore();

// 필요한 곳에서 사용할 수 있도록 내보내기
// 다른 곳에서 불러올때 firestore로 불러와야 함!!
export { firestore };

// auth 내보내기
export const auth = firebase.auth();

// apikey 내보내기
export const apiKey = firebaseConfig.apiKey;
