import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Swal from 'sweetalert2';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaImage } from 'react-icons/fa';

const validationSchema = yup
  .object({
    name: yup.string().required('Product name is required'),
    price: yup.string().required('Price is required'),
    unit: yup.string().required('Unit is required'),
    // image: yup.mixed().required('Image is required'),
  })
  .required();

const EditProduct = () => {
  const API_URL = import.meta.env.VITE_API_URL;

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [unit, setUnit] = useState('');
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const navigate = useNavigate();

  const location = useLocation();
  const state = location.state;
  const {
    id: productId,
    name: productName,
    price: productPrice,
    unit: productUnit,
    image: productImage,
  } = state;

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    setValue,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleSubmitForm = async () => {
    const formData = new FormData();
    formData.append('id', productId);
    formData.append('name', name);
    formData.append('price', price);
    formData.append('unit', unit);
    formData.append('image', image);

    try {
      const response = await fetch(`${API_URL}products`, {
        method: 'PUT',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        Swal.fire({
          title: 'Product updated sucessfully',
          text: '',
          icon: 'success',
        }).then((result) => {
          if (result.isConfirmed) {
            navigate('/product');
          }
        });
      } else {
        Swal.fire({
          title: 'Failed to update product',
          text: data?.message,
          icon: 'error',
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (state) {
      setValue('name', productName);
      setValue('price', productPrice);
      setValue('unit', productUnit);

      setName(productName);
      setPrice(productPrice);
      setUnit(productUnit);
      setPreviewImage(productImage);
    }
  }, [state]);

  return (
    <Layout>
      <div className="flex flex-col justify-center items-center p-5">
        <div className="">
          <h1 className="font-bold text-xl">Edit product</h1>
        </div>

        <div className="w-full max-w-3xl">
          <form onSubmit={handleSubmit(handleSubmitForm)}>
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <label htmlFor="name" className="text-gray-900 font-medium">
                  Product name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  {...register('name')}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-0"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />

                {errors?.name?.message && (
                  <span className="text-xs font-medium text-red-500">
                    {errors?.name?.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col sm:flex-row w-full sm:gap-3">
                <div className="flex flex-col gap-1 w-full">
                  <label htmlFor="price" className="text-gray-900 font-medium">
                    Price
                  </label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    {...register('price')}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-0"
                    value={price}
                    onChange={(e) => {
                      setPrice(e.target.value);
                    }}
                  />

                  {errors?.price?.message && (
                    <span className="text-xs font-medium text-red-500">
                      {errors?.price?.message}
                    </span>
                  )}
                </div>
                <div className="flex flex-col gap-1 w-full">
                  <label htmlFor="unit" className="text-gray-900 font-medium">
                    Unit
                  </label>
                  <input
                    type="text"
                    id="unit"
                    name="unit"
                    {...register('unit')}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-0"
                    value={unit}
                    onChange={(e) => {
                      setUnit(e.target.value);
                    }}
                  />

                  {errors?.unit?.message && (
                    <span className="text-xs font-medium text-red-500">
                      {errors?.unit?.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <label htmlFor="image" className="text-gray-900 font-medium">
                  Upload image
                </label>
                {previewImage || image ? (
                  <div>
                    <img
                      src={
                        image
                          ? URL.createObjectURL(image)
                          : `${API_URL}${previewImage}`
                      }
                      className="w-full sm:w-80 max-h-52 rounded-md object-cover"
                    />
                  </div>
                ) : (
                  <div>
                    <div className="w-full flex justify-center bg-gray-100 items-center sm:w-80 max-h-52 h-32 rounded-md object-cover">
                      <FaImage className="text-5xl" />
                    </div>
                  </div>
                )}
                <input
                  type="file"
                  id="image"
                  name="image"
                  {...register('image')}
                  onChange={handleImageChange}
                  className="w-full  border border-gray-300 rounded-md file:rounded-l-md file:border-0 file:py-2 file:px-3 file:cursor-pointer cursor-pointer"
                />
              </div>

              {errors?.image?.message && (
                <span className="text-xs font-medium text-red-500">
                  {errors?.image?.message}
                </span>
              )}
            </div>

            <div className="flex justify-end gap-3 mt-5">
              <button
                type="submit"
                className="px-3 py-2 bg-gray-500 rounded-md text-white"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default EditProduct;
