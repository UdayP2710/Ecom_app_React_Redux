import Styles from "./orders.module.css";
import { orderState } from "../../Reducers/orderReducer";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { InitialStateOfOrderList } from "../../Reducers/orderReducer";
import { userState } from "../../Reducers/userReducer";
export function OrdersPage() {
  const { order } = useSelector(orderState);
  const state = useSelector(userState);
  const dispatch = useDispatch();
  useEffect(() => {
    if (state.login) {
      dispatch(InitialStateOfOrderList({ id: state.user_id }));
    }
  }, []);
  function shortenTitle(title, maxlength) {
    if (title.length <= maxlength) {
      return title; // If the title is shorter than maxLength, return it as is
    }
    return title.slice(0, maxlength) + "...";
  }
  return (
    <>
      <div className={Styles.table_cont}>
        {order.length === 0 ? (
          <h1>NO ORDER IS PLACED YET.....</h1>
        ) : (
          <>
            <div>
              <h1>Your Orders</h1>
            </div>
            <div className={Styles.table_box}>
              <table className={Styles.table}>
                <thead>
                  <tr className={Styles.thead}>
                    <th>Order_Id</th>
                    <th>Title</th>
                    <th>Quantity</th>
                    <th>Date</th>
                    <th>Total Price</th>
                  </tr>
                </thead>
                <tbody className={Styles.table_body}>
                  {order.map((item, index) => {
                    return (
                      <>
                        {" "}
                        <tr key={index}>
                          <td>{item.id}</td>
                          <td>{shortenTitle(item.title, 22)}</td>
                          <td>{item.itemCount}</td>
                          <td>{item.Order_on}</td>
                          <td>{item.total_price}</td>
                        </tr>
                      </>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </>
  );
}
