import { AddtoCardContext } from "../../contexts/AddtoCardContext.js";
import { useLanguage } from "../../contexts/LanguageContext.js";
import { useContext, useState } from "react";
import "./CheckoutPage.scss";
import visaPic from "../../assets/visa.png";
import masterCardPic from "../../assets/mastercard.png";
import googlePayPic from "../../assets/google_pay.png";
import sofortPic from "../../assets/sofort.png";
import paypalPic from "../../assets/paypal.png";
import skrillPic from "../../assets/skrill.png";
import paySafeCardPic from "../../assets/paysafe.png";
import amexPic from "../../assets/amex.png";
import jcbPic from "../../assets/jcb.png";
import googlePic from "../../assets/7123025_logo_google_g_icon.png";

const CheckoutPage = () => {
  const { cart, removeFromCart } = useContext(AddtoCardContext);
  const { language } = useLanguage();
  const [paymentMethod, setPaymentMethod] = useState("");
  const [showModalVisa, setShowModalVisa] = useState("");

  const handleCheckboxChange = (method) => {
    // Updated to accept 'method' parameter
    setPaymentMethod((prevMethod) => (prevMethod === method ? "" : method)); // Set the selected payment method
    setShowModalVisa(method);
    console.log(showModalVisa);
  };

  const btnStyleSwitch = () => {
    switch (paymentMethod) {
      case "Paypal":
        return "paypal-btn";
      case "Google Pay":
        return "google-pay-btn";

      default:
        return "btn";
    }
  };

  const btnTextSwitch = () => {
    switch (paymentMethod) {
      case "Paypal":
        return language === "en" ? (
          <span>
            Pay with{" "}
            <span
              style={{
                fontStyle: "italic",
                fontWeight: "bold",
                fontSize: "1.2rem",
              }}>
              PayPal
            </span>
          </span>
        ) : (
          <span>
            {" "}
            Mit{" "}
            <span
              style={{
                fontStyle: "italic",
                fontWeight: "bold",
                fontSize: "1.2rem",
              }}>
              PayPal
            </span>{" "}
            bezahlen
          </span>
        );
      case "Google Pay":
        return language === "en" ? (
          <div className="google-pay-btn-text">
            <img src={googlePic} alt="google pay logo" />
            <p>Pay</p>
          </div>
        ) : (
          <div className="google-pay-btn-text">
            <img src={googlePic} alt="google pay logo" />
            <p>Pay </p>
          </div>
        );

      default:
        return "Proceed to Payment";
    }
  };

  return (
    <div className="checkout-wrapper">
      <div className="checkout-left-wrapper">
        <h2>{language === "en" ? "Your Order" : "Deine Bestellung"}</h2>
        <div className="cart-items">
          {cart.map((item, index) => {
            const discountedPrice = (item.price * (100 - item.discount)) / 100;
            return (
              <div key={item._id} className="cart-item">
                <img src={item.thumbnail} alt={item.title} />
                <div className="cart-item-info">
                  <div className="cart-info-left">
                    <h4>{item.title}</h4>
                    <p
                      className="cart-remove-item"
                      onClick={() => removeFromCart(index)}>
                      {language === "en" ? "Remove" : "Entfernen"}
                    </p>
                  </div>
                  <div className="cart-info-right">
                    <p className="price">{item.price}€</p>
                    <p>{discountedPrice.toFixed(2)} €</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="cart-info-totalprice">
          <p>
            {language === "en"
              ? "All prices include VAT if applicable."
              : "Alle Preise inkl. MwSt. ggf. zzgl. Versandkosten"}
          </p>
          <p>{language === "en" ? "Order Total:" : "Gesamtbestellwert: "}</p>
          <p>
            {cart
              .reduce(
                (acc, item) => acc + (item.price * (100 - item.discount)) / 100,
                0
              )
              .toFixed(2)}
            €
          </p>
        </div>
        <small className="checkout-discount-total">
          {language === "en"
            ? `You save € ${cart
                .reduce(
                  (acc, item) =>
                    acc +
                    item.price -
                    (item.price * (100 - item.discount)) / 100,
                  0
                )
                .toFixed(2)} (${(
                (cart.reduce(
                  (acc, item) =>
                    acc +
                    (item.price - (item.price * (100 - item.discount)) / 100),
                  0
                ) /
                  cart.reduce((acc, item) => acc + item.price, 0)) *
                100
              ).toFixed(0)}%)`
            : `Du sparst € ${cart
                .reduce(
                  (acc, item) =>
                    acc +
                    item.price -
                    (item.price * (100 - item.discount)) / 100,
                  0
                )
                .toFixed(2)} (${(
                (cart.reduce(
                  (acc, item) =>
                    acc +
                    (item.price - (item.price * (100 - item.discount)) / 100),
                  0
                ) /
                  cart.reduce((acc, item) => acc + item.price, 0)) *
                100
              ).toFixed(0)}%)`}
        </small>
      </div>
      <div className="checkout-right-wrapper">
        <h2>
          {language === "en"
            ? "Your Payment & Gifting Details"
            : "Deine Zahlungs- und Geschenkdetails"}
        </h2>
        <div className="checkout-right-first-wrapper">
          <div className="checkout-right-first">
            <ul className="checkout-right-first-list">
              <li>
                <label className="square-checkbox">
                  <input
                    type="checkbox"
                    onChange={() => handleCheckboxChange}
                  />
                  <span className="checkmark"></span>
                  <i className="bi bi-wallet2"></i>
                  {language === "en"
                    ? " Use wallet Funds (Balance: € 0.00)"
                    : " Verwenden Sie Geldbörsenmittel (Guthaben: € 0,00)"}
                </label>
              </li>
            </ul>
          </div>
          <div>
            <small>
              {language === "en"
                ? "Purchase more Wallet funds & learn more >>"
                : "Kaufen Sie mehr Geldbörsenmittel und erfahren Sie mehr >>"}
            </small>
          </div>
        </div>
        <div className="checkout-right-secound-wrapper">
          <ul className="checkout-right-secound-list">
            <li>
              <label className="circular-checkbox">
                <input
                  type="checkbox"
                  onChange={() => handleCheckboxChange("VISA")}
                  checked={paymentMethod === "VISA"}
                />
                <span className="checkmark"></span>
                <img src={visaPic} alt="visa logo" />
                <img src={masterCardPic} alt="mastercard logo" />
                <img src={amexPic} alt="amex logo" />
                <img src={jcbPic} alt="jcb Logo" />
                {language === "en"
                  ? " Credit/Debit Card"
                  : " Kredit-/Debitkarte"}
              </label>
            </li>
            {showModalVisa === "VISA" && (
              <div className="checkout-visa-wrapper">
                <label>
                  <input type="text" placeholder="Card Number" />
                </label>
                <label>
                  <input type="text" placeholder="Name on Card" />
                </label>
                <label>
                  <input type="text" placeholder="Expiry Date" />
                </label>
              </div>
            )}

            <li>
              <label className="circular-checkbox">
                <input
                  type="checkbox"
                  onChange={() => handleCheckboxChange("Google Pay")}
                  checked={paymentMethod === "Google Pay"}
                />
                <span className="checkmark"></span>
                <img src={googlePayPic} alt="google pay logo" />
                {language === "en" ? "Google Pay" : "Google Pay"}
              </label>
            </li>
            <li>
              <label className="circular-checkbox">
                <input
                  type="checkbox"
                  onChange={() => handleCheckboxChange("Sofort")}
                  checked={paymentMethod === "Sofort"}
                />
                <span className="checkmark"></span>
                <img src={sofortPic} alt="sofort logo" />
                {language === "en" ? "Sofort" : "Sofort"}{" "}
              </label>{" "}
            </li>
            <li>
              <label className="circular-checkbox">
                <input
                  type="checkbox"
                  onChange={() => handleCheckboxChange("Paypal")}
                  checked={paymentMethod === "Paypal"}
                />
                <span className="checkmark"></span>
                <img src={paypalPic} alt="paypal logo" />
                {language === "en" ? "PayPal" : "PayPal"}{" "}
              </label>{" "}
            </li>
            <li>
              <label className="circular-checkbox">
                <input
                  type="checkbox"
                  onChange={() => handleCheckboxChange("Skrill")}
                  checked={paymentMethod === "Skrill"}
                />
                <span className="checkmark"></span>
                <img src={skrillPic} alt=" skrill log" />
                {language === "en" ? "Skrill" : "Skrill"}{" "}
              </label>{" "}
            </li>
            <li>
              <label className="circular-checkbox">
                <input
                  type="checkbox"
                  onChange={() => handleCheckboxChange("PaySafeCard")}
                  checked={paymentMethod === "PaySafeCard"}
                />
                <span className="checkmark"></span>
                <img src={paySafeCardPic} alt="paysafecard logo" />
                {language === "en" ? "Paysafecard" : "Paysafecard"}{" "}
              </label>{" "}
            </li>
          </ul>
        </div>
        <div className="checkout-right-third-wrapper">
          <ul className="checkout-right-thrid-list">
            <li>
              <label className="square-checkbox">
                <input type="checkbox" onChange={() => handleCheckboxChange} />
                <span className="checkmark"></span>

                {language === "en"
                  ? "Gift this order"
                  : "Diese Bestellung verschenken"}
              </label>{" "}
            </li>
          </ul>
        </div>
        <div className="checkout-right-forth-wrapper">
          <p>
            €{" "}
            {cart
              .reduce(
                (acc, item) => acc + (item.price * (100 - item.discount)) / 100,
                0
              )
              .toFixed(2)}
          </p>
          <button className={btnStyleSwitch()}>{btnTextSwitch()}</button>
        </div>
        {!paymentMethod && (
          <div className="checkout-right-fifth-wrappper">
            <p>
              {language === "en"
                ? "Please select a payment method."
                : "Bitte wählen Sie eine Zahlungsmethode."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;
