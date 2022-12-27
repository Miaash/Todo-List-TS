import { firestore } from "./firebaseConfig";

export const todos = firestore.collection("todos");
