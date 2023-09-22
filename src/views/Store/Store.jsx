import { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard/ProductCard";
import { getProductList } from "../../services/ProductsService";

const Store = () => {
  const [ products, setProducts ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(true);

  useEffect(() => {
    getProductList()
      .then((products) => {
        setProducts(products);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!products.length) {
    return <p>No products found 🥺</p>;
  }

  return (
      <div className="Store">
          <h1>Store</h1>

          <div className="row">
            {products.map((product) => (
              <div className="col-sm-6 col-md-4 col-lg-3 mb-4" key={product._id}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
      </div>
  );
}

export default Store;
