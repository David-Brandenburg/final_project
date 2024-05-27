import { NavLink } from "react-router-dom";
import { ModalContext } from "../../contexts/ModalContext";
import { useContext } from "react";

const CartModal = () => {
  const { setOpenModalBlocker, setOpenCart } = useContext(ModalContext);

  const handleBeliebteTitel = (e) => {
    e.stopPropagation();
    setOpenModalBlocker(false);
    setOpenCart(false);
  };
  return (
    <div className="cart-modal" onClick={(e) => e.stopPropagation()}>
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
  );
};

export default CartModal;
