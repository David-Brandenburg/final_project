import { useContext } from "react";
import { AddtoCardContext } from "../contexts/AddtoCardContext";

const AddToCartBtn = ({ game, className, text }) => {
  const { addToCart } = useContext(AddtoCardContext);

  const handleAddToCart = (game) => {
    addToCart(game);
  };

  return (
    <div className={className} onClick={((e) => {handleAddToCart(game); e.preventDefault()})}>
      {text}
    </div>
  );
};

export default AddToCartBtn;
