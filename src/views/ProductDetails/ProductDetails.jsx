/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { buyProduct, getProduct } from "../../services/ProductsService";

const Message = ({ message }) => (
  <section>
    <p>{message}</p>
  </section>
);

const ProductDetails = () => {
  const { id } = useParams();
  const [ product, setProduct ] = useState(null);
  const [ isLoading, setIsLoading ] = useState(true);
  const [ message, setMessage ] = useState("");
  
  useEffect(() => {
    getProduct(id)
      .then((product) => {
        setProduct(product);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });

    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      setMessage("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      setMessage(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }
  }, [id]);

  const handleCheckout = async () => {
    buyProduct(product)
      .then((session) => {
        window.location.href = session.url;
      })
      .catch((error) => {
        console.error(error);
        setMessage("Something went wrong 😭");
      });
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!product) {
    return <p>Product not found 🥺</p>;
  }

  const { name, description, imageUrl, price } = product;

  return message ? (
    <Message message={message} />
  ) : (
    <div>
      <img src={imageUrl} alt={name} width="200" />
      <h1>{name}</h1>
      <p>{description}</p>
      <p>{price} €</p>

      <button className="btn btn-primary" onClick={handleCheckout}>
        Checkout
      </button>
    </div>
  );
}

export default ProductDetails;
