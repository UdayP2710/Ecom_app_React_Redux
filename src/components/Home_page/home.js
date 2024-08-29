import { useEffect, useState } from "react";
import styles from "./home.module.css";
import { useSelector, useDispatch } from "react-redux";
import { userState } from "../../Reducers/userReducer";
import { useNavigate } from "react-router";
import { addCartItemToDatabse } from "../../Reducers/cartReducer";
export function HomePage() {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const state = useSelector(userState);
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await fetch("https://fakestoreapi.com/products/");
        const productsarr = await data.json();
        console.log(productsarr);
        setProducts([...productsarr]);
      } catch (err) {}
    }
    fetchProducts();
  }, []);
  function shortenTitle(title, maxlength) {
    if (title.length <= maxlength) {
      return title; // If the title is shorter than maxLength, return it as is
    }
    return title.slice(0, maxlength) + "...";
  }
  return (
    <>
      <div className={styles.outer_cont}>
        <div className={styles.card_cont}>
          {products.map((product, index) => {
            return (
              <>
                <div key={product.id} className={styles.card}>
                  <img
                    className={styles.imgdiv}
                    src={product.image}
                    alt="img"
                  />

                  <div className={styles.details}>
                    <h4>{shortenTitle(product.title, 30)}</h4>
                  </div>
                  <div className={styles.price}>
                    <h1>$ {product.price}</h1>
                  </div>

                  <button
                    onClick={() => {
                      state.login
                        ? dispatch(
                            addCartItemToDatabse({ product, id: state.user_id })
                          )
                        : navigate("login");
                    }}
                    className={styles.btn}
                  >
                    Add To Cart
                  </button>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}
