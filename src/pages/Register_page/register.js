import styles from "./register.module.css";

import { useRef } from "react";
import { useDispatch } from "react-redux";
import { registringUser } from "../../Reducers/userReducer";

import { useNavigate } from "react-router";
import "react-toastify/dist/ReactToastify.css";
export function RegisterPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const name = useRef();
  const email = useRef();
  const password = useRef();
  async function handelSubmit(e) {
    e.preventDefault();
    const user = {
      name: name.current.value,
      email: email.current.value,
      password: password.current.value,
    };
    name.current.value = "";
    email.current.value = "";
    password.current.value = "";

    dispatch(registringUser(user));
    navigate("/");
  }
  return (
    <>
      <div className={styles.outer_cont}>
        <form onSubmit={handelSubmit} className={styles.login_cont}>
          <div className={styles.input_cont}>
            <h1>Register</h1>
            <input ref={name} type="text" placeholder="Name...." />
            <input ref={email} type="text" placeholder="Email...." />
            <input ref={password} type="text" placeholder="Password...." />
            <div className={styles.btn_cont}>
              <button>Submit</button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
