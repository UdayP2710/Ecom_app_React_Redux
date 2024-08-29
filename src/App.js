import "./App.css";
import { Navbar } from "./components/Navbar/navbar.js";
import { LoginPage } from "./pages/Login_page/login.js";
import { RegisterPage } from "./pages/Register_page/register.js";
import { HomePage } from "./components/Home_page/home.js";
import { CartPage } from "./pages/Cart_page/cart.js";
import { OrdersPage } from "./pages/Orders_page/orders.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { store } from "./store.js";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const routetoappend = createBrowserRouter([
    {
      path: "",
      element: <Navbar />,
      children: [
        { index: true, element: <HomePage /> },
        { path: "login", element: <LoginPage /> },
        {
          path: "register",
          element: <RegisterPage />,
        },
        { path: "cart", element: <CartPage /> },
        { path: "orders", element: <OrdersPage /> },
      ],
    },
  ]);
  return (
    <div className="App">
      <Provider store={store}>
        <ToastContainer />
        <RouterProvider router={routetoappend} />
      </Provider>
    </div>
  );
}

export default App;
