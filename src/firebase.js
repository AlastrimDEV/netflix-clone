
import { initializeApp } from "firebase/app";
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut} from "firebase/auth";
import {addDoc, collection, getFirestore} from "firebase/firestore";
import { Await } from "react-router-dom";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyBTziaKkAoyBxjwJ2SNNaDRU3_7NDtnkfE",
  authDomain: "netflix-clone-753d8.firebaseapp.com",
  projectId: "netflix-clone-753d8",
  storageBucket: "netflix-clone-753d8.firebasestorage.app",
  messagingSenderId: "725153586593",
  appId: "1:725153586593:web:42b926e556a9c509eaffe0"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password)=>{
    try{
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "user"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        })
        toast.success("Account created successfully!");
    } catch(error){
        console.log(error);
        let errorMessage = "An error occurred during signup";
        
        switch(error.code) {
            case 'auth/email-already-in-use':
                errorMessage = "Email is already registered. Please use a different email or try logging in.";
                break;
            case 'auth/weak-password':
                errorMessage = "Password is too weak. Please use at least 6 characters.";
                break;
            case 'auth/invalid-email':
                errorMessage = "Please enter a valid email address.";
                break;
            default:
                errorMessage = error.message || "An error occurred during signup";
        }
        
        toast.error(errorMessage);
    }
}

const login = async (email, password)=>{
    try {
        await signInWithEmailAndPassword(auth, email, password);
        toast.success("Logged in successfully!");
    } catch (error) {
        console.log(error);
        let errorMessage = "An error occurred during login";
        
        switch(error.code) {
            case 'auth/user-not-found':
                errorMessage = "No account found with this email. Please check your email or sign up.";
                break;
            case 'auth/wrong-password':
                errorMessage = "Incorrect password. Please try again.";
                break;
            case 'auth/invalid-email':
                errorMessage = "Please enter a valid email address.";
                break;
            case 'auth/too-many-requests':
                errorMessage = "Too many failed attempts. Please try again later.";
                break;
            default:
                errorMessage = error.message || "An error occurred during login";
        }
        
        toast.error(errorMessage);
    }
    }

    const logout = ()=>{
        signOut(auth);
    }

    export {auth, db, login, logout, signup};