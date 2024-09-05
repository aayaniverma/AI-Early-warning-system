import React, { useState, useRef, useEffect } from "react";

function LoginModal({ closeModal, onLogin }) {
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("+1");
  const [location, setLocation] = useState("");
  const [isFetchingLocation, setIsFetchingLocation] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const modalRef = useRef(null);

  const handleLogin = async (e) => {
    e.preventDefault();

    const phoneNumber = `${countryCode}${phone}`;
    const formData = {
      phone: phoneNumber,
      location,
    };

    const formDataJson = JSON.stringify(formData);

    try {
      if (!isLoggedIn) {
        // Send form data to server when logging in
        const response = await fetch('http://localhost:5000/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: formDataJson,
        });

        const data = await response.json();

        if (response.ok) {
          setMessage(data.message);
          setIsLoggedIn(true);
          onLogin(formData); // Notify parent component
          localStorage.setItem('userFormData', formDataJson); // Store data in local storage
          closeModal();
        } else {
          setMessage(`Error: ${data.message}`);
        }
      } else {
        // Handle sign-out
        setIsLoggedIn(false);
        setMessage("You have been signed out.");
        localStorage.removeItem('userFormData'); // Clear stored data
        closeModal();
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred. Please try again.');
    }
  };

  const fetchLocation = () => {
    setIsFetchingLocation(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation(`Lat: ${latitude}, Lon: ${longitude}`);
          setIsFetchingLocation(false);
        },
        (error) => {
          console.error("Error fetching location:", error);
          setIsFetchingLocation(false);
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
      setIsFetchingLocation(false);
    }
  };

  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      closeModal();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const modalWrapperStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    zIndex: 1000,
  };

  const modalContentStyle = {
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    padding: '2rem',
    borderRadius: '10px',
    maxWidth: '500px',
    width: '100%',
    boxShadow: '0 10px 15px rgba(255, 255, 255, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    color: '#fff',
    textAlign: 'center',
  };

  const inputStyle = {
    width: '100%',
    padding: '0.75rem',
    border: '1px solid #fff',
    borderRadius: '8px',
    marginBottom: '1rem',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    color: '#fff',
  };

  const buttonStyle = {
    padding: '0.75rem 1.5rem',
    borderRadius: '8px',
    fontSize: '1rem',
    cursor: 'pointer',
    color: '#000',
    backgroundColor: '#fff',
  };

  const cancelButtonStyle = {
    ...buttonStyle,
    marginRight: '1rem',
  };

  const fetchLocationBtnStyle = {
    ...buttonStyle,
    backgroundColor: '#fff',
    marginTop: '0.5rem',
    border: 'none',
  };

  const fetchLocationBtnDisabledStyle = {
    ...fetchLocationBtnStyle,
    backgroundColor: 'gray',
    cursor: 'not-allowed',
  };

  return (
    <div style={modalWrapperStyle}>
      <div style={modalContentStyle} ref={modalRef}>
        <h2>{isLoggedIn ? 'Sign Out' : 'Login/Register'}</h2>
        <form onSubmit={handleLogin}>
          {!isLoggedIn && (
            <>
              <div>
                <label>Phone Number</label>
                <div style={{ display: 'flex', marginBottom: '1rem' }}>
                  <select
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                    style={{
                      padding: '0.75rem',
                      border: '1px solid #fff',
                      borderRadius: '8px',
                      marginBottom: '1rem',
                      backgroundColor: '#000',
                      color: '#fff',
                      width: '100%',
                    }}
                  >
                    <option value="+1">+1 (US)</option>
                    <option value="+44">+44 (UK)</option>
                    <option value="+91">+91 (India)</option>
                    <option value="+61">+61 (Australia)</option>
                    <option value="+81">+81 (Japan)</option>
                    {/* Add more country codes as needed */}
                  </select>
                  <input
                    type="tel"
                    style={{ ...inputStyle, marginLeft: '0.5rem' }}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Phone number"
                    required
                  />
                </div>
              </div>

              <div>
                <label>Location</label>
                <input
                  type="text"
                  style={inputStyle}
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                  placeholder="Enter location manually or use location fetcher"
                />
                <button
                  type="button"
                  style={isFetchingLocation ? fetchLocationBtnDisabledStyle : fetchLocationBtnStyle}
                  onClick={fetchLocation}
                  disabled={isFetchingLocation}
                >
                  {isFetchingLocation ? "Fetching..." : "Use My Location"}
                </button>
              </div>
            </>
          )}

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1.5rem' }}>
            <button
              type="button"
              style={cancelButtonStyle}
              onClick={closeModal}
            >
              Cancel
            </button>
            <button type="submit" style={buttonStyle}>
              {isLoggedIn ? 'Sign Out' : 'Submit'}
            </button>
          </div>
        </form>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
}

export default LoginModal;
