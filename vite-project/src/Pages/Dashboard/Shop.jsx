import React, { useEffect, useState } from 'react';
import "../Dashboard/Dashboard.css"
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { updateProfile } from '../../action/User';
import { BookService, createServices } from '../../action/Service';

import { GoogleMap, LoadScript, Autocomplete, Marker } from "@react-google-maps/api";
import Loader from '../../Components/Loader/Loader';

const libraries = ["places"]; // Include the required libraries
const Dashboard = ({ allservices }) => {
  const dispatch = useDispatch();

  const [error, setError] = useState(null);
  const { loading, error: serviceerror, service } = useSelector((state) => state.service);
  const [newService, setNewService] = useState({ servicename: '', description: '', price: '' });
  const [autoComplete, setAutoComplete] = useState(null);
  const [currentLocation, setCurrentLocation] = useState("");
  const [location, setLocation] = useState({
    lat: 40.748817, // Default to New York City
    lng: -73.985428,
  });

  const handlePlaceChanged = () => {
    if (autoComplete) {
      const place = autoComplete.getPlace();
      if (place.geometry) {
        const { lat, lng } = place.geometry.location;
        setLocation({ lat: lat(), lng: lng() });
        setCurrentLocation(place.formatted_address || { Lat: `${lat()}`, Lng: `${lng()}` });
      }
    }
  };

  const handleLiveLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lng: longitude });
          setCurrentLocation({ Lat: `${latitude}`, Lng: `${longitude}` });
        },
        (error) => {
          console.error("Error getting location:", error);
          const errorMessages = {
            1: "Permission denied. Please enable location services in your browser.",
            2: "Location information is unavailable. Please try again later.",
            3: "The request to get the user's location timed out. Please try again.",
          };
          alert(errorMessages[error.code] || "An unknown error occurred.");
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const { user } = useSelector((state) => state.user);

  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    const Reader = new FileReader();
    Reader.readAsDataURL(file);

    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setImage(Reader.result);
      }
    };
  };

  // Ensure allservices is an array and handle it accordingly
  const top10Services = (Array.isArray(allservices) ? allservices : [])
    .sort((a, b) => a.distance - b.distance)
    .slice(0, 3);

  // Handle form submission to create a new service
  const navigate = useNavigate();
  const handleCreateService = async (e) => {
    e.preventDefault();
    await dispatch(updateProfile(location));
    await dispatch(createServices(newService.servicename, newService.description, newService.price, image, user, location));
    window.location.reload();
    navigate("/AllServices");
  };

  // Reset form when service is created
  useEffect(() => {
    if (service) {
      setNewService({ servicename: "", description: "", price: "" });
      alert(service);
    }
  }, [service]);

  return loading ? (
    <Loader />
  ) : (
    <div>
      <section className="bg-blue-600 py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-white font-bold text-5xl leading-tight mb-6">Discover All The Services</h1>
              <p className="text-white text-xl mb-8">Services which are nearby you, find them for your help.</p>
              <Link to="/AllServices" className="px-6 py-3 bg-white text-blue-600 font-bold rounded-full hover:bg-blue-700 transition duration-200">See services</Link>
            </div>
            <div className="md:w-1/2">
              <img src="https://plus.unsplash.com/premium_photo-1675716443562-b771d72a3da7" alt="Coffee beans" className="w-full rounded-lg shadow-lg"/>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Featured services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {top10Services.length > 0 ? (
              <>
                {top10Services.map((service, index) => (
                  <div className="bg-white rounded-lg shadow-md overflow-hidden" key={index}>
                    <img src={service.images[0].url} alt="Service" className="w-full h-64 object-cover"/>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-800 mb-2">{service.serviceName}</h3>
                      <p className="text-gray-700 text-base">{service.description}</p>
                      <div className="mt-4 flex items-center justify-between">
                        <button
                          className="px-4 py-2 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 transition duration-200"
                          onClick={() => dispatch(BookService(service._id))}
                        >
                          Book Service
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <p>No services available at the moment.</p>
            )}
          </div>
        </div>
      </section>

      {!user && (
        <div className="dashboard-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* Additional content for non-users can be added here */}
        </div>
      )}

      <section className="create-service-section bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Create a New Service</h2>

        <div className="text-center mb-8">
          <button
            onClick={handleLiveLocation}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg font-medium"
          >
            Get My Location
          </button>
          {location && (
            <div className="mt-4 text-gray-700">
              <p>Latitude: {location.lat}</p>
              <p>Longitude: {location.lng}</p>
              <div className="mt-6">
                <LoadScript googleMapsApiKey={import.meta.env.MAP_APIKEY} libraries={libraries}>
                  <GoogleMap
                    mapContainerStyle={{ height: "400px", width: "100%" }}
                    center={location}
                    zoom={15}
                    mapId="243e410cc66a7e84"
                    onClick={(e) => {
                      const lat = e.latLng.lat();
                      const lng = e.latLng.lng();
                      setLocation({ lat, lng });
                    }}
                  >
                    <Autocomplete
                      onLoad={(autocomplete) => setAutoComplete(autocomplete)}
                      onPlaceChanged={handlePlaceChanged}
                    >
                      <input
                        type="text"
                        placeholder="Search for a location"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </Autocomplete>
                    <Marker
                      position={location}
                      draggable
                      onDragEnd={(e) => {
                        const lat = e.latLng.lat();
                        const lng = e.latLng.lng();
                        setLocation({ lat, lng });
                      }}
                    />
                  </GoogleMap>
                </LoadScript>
                <input
                  type="text"
                  value={currentLocation}
                  readOnly
                  placeholder="Selected location will appear here"
                  className="w-full px-4 py-2 mt-4 border border-gray-300 rounded-lg focus:outline-none"
                />
              </div>
            </div>
          )}
          {error && <p className="text-red-500 mt-4">{error}</p>}
        </div>

        <form className="space-y-6" onSubmit={handleCreateService}>
          <div>
            <input
              type="text"
              name="serviceName"
              id="serviceName"
              placeholder="Service Name"
              value={newService.servicename}
              onChange={(e) => setNewService({ ...newService, servicename: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <textarea
              name="description"
              id="description"
              placeholder="Service Description"
              value={newService.description}
              onChange={(e) => setNewService({ ...newService, description: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <input
              type="number"
              name="price"
              id="price"
              placeholder="Price"
              value={newService.price}
              onChange={(e) => setNewService({ ...newService, price: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <input type="file" onChange={handleImageChange} />
            {image && <img src={image} alt="Preview" className="mt-4 max-h-40" />}
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Create Service
          </button>
        </form>
      </section>
    </div>
  );
};

export default Dashboard;
