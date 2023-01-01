import { firestore } from './firebaseConfig';
// import { apiKey } from './firebaseConfig';

export const todos = firestore.collection('/todos');

//경로를 자세하게 적어야한다
// const _session_key = `firebase:authUser:${apiKey}:[DEFAULT]`;
// const isToken = sessionStorage.getItem(_session_key);
// export const todosDoc = firestore.collection('/todos').doc(`/${isToken}
// `);
// export const todosDoc = firestore.collection('/todos').doc('/todo');
