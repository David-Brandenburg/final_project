import { NavLink } from "react-router-dom";
import { ModalContext } from "../../contexts/ModalContext";
import { AddtoCardContext } from "../../contexts/AddtoCardContext";
import { LogginContext } from "../../contexts/LogginContext";
import { useContext, useState, useEffect } from "react";

const CartModal = () => {
  const { cart, removeFromCart } = useContext(AddtoCardContext);
  const { setOpenModalBlocker, setOpenCart, setOpenLoginModal } =
    useContext(ModalContext);
  const { isLoggedIn } = useContext(LogginContext);
  const [totalDiscountedPrice, setTotalDiscountedPrice] = useState(0);

  const handleBeliebteTitel = (e) => {
    e.stopPropagation();
    setOpenModalBlocker(false);
    setOpenCart(false);
  };
  // console.log(cart);

  useEffect(() => {
    let totalPrice = 0;
    cart.forEach((item) => {
      const discountedPrice = (item.price * (100 - item.discount)) / 100;
      totalPrice += discountedPrice;
    });
    setTotalDiscountedPrice(totalPrice.toFixed(2));
  }, [cart]);

  const handleZurKasse = () => {
    setOpenModalBlocker(false);
    setOpenCart(false);
  };

  const handleLoginModal = () => {
    setOpenModalBlocker(false);
    setOpenCart(false);
    setOpenLoginModal(true); // Öffne das Login-Modal
  };

  return (
    <>
      {cart.length > 0 && (
        <div className="cart-modal" onClick={(e) => e.stopPropagation()}>
          <div className="cart-upper-wrapper">
            <div className="cart-artikel-title">
              <h3>Dein Einkaufwagen</h3>
              <p>{cart.length} Artikel hinzugefügt</p>
            </div>
            <div className="cart-artikel-price-btn">
              <p>{totalDiscountedPrice} €</p>
              {isLoggedIn ? (
                <NavLink
                  to="/cart"
                  onClick={handleZurKasse}
                  className="btn"
                  title="navlink">
                  Zur Kasse
                </NavLink>
              ) : (
                <button
                  onClick={handleLoginModal}
                  className="btn"
                  title="login">
                  Zur Kasse
                </button>
              )}
            </div>
          </div>
          <hr className="trennung" />
          <div className="cart-items">
            {cart.map((item, index) => {
              const discountedPrice =
                (item.price * (100 - item.discount)) / 100;
              return (
                <div key={item._id} className="cart-item">
                  <img src={item.thumbnail} alt={item.title} />
                  <div className="cart-item-info">
                    <div className="cart-info-left">
                      <h4>{item.title}</h4>
                      <p
                        className="cart-remove-item"
                        onClick={() => removeFromCart(index)}>
                        Entfernen
                      </p>
                    </div>
                    <div className="cart-info-right">
                      <p className="discount">- {item.discount}%</p>
                      <p>{discountedPrice.toFixed(2)} €</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {!cart.length > 0 && (
        <div className="cart-modal-empty" onClick={(e) => e.stopPropagation()}>
          <i className="bi bi-cart4"></i>
          <h3>Dein Warenkorb ist leer!</h3>
          <hr className="trennung" />
          <h3>Finde tolle Spiele und Angebote</h3>
          <NavLink
            to="/games"
            onClick={handleBeliebteTitel}
            className="btn"
            title="navlink">
            Beliebte Titel
          </NavLink>
        </div>
      )}
    </>
  );
};

export default CartModal;
