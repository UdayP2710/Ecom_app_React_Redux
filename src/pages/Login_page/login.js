import { Link, useNavigate } from "react-router-dom";
import styles from "./login.module.css";
import { useRef } from "react";
import { toast } from "react-toastify";
// import { useLoginContext } from "../../Reducers/userReducer.js";
import { useDispatch, useSelector } from "react-redux";
import { checkLogin } from "../../Reducers/userReducer.js";
import { setInitialStateOfCart } from "../../Reducers/cartReducer.js";
import { userState } from "../../Reducers/userReducer.js";

// import { loginCheckInDataBase } from "./logincheckdb.js";
export function LoginPage() {
  const email = useRef();
  const password = useRef();
  const navigate = useNavigate();
  const state = useSelector(userState);
  const dispatch = useDispatch();

  async function handelLogin(e) {
    e.preventDefault();
    const userdetails = {
      email: email.current.value,
      password: password.current.value,
    };
    dispatch(checkLogin(userdetails));
    navigate("/");
    // if (state.login) {
    //   console.log("login");
    //   navigate("/");
    //   dispatch(setInitialStateOfCart(state.user_id));
    //   toast.success("Login Successfull....");
    //   return;
    // }
    // toast.error("Invalid Credentials....");
    // return;
  }
  return (
    <>
      <div className={styles.outer_cont}>
        <form onSubmit={handelLogin} className={styles.login_cont}>
          <div className={styles.input_cont}>
            <h1>Login</h1>
            <input ref={email} type="text" placeholder="Email...." />

            <input ref={password} type="text" placeholder="Password...." />
            <div className={styles.btn_cont}>
              <button>Submit</button>
            </div>
          </div>
        </form>
        <div>
          <Link to={"/register"}>
            <h2>Register. If Not....</h2>
          </Link>
        </div>
      </div>
    </>
  );
}
