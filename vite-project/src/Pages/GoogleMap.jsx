import React, { useState } from "react";
import { GoogleMap, LoadScript, Autocomplete, Marker } from "@react-google-maps/api";

const libraries = ["places"]; // Include the required libraries

const LocationSelector = () => {
  const [autoComplete, setAutoComplete] = useState(null);
  const [currentLocation, setCurrentLocation] = useState("");
  const [location, setLocation] = useState({
    lat: 40.748817, // Default to New York City
    lng: -73.985428,
  });

  // Handle geolocation to set the user's live location
  const handleLiveLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lng: longitude });
          setCurrentLocation({Lat: `${latitude}`, Lng: `${longitude}`});
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

  // Handle place selection using Google Maps Autocomplete
  const handlePlaceChanged = () => {
    if (autoComplete) {
      const place = autoComplete.getPlace();
      if (place.geometry) {
        const { lat, lng } = place.geometry.location;
        setLocation({ lat: lat(), lng: lng() });
        setCurrentLocation(place.formatted_address ||{ Lat: `${lat()}`, Lng: `${lng()}`});
      }
    }
  };

  return (
    <>
     <div className="location-section">
      <label>Select Your Location:</label>
      <button
        onClick={handleLiveLocation}
        style={{
          marginBottom: "10px",
          padding: "10px 20px",
          backgroundColor: "#007BFF",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Use My Current Location
      </button>
      <LoadScript
        googleMapsApiKey= 'AIzaSyDCfhcWkoqtbsROjQo0WfnJwuxi-DDwR0Q' // Use environment variable
        libraries={libraries}
      >
        <GoogleMap
          mapContainerStyle={{ height: "400px", width: "100%" }}
          center={location}
          zoom={15}
          mapId="243e410cc66a7e84"
          onClick={(e) => {
            const lat = e.latLng.lat();
            const lng = e.latLng.lng();
            setLocation({ lat, lng });
            setCurrentLocation({Lat: `${lat}`, Lng: `${lng}`});
          }}
        >
          <Autocomplete
            onLoad={(autocomplete) => setAutoComplete(autocomplete)}
            onPlaceChanged={handlePlaceChanged}
          >
            <input
              type="text"
              placeholder="Search for a location"
              style={{
                width: "300px",
                height: "40px",
                padding: "10px",
                marginBottom: "10px",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            />
          </Autocomplete>
          <Marker
            position={location}
            draggable
            onDragEnd={(e) => {
              const lat = e.latLng.lat();
              const lng = e.latLng.lng();
              setLocation({ lat, lng });
              setCurrentLocation({Lat: `${lat}`, Lng:` ${lng}`});
            }}
          />
        </GoogleMap>
      </LoadScript>
      <input
        type="text"
        value={currentLocation}
        readOnly
        placeholder="Selected location will appear here"
        style={{
          width: "100%",
          height: "40px",
          marginTop: "10px",
          padding: "10px",
          borderRadius: "5px",
          border: "1px solid #ccc",
        }}
      />
    </div>
    </>
   
  );
};

export default LocationSelector;