import { useEffect, useState } from "react";
import api from "../../api";
import ProductList from "./ProductList";
import Loader from "../Loader";
import ErrorMessage from "../ErrorMessage";
//add pagination
import PaginationControls from "./PaginationControls";

const ProductPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [products, setProducts] = useState([]);
  //add
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    // We use AbortController (https://developer.mozilla.org/en-US/docs/Web/API/AbortController)
    // to clean up so that we don’t introduce a memory leak
    // (https://reactjs.org/docs/hooks-effect.html#effects-with-cleanup)
    const abortController = new AbortController();

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(false);

        const data = await api.getProducts(currentPage, 10);

        if (!abortController.signal.aborted) {
          setProducts(data.products);
          setTotalPages(data.totalPages);
        }
      } catch (error) {
        if (!abortController.signal.aborted) {
          setError(true);
        }
      } finally {
        if (!abortController.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => abortController.abort();
  }, [currentPage, totalPages]);

  return (
    <main className="main-layout section-padding">
      {loading && <Loader />}
      {error && <ErrorMessage message="Error fetching products" />}

      <PaginationControls
        onPrev={() => {
          if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
          }
        }}
        onNext={() => {
          if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
          }
        }}
        currentPage={currentPage}
        totalPages={totalPages}
      />

      <ProductList products={products} className="main-content" />
    </main>
  );
};

export default ProductPage;
