import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { toast } from "react-toastify";
import {
  collection,
  getDocs,
  query,
  where,
  addDoc,
  onSnapshot,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

import { db } from "./firebase";
//..............FUNCTION TO CHECK LOGIN CREDENTIALS OF USER.............................//
export async function loginCheckInDataBase({ email, password }) {
  const auth = getAuth();
  let userDocId = null;
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));

    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      // Assuming there's only one document per user UID
      const userDoc = querySnapshot.docs[0];
      userDocId = userDoc.id;
    }
    console.log(userDocId);
    toast.success("Login successfully.....");
    return { user, userDocId };
  } catch (err) {
    toast.error("Invalid Credentials....");
    console.log(err);
    return;
  }
}

//..................FUNCTION TO REGISTER USER...........................//

export async function registerUser(data) {
  const auth = getAuth();

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      data.email,
      data.password
    );

    const user = userCredential.user;

    // Optionally, add additional user data to Firestore
    const doc = await addDoc(collection(db, "users"), {
      uid: user.uid,
      name: data.name,
      email: user.email,
    });
    toast.success("Registerd Successfully.....");

    return { user, docid: doc.id };
  } catch (error) {
    toast.error("Invalid credentials.....please check yor email and password");
    console.error("Error registering user:", error);
    throw error; // Rethrow error to handle it in the calling function
  }
}
//...................ADD CART ITEM TO THE DATABASE.............................//

//.......function to fetch data from databse.........//
export async function updateCart({ id, dispatch, cartAction }) {
  const coll_ref = collection(db, "users", id, "cart");
  console.log("updateCart");
  const unsub = onSnapshot(coll_ref, (snap) => {
    const data = snap.docs.map((item) => {
      return { ...item.data(), id: item.id };
    });
    dispatch(cartAction.setInitialState(data));
  });
}
export async function handelAddToCart(payload) {
  const coll_ref = collection(db, "users", payload.id, "cart");
  const doc_ref = await addDoc(coll_ref, { ...payload.product, itemCount: 1 });
  toast.success("Item Added to Cart.....");
  return;
}
//......Remove item from database function........//
export async function removeItemFromCart(payload) {
  const doc_ref = doc(db, "users", payload.userid, "cart", payload.product_id);
  await deleteDoc(doc_ref);
  toast.warn("Item Removed Successfully.....");
}
//............................................................//

export async function setItemCountDB({ action, item_id, userid }) {
  const doc_ref = doc(db, "users", userid, "cart", item_id);
  const docdata = await getDoc(doc_ref);
  const current_count = docdata.data().itemCount;
  if (action === "add") {
    await updateDoc(doc_ref, { itemCount: current_count + 1 });
  } else {
    if (current_count > 1) {
      await updateDoc(doc_ref, { itemCount: current_count - 1 });
    }
  }
  return;
}

//..............................UPDATE ORDER PLACED BY USER INTO THE DATABASE...................//

export async function updateOrderState(payload) {
  const coll_ref = collection(db, "users", payload.id, "orders");
  const unsub = onSnapshot(coll_ref, (snap) => {
    const allorders = snap.docs.map((item) => {
      return { ...item.data(), id: item.id };
    });

    payload.dispatch(payload.setInitialState(allorders));
  });
}
export async function addOrderToDatabase(payload) {
  const coll_ref = collection(db, "users", payload.userid, "orders");
  const doc_ref = await addDoc(coll_ref, {
    ...payload.item,
    total_price: payload.total_price,
    Order_on: new Date().toDateString(),
  });
  toast.success("Order placed.....");
  return;
}
