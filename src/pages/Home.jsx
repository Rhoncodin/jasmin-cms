import React from 'react';
import Layout from '../components/Layout';
import HomeImage from '../assets/home-image.jpeg';
import Satin from '../assets/Satin.jpeg';
import Asahi from '../assets/Asahi.jpeg';
import Benang from '../assets/Benang.jpeg';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <Layout>
      <div>
        <section>
          <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
              <div className="relative h-64 overflow-hidden rounded-lg sm:h-80 lg:order-last lg:h-full">
                <img
                  alt="homeimage"
                  src={HomeImage}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>

              <div className="lg:py-24">
                <h2 className="text-3xl font-bold sm:text-4xl">
                  Introducing The New Gate to Clothing
                </h2>

                <p className="mt-4 text-gray-600">
                  Step into a world where fashion meets innovation. The New Gate
                  to Clothing is your premier destination for cutting-edge
                  styles, sustainable fabrics, and unparalleled quality. Whether
                  you're searching for the latest trends or timeless
                  classNameics, our curated collections promise to elevate your
                  wardrobe. Join us as we open the gates to a new era of
                  fashion, where every piece is designed with passion and
                  crafted with precision. Welcome to a revolution in clothing.
                  Welcome to The New Gate.
                </p>

                <Link to="/product">
                  <div className="mt-8 inline-block rounded bg-indigo-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-yellow-400">
                    Explore Now
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
            <header className="text-center">
              <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">
                New Collection
              </h2>

              <p className="mx-auto mt-4 max-w-md text-gray-500">
                Discover the latest in fashion with our New Collection. This
                season, we're bringing you an exquisite array of styles that
                blend contemporary trends with timeless elegance. From chic
                everyday wear to statement pieces for special occasions, our
                collection is designed to make you look and feel your best.
                Explore fresh silhouettes, vibrant colors, and luxurious
                fabrics, all crafted with meticulous attention to detail.
                Elevate your wardrobe and embrace the new with our stunning New
                Collection.
              </p>
            </header>

            <ul className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-3">
              <li>
                <div className="group relative block">
                  <img
                    src={Satin}
                    alt="satin"
                    className="aspect-square w-full object-cover transition duration-500 group-hover:opacity-90"
                  />

                  <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
                    <h3 className="text-xl font-medium text-white">Satin</h3>
                  </div>
                </div>
              </li>

              <li>
                <div className="group relative block">
                  <img
                    src={Asahi}
                    alt="asahi"
                    className="aspect-square w-full object-cover transition duration-500 group-hover:opacity-90"
                  />

                  <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
                    <h3 className="text-xl font-medium text-white">Asahi</h3>
                  </div>
                </div>
              </li>

              <li className="lg:col-span-2 lg:col-start-2 lg:row-span-2 lg:row-start-1">
                <div className="group relative block">
                  <img
                    src={Benang}
                    alt="benang"
                    className="aspect-square w-full object-cover transition duration-500 group-hover:opacity-90"
                  />

                  <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
                    <h3 className="text-xl font-medium text-white">Benang</h3>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Home;
