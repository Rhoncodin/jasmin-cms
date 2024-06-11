import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { FaUserCircle } from 'react-icons/fa';

const Navbar = () => {
  const userData = Cookies.get('user');
  let username = '';

  if (userData) {
    const { firstname, lastname } = JSON.parse(userData);
    username = `${firstname} ${lastname}`;
  }

  const navigate = useNavigate();
  const token = Cookies.get('token');

  const page = [
    {
      no: 1,
      name: 'Home',
      link: '/home',
      access: true,
    },
    {
      no: 2,
      name: 'Product',
      link: '/product',
      access: true,
    },

    {
      no: 3,
      name: 'Login',
      link: '/login',
      access: !token,
    },
  ];

  const handleLogout = () => {
    Cookies.remove('user');
    Cookies.remove('token');
    navigate('/home');
  };
  return (
    <nav className="bg-gray-50">
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="text-center sm:text-left">
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              Toko Jasmin
            </h1>

            <p className="mt-1.5 text-sm text-gray-500">
              Belanja kebutuhan tekstilmu !
            </p>

            {token && (
              <div className="flex justify-center items-center gap-1 sm:justify-start">
                <FaUserCircle />
                <p className="capitalize">{username}</p>
              </div>
            )}
          </div>

          <div className="mt-4 flex flex-col items-center gap-4 sm:mt-0 sm:flex-row sm:items-center">
            <div className="flex gap-6" aria-label="Tabs">
              {page.map((pages, index) => (
                <NavLink
                  to={pages?.link}
                  className={`nav-link shrink-0 rounded-lg p-2 text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-700 ${
                    pages?.access ? 'block' : 'hidden'
                  }`}
                  key={pages?.no}
                >
                  {pages?.name}
                </NavLink>
              ))}

              {token && (
                <div
                  className={
                    'nav-link shrink-0 rounded-lg p-2 text-sm font-medium cursor-pointer text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                  }
                  onClick={handleLogout}
                >
                  Logout
                </div>
              )}

              {/* <a
                href="product.html"
                className="shrink-0 rounded-lg p-2 text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-700"
              >
                Product
              </a>

              <a
                href="index.html"
                className="shrink-0 rounded-lg bg-gray-100 p-2 text-sm font-medium text-gray-700"
                aria-current="page"
              >
                Sign In
              </a> */}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
