import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, arrayUnion, updateDoc, doc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyA04xwMkBzKA7EX9Pz7luvXIP-HB7K90T8",
    authDomain: "book-search-3080.firebaseapp.com",
    projectId: "book-search-3080",
    storageBucket: "book-search-3080.appspot.com",
    messagingSenderId: "760797940951",
    appId: "1:760797940951:web:91e5ec65b7ec62347cb492"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function getSearch() {
    const searchCol = collection(db, 'search');
    const searchSnapshot = await getDocs(searchCol);
    let obj = {}
    searchSnapshot.docs.forEach((e) => {
        obj = { ...obj, [e.id]: e.data() }
    })
    return obj;
}

export async function setSearch(query, uid) {
    // Create our initial doc
    const data = await getSearch()
    if (Object.keys(data).includes(uid)) {
        const ref = doc(db, "search", `${uid}`);
        await updateDoc(ref, {
            searchQuery: arrayUnion(query)
        })
    } else {
        // Add a new document in collection "search"
        await setDoc(doc(db, "search", `${uid}`), {
            searchQuery: arrayUnion(query)
        });
    }
}

