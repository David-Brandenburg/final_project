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
import { toast } from "react-toastify";
import { LogginContext } from "../../contexts/LogginContext.js";

const CheckoutPage = () => {
  const { cart, removeFromCart, clearCart } = useContext(AddtoCardContext);
  const { language } = useLanguage();
  const [paymentMethod, setPaymentMethod] = useState("");
  const [showModal, setShowModal] = useState("");
  const [showGiftModal, setShowGiftModal] = useState(false);
  const { loggedInUser } = useContext(LogginContext);
  const URL = process.env.REACT_APP_URL_BACKEND;

  const handleCheckboxChange = (method) => {
    // Updated to accept 'method' parameter
    setPaymentMethod((prevMethod) => (prevMethod === method ? "" : method)); // Set the selected payment method
    setShowModal(method);
    console.log(showModal);
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
        return language === "en"
          ? "Pay for your order now"
          : "Bestellung jetzt bezahlen";
    }
  };

  const handleGiftCheckbox = () => {
    setShowGiftModal((prev) => !prev);
  };

  const submitPay = async () => {
    const cartTitles = cart.map((item) => item.title);
    console.log(cartTitles);
    const url = `${URL}/accounts/updateMyGames/${loggedInUser.id}`;
    try {
      const resp = await fetch(url, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ gameTitles: cartTitles }),
      });
      if (!resp.ok) {
        const data = await resp.json();
        toast.error(data.message);
        throw new Error("Something went wrong!");
      } else {
        const data = await resp.json();
        toast.success(data.message);
        clearCart();
      }
    } catch (e) {
      console.error(e);
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
                    disabled
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
            {showModal === "VISA" && (
              <div className="checkout-visa-wrapper">
                <label>
                  {language === "en" ? "Card number" : "Kartennummer"}
                </label>
                <input type="text" placeholder="1234 5678 9012 3456" disabled />
                <label>{language === "en" ? "CVC / CVV" : "CVC / CVV"}</label>
                <input
                  type="text"
                  placeholder={language === "en" ? "3 digit" : "3 Stellen"}
                  disabled
                />
                <label>
                  {language === "en" ? "Expiry Date" : "Ablaufdatum"}
                </label>
                <input type="text" placeholder="MM/JJ" disabled />
                <li>
                  <label className="square-checkbox">
                    <input
                      type="checkbox"
                      onChange={() => handleCheckboxChange}
                      disabled
                    />
                    <span className="checkmark"></span>

                    {language === "en"
                      ? "Save for future payments"
                      : "Für zukünftige Zahlungen speichern"}
                  </label>{" "}
                </li>
                <p>
                  {language === "en"
                    ? "A secure, encrypted payment token will be created once your bank approves the purchase. We do not store your card details directly in our database."
                    : "Ein sicherer, verschlüsselter Token wird erzeugt, sobald deine Bank die Zahlung genehmigt hat. Wir speichern deine Zahlungsdaten nicht direkt in unserer Datenbank."}
                </p>
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
            {showModal === "Sofort" && (
              <div className="checkout-sofort-wrapper">
                <p>
                  {language === "en"
                    ? "After clicking 'Pay for your order now', you will be redirected to the Sofort page to finish your transaction"
                    : "Sobald du auf „Bestellung jetzt bezahlen“ klickst, wirst du auf die Webseite von Sofort weitergeleitet, um den Zahlungsvorgang abzuschließen."}{" "}
                </p>
              </div>
            )}
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
            {showModal === "Paypal" && (
              <div className="checkout-paypal-wrapper">
                <li>
                  <label className="square-checkbox">
                    <input
                      type="checkbox"
                      onChange={() => handleCheckboxChange}
                      disabled
                    />
                    <span className="checkmark"></span>

                    {language === "en"
                      ? "Save my details for future purchases"
                      : "Meine Daten für zukünftige Käufe speichern"}
                  </label>{" "}
                </li>
              </div>
            )}
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
            {showModal === "Skrill" && (
              <div className="checkout-skrill-wrapper">
                <p>
                  {language === "en"
                    ? "After clicking 'Pay for your order now', you will be redirected to the Skrill page to finish your transaction"
                    : "Sobald du auf „Bestellung jetzt bezahlen“ klickst, wirst du auf die Webseite von Skrill weitergeleitet, um den Zahlungsvorgang abzuschließen."}{" "}
                </p>
              </div>
            )}
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
            {showModal === "PaySafeCard" && (
              <div className="checkout-paysafecard-wrapper">
                <p>
                  {language === "en"
                    ? "After clicking 'Pay for your order now', you will be redirected to the PaySafeCard page to finish your transaction"
                    : "Sobald du auf „Bestellung jetzt bezahlen“ klickst, wirst du auf die Webseite von paysafecard weitergeleitet, um den Zahlungsvorgang abzuschließen."}{" "}
                </p>
                <small>
                  {language === "en"
                    ? "Please note that we charge in EUR, and, if a currency exchange is required, Paysafecard will charge an additional fee."
                    : "Beachte bitte, dass wir in EUR abrechnen. Falls eine Währungsumwandlung erforderlich ist, berechnet paysafecard eine zusätzliche Gebühr."}
                </small>
              </div>
            )}
          </ul>
        </div>
        <div className="checkout-right-third-wrapper">
          <ul className="checkout-right-thrid-list">
            <li>
              <label className="square-checkbox">
                <input type="checkbox" onChange={handleGiftCheckbox} disabled />
                <span className="checkmark"></span>

                {language === "en"
                  ? "Gift this order"
                  : "Diese Bestellung verschenken"}
              </label>{" "}
            </li>
            {showGiftModal && (
              <div className="checkout-gift-wrapper">
                <input
                  type="email"
                  placeholder={
                    language === "en"
                      ? "Gift recipient's email"
                      : "E-Mail-Adresse des Empfängers"
                  }
                  disabled
                />
                <input
                  type="text"
                  placeholder={
                    language === "en"
                      ? "Personal note to gift recipient (optional)"
                      : "Persönliche Nachricht an den Empfänger (optional"
                  }
                  disabled
                />{" "}
              </div>
            )}
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
          <button
            className={btnStyleSwitch()}
            onClick={submitPay}
            disabled={!paymentMethod}>
            {btnTextSwitch()}
          </button>
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
        <div className="checkout-right-wrapper-disclaimer">
          <h5>
            {language === "en"
              ? "Disclaimer: This website is for demonstration purposes only. No monetary transactions will be made. If you choose to click the payment button and select a payment method, the fake game will be added to your games library. You will receive an email thanking you for participating in our demo project! Nothing more, nothing lesse!"
              : "Haftungsausschluss: Diese Website dient ausschließlich zu Demonstrationszwecken. Es finden keine Geldtransaktionen statt. Wenn Sie auf die Zahlungsschaltfläche klicken und eine Zahlungsmethode auswählen, wird das fiktive Spiel Ihrer Spielebibliothek hinzugefügt. Sie erhalten eine E-Mail, in der wir Ihnen für Ihre Teilnahme an unserem Demo-Projekt danken! Nicht mehr, nicht weniger!"}
          </h5>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
