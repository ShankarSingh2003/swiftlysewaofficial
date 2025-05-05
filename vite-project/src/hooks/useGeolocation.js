import { useState } from "react";


function useGeolocation() {
  const [location, setLocation] =useState();
  const [error, setError] = useState(null);

  const getLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
        setError(null); // Clear any previous error
      },
      (error) => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setError("User denied the request for Geolocation.");
            break;
          case error.POSITION_UNAVAILABLE:
            setError("Location information is unavailable.");
            break;
          case error.TIMEOUT:
            setError("The request to get user location timed out.");
            break;
          default:
            setError("An unknown error occurred.");
            break;
        }
      }
    );
  };

  return { location, error, getLocation };
}

export default useGeolocation;
