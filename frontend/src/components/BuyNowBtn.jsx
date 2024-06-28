import { useContext } from "react";
import { AddtoCardContext } from "../contexts/AddtoCardContext";
import { NavLink } from "react-router-dom";

const BuyNowBtn = ({ game, className, text, title }) => {
  const { addToCart } = useContext(AddtoCardContext);

  const handleAddToCart = (game) => {
    addToCart(game);
  };

  return (
    <NavLink to='/checkout' title={title} className={className} onClick={((e) => {handleAddToCart(game);})}>
      {text}
    </NavLink>
  );
};

export default BuyNowBtn;
