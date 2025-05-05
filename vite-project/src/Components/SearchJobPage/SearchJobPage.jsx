import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SearchedServicesByLocation } from "../../action/Service";
import ServiceBox from "../../Pages/ServiceBox";
import { GoogleMap, LoadScript, Autocomplete, Marker } from "@react-google-maps/api";

const libraries = ["places"];

const SearchJobPage = () => {
  const [autoComplete, setAutoComplete] = useState(null);
  const [currentLocation, setCurrentLocation] = useState("");
  const [location, setLocation] = useState({ lat: 40.748817, lng: -73.985428 }); // Default: NYC
  const [serviceName, setServiceName] = useState("");
  const [range, setRange] = useState(0);

  const dispatch = useDispatch();
  const { services, loading, error } = useSelector((state) => state.SearchServicesByLocation);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(SearchedServicesByLocation(serviceName, location, range));
  };

  const handlePlaceChanged = () => {
    if (autoComplete) {
      const place = autoComplete.getPlace();
      if (place.geometry) {
        const { lat, lng } = place.geometry.location;
        setLocation({ lat: lat(), lng: lng() });
        setCurrentLocation(place.formatted_address || `Lat: ${lat()}, Lng: ${lng()}`);
      }
    }
  };

  const handleLiveLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lng: longitude });
          setCurrentLocation(`Lat: ${latitude}, Lng: ${longitude}`);
        },
        (error) => {
          const errorMessages = {
            1: "Permission denied. Enable location services in your browser.",
            2: "Location information is unavailable. Try again later.",
            3: "Request timed out. Please try again.",
          };
          alert(errorMessages[error.code] || "An unknown error occurred.");
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <h1 className="text-3xl font-bold mb-6">Didn't find the services you were looking for?</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <input
              type="text"
              placeholder="Search Job Near You"
              className="flex-1 px-4 py-2 border rounded-md outline-none"
              value={serviceName}
              onChange={(e) => setServiceName(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={handleLiveLocation}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Get My Location
            </button>
          </div>
{location.lat}
          <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY} libraries={libraries}>
            <GoogleMap
              mapContainerStyle={{ height: "400px", width: "100%" }}
              center={location}
              zoom={14}
              onClick={(e) => {
                const lat = e.latLng.lat();
                const lng = e.latLng.lng();
                setLocation({ lat, lng });
                setCurrentLocation(`Lat: ${lat}, Lng: ${lng}`);
              }}
            >
              <Autocomplete onLoad={setAutoComplete} onPlaceChanged={handlePlaceChanged}>
                <input
                  type="text"
                  placeholder="Search for a location"
                  className="w-full p-2 border rounded-md mb-4"
                />
              </Autocomplete>
              <Marker
                position={location}
                draggable
                onDragEnd={(e) => {
                  const lat = e.latLng.lat();
                  const lng = e.latLng.lng();
                  setLocation({ lat, lng });
                  setCurrentLocation(`Lat: ${lat}, Lng: ${lng}`);
                }}
              />
            </GoogleMap>
          </LoadScript>

          <div className="mt-6">
            <label htmlFor="price-range" className="block text-lg font-medium text-gray-700 mb-2">
              Price Range ({range} Km)
            </label>
            <input
              type="range"
              id="price-range"
              className="w-full accent-indigo-600"
              min="0"
              max="6000"
              value={range}
              onChange={(e) => setRange(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition"
          >
            Search
          </button>
        </form>
      </div>

      <div className="mt-10">
        {loading ? (
          <p className="text-center text-gray-500">Loading services...</p>
        ) : error ? (
          <p className="text-center text-red-500">Error: {error}</p>
        ) : services && services.length > 0 ? (
          <div className="flex ">
            {services.map((service, index) => (
              <ServiceBox key={index} service={service} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No services found near you.</p>
        )}
      </div>
    </div>
  );
};

export default SearchJobPage;
