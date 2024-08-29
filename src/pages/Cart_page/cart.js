import plus from "../../images/plus.png";
import minus from "../../images/minus.png";
import styles from "../../components/Home_page/home.module.css";
import cartStyles from "./cart.module.css";
import { useDispatch, useSelector } from "react-redux";
import { userState } from "../../Reducers/userReducer";
import {
  setInitialStateOfCart,
  removeItemFromDatabse,
  setItemCountInDatabase,
} from "../../Reducers/cartReducer";
import { addOrderToDbAsync } from "../../Reducers/orderReducer";
import { cartState } from "../../Reducers/cartReducer";
import { useEffect } from "react";
export function CartPage() {
  const dispatch = useDispatch();
  const state = useSelector(userState);
  const { cart } = useSelector(cartState);
  console.log("cart");
  console.log(cart);
  useEffect(() => {
    if (state.login) {
      dispatch(setInitialStateOfCart(state.user_id));
    }
  }, []);
  function shortenTitle(title, maxlength) {
    if (title.length <= maxlength) {
      return title;
    }
    return title.slice(0, maxlength) + "...";
  }
  return (
    <>
      <div className={styles.outer_cont}>
        {cart.length === 0 ? (
          <h1>CART IS EMPTY.....</h1>
        ) : (
          <div className={styles.card_cont}>
            {cart.map((item, index) => {
              return (
                <>
                  <div key={item.id} className={styles.card}>
                    <img className={styles.imgdiv} src={item.image} alt="img" />

                    <div className={styles.details}>
                      <h4>{shortenTitle(item.title, 30)}</h4>
                    </div>
                    <div className={cartStyles.price_cont}>
                      <div className={cartStyles.price}>
                        <h1>$ {item.price * item.itemCount}</h1>
                      </div>

                      <div className={cartStyles.image}>
                        <img
                          onClick={() =>
                            dispatch(
                              setItemCountInDatabase({
                                action: "add",
                                item_id: item.id,
                                userid: state.user_id,
                              })
                            )
                          }
                          src={plus}
                        />
                        <h4>{item.itemCount}</h4>
                        <img
                          onClick={() =>
                            dispatch(
                              setItemCountInDatabase({
                                action: "sub",
                                item_id: item.id,
                                userid: state.user_id,
                              })
                            )
                          }
                          src={minus}
                        />
                      </div>
                    </div>
                    <div className={cartStyles.btn_cont}>
                      <button
                        onClick={() =>
                          dispatch(
                            addOrderToDbAsync({
                              item,
                              total_price: item.price * item.itemCount,
                              userid: state.user_id,
                            })
                          )
                        }
                        className={`${cartStyles.purchase} ${cartStyles.btn}`}
                      >
                        Purchase
                      </button>
                      <button
                        onClick={() =>
                          dispatch(
                            removeItemFromDatabse({
                              product_id: item.id,
                              userid: state.user_id,
                            })
                          )
                        }
                        className={` ${cartStyles.remove} ${cartStyles.btn}`}
                      >
                        Remove From Cart
                      </button>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
