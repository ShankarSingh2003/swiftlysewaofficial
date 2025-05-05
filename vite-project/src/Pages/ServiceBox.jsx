import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { BookService } from '../action/Service';

const ServiceBox = ({ service, index }) => {
  const dispatch = useDispatch();
  console.log(service._id);

  return (
    <div
      className="relative overflow-hidden bg-gray-900 pt-16 pb-32 space-y-24"
      data-aos="zoom-in-down"
      key={index}
    >
      <div className="relative">
        <div className="lg:mx-auto lg:grid lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-2 lg:gap-24 lg:px-8">
          <div className="mx-auto max-w-xl px-6 lg:mx-0 lg:max-w-none lg:py-16 lg:px-0">
            <div>
              <div className="mt-6">
                <h2 className="text-3xl font-bold tracking-tight text-white">
                  {service.serviceName}:
                </h2>
                <p className="mt-4 text-lg text-gray-300">{service.description}</p>
                <p className="mt-4 text-lg text-gray-300">{service.user.name}</p>
                <p className="mt-4 text-lg text-gray-300">{service.user.phone}</p>
                <p className="mt-4 text-lg text-gray-300">{service.price}</p>
                <div className="mt-6 flex gap-5">
                  <button
                    className="inline-flex rounded-lg bg-pink-600 px-4 py-1.5 text-base font-semibold leading-7 text-white shadow-sm ring-1 ring-pink-600 hover:bg-pink-700 hover:ring-pink-700"
                    onClick={() => dispatch(BookService(service._id))}
                  >
                    Book Services
                  </button>
                  <Link
                    to={`/profile/${service.user}`}
                    className="inline-flex rounded-lg bg-pink-600 px-4 py-1.5 text-base font-semibold leading-7 text-white shadow-sm ring-1 ring-pink-600 hover:bg-pink-700 hover:ring-pink-700"
                  >
                    Profile
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-12 sm:mt-16 lg:mt-0">
            <div className="-mr-48 pl-6 md:-mr-16 lg:relative lg:m-0 lg:h-full lg:px-0  items-center grid grid-cols-1 md:grid-cols-3 gap-8">
              <img
                loading="lazy"
                height={200}
                width={400}
                className="w-full rounded-xl shadow-2xl ring-1 ring-black ring-opacity-5 lg:absolute lg:left-0 lg:max-w-none sm:w-16 sm:h-24 md:w-32 md:h-32 lg:w-96 lg:h-auto" // Added responsive classes
                style={{
                  width: '65%',
                  height: '300px',
                  objectFit: 'cover',
                  objectPosition: 'center',
                }}
                src={service.images[0].url}
                alt={service.serviceName}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceBox;
