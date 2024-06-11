import React, { useEffect, useState } from 'react';

import Layout from '../components/Layout';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';

const Product = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const token = Cookies.get('token');

  const decoded = token && jwtDecode(token);

  const isAdmin = decoded?.user_type == 1;

  const [productData, setProductData] = useState([]);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await fetch(`${API_URL}products`, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();

        if (response.ok) {
          setProductData(data?.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getProduct();
  }, []);

  const handleDelete = async (id) => {
    const confirmResult = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete',
    });

    if (confirmResult.isConfirmed) {
      try {
        const response = await fetch(`${API_URL}products/${id}`, {
          method: 'DELETE',
        });

        const data = await response.json();

        if (response.ok) {
          Swal.fire({
            title: 'Product deleted sucessfully',
            text: '',
            icon: 'success',
          });
          setProductData((prevProductData) =>
            prevProductData.filter((product) => product.id !== id)
          );
        } else {
          Swal.fire({
            title: 'Failed to delete product',
            text: data?.message,
            icon: 'error',
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <Layout>
      <div>
        <section>
          <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
            <header className="text-center">
              <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">
                Product Collection
              </h2>

              <p className="mx-auto mt-4 max-w-md text-gray-500">
                Produk elit dan berkualitas. BUKAN KALENG-KALENG !!
              </p>

              {isAdmin && (
                <div className="flex">
                  <Link to="/add-product">
                    <button className="px-3 py-2 bg-gray-500 rounded-md text-white">
                      Add product
                    </button>
                  </Link>
                </div>
              )}
            </header>

            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {productData?.length > 0
                ? productData.map((productDatas, index) => (
                    <li key={productDatas?.id} className="">
                      <div className="group block overflow-hidden">
                        <img
                          src={`${API_URL}${productDatas?.image}`}
                          alt=""
                          className="h-[350px] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[450px]"
                          loading="lazy"
                        />

                        <div className="relative bg-white pt-3">
                          <h3 className="text-xs text-gray-700 group-hover:underline group-hover:underline-offset-4">
                            {productDatas?.name}
                          </h3>

                          <p className="mt-2">
                            <span className="sr-only"> Regular Price </span>

                            <span className="tracking-wider text-gray-900">
                              {' '}
                              IDR {productDatas?.price?.toLocaleString('id-ID')}
                              /{productDatas?.unit}{' '}
                            </span>
                          </p>

                          <div
                            className={`flex flex-row gap-1 absolute bottom-0 right-0 ${
                              isAdmin ? 'block' : 'hidden'
                            }`}
                          >
                            <Link to="/edit-product" state={productDatas}>
                              <button className="px-3 py-1 bg-gray-500 rounded-md text-white">
                                Edit
                              </button>
                            </Link>

                            <div>
                              <button
                                className="px-3 py-1 bg-red-800 rounded-md text-white"
                                onClick={() => {
                                  handleDelete(productDatas?.id);
                                }}
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))
                : null}
            </ul>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Product;
