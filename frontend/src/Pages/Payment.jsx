import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import logo11 from "../Images/logo11.png";

const UpiPage = () => {
  const [copyButtonText, setCopyButtonText] = useState("Copy");
  const [popupVisible, setPopupVisible] = useState(false);
  const [tid, settid] = useState('');
  const [user, setUser] = useState({
    User_id: "",
    name: "",
  });
  
  const [isOpen, setIsOpen] = useState(false);
  const [postImage, setpostImage] = useState('');

  const handleImageChange = async (e) => {
    const file = e.target.files[0]; 
    if (file) {
      const base64 = await convertImageToBase64(file);
      setpostImage({ myfile: base64, User_id: user.User_id });
    }
  };

  const convertImageToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result.replace('data:', '').replace(/^.+,/, '');
        resolve(base64String);
      };      
      reader.readAsDataURL(file);
    });
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userData = localStorage.getItem("user");
        if (userData) {
          const response = JSON.parse(userData);
          setUser(response);
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, []);

  const handleCopyClick = () => {
    const textToCopy = document.getElementById("upi-id").textContent;
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopyButtonText("Copied!");
      setTimeout(() => {
        setCopyButtonText("Copy");
      }, 2500);
    });
  };

  const handleProceedClick = () => {
    setPopupVisible(!popupVisible);
  };

  const handleSubmitClick = async () => {
    if (!postImage.myfile || !tid) {
      alert('Please upload the details');
    } else {
      try {
        const res = await axios.post(
          "https://matrimony-v2-0.onrender.com/uploadPaymentImage",
          { User_id: user.User_id, tid: tid, image: postImage.myfile }
        );
        alert(res.data.msg);
        setPopupVisible(false);
      } catch (error) {
        console.error("Error uploading image:", error);
        alert("Error uploading image");
      }
    }
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-300 via-amber-100 to-amber-300 bg-blend-overlay flex flex-col items-center justify-center pb-10 overflow-x-hidden relative z-10">
      <nav
        className="fixed top-0 left-0 right-0 flex flex-col md:flex-row justify-between items-center px-4 py-2 shadow-md w-full z-30"
        style={{ backgroundColor: "rgb(245, 193, 124)" }}
      >
        <div className="flex items-center w-full md:w-auto">
          <Link to="/" className="text-2xl font-bold flex items-center">
            <img src={logo11} className="w-20 h-auto mr-2" alt="Logo" />
          </Link>
          <button
            className="md:hidden ml-auto text-white focus:outline-none"
            onClick={toggleMenu}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>

        {/* Desktop menu */}
        <div className="hidden md:flex md:items-center md:space-x-10 mr-10">
          <Link to="/matrimony" className="text-white m-2 font-bold px-3 py-2 hover:bg-white hover:text-black hover:rounded-md hover:shadow-md transition-all">
            Home
          </Link>
          <Link to="/profile" className="text-white m-2 font-bold px-3 py-2 hover:bg-white hover:text-black hover:rounded-md hover:shadow-md transition-all">
            Profile
          </Link>
        </div>

        {/* Mobile menu */}
        <div className={`mobile-menu ${isOpen ? "block" : "hidden"} absolute top-full right-0 mt-2 bg-white shadow-lg rounded-lg w-48 z-40`}>
          {['Profile', 'Donate', 'Login'].map((link) => (
            <Link
              key={link}
              to={`/${link.toLowerCase()}`}
              className="block px-4 py-2 text-sm hover:bg-gray-200 transition duration-300"
            >
              {link}
            </Link>
          ))}
        </div>
      </nav>

      <div className={`bg-white p-6 rounded-lg shadow-lg w-full max-w-md text-center relative z-10 mt-6 md:mt-6`}>
        <div className="mb-4">
          <img
            src="https://media.istockphoto.com/id/1347277582/vector/qr-code-sample-for-smartphone-scanning-on-white-background.jpg?s=612x612&w=0&k=20&c=6e6Xqb1Wne79bJsWpyyNuWfkrUgNhXR4_UYj3i_poc0="
            alt="UPI QR Code"
            className="w-full h-auto rounded-lg"
          />
        </div>
        <p className="mb-2">Scan the QR code or use the UPI ID:</p>
        <div className="flex flex-col items-center">
          <strong id="upi-id" className="text-blue-600 mb-2">
            upi@id
          </strong>
          <button
            id="copy-button"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={handleCopyClick}
          >
            {copyButtonText}
          </button>
        </div>
        <button
          id="proceed-button"
          className="mt-4 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
          onClick={handleProceedClick}
        >
          Proceed
        </button>
      </div>

      {popupVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md text-center">
            <h2 className="text-xl font-semibold mb-4">Payment Confirmation</h2>
            <div className="mt-4">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="border border-gray-300 rounded-lg p-2"
              />
            </div>
            <input
              placeholder="Enter transaction ID"
              type="text"
              value={tid}
              onChange={(e) => settid(e.target.value)}
              required
              className="mb-4 border border-gray-300 rounded-lg p-2"
            />
            <p className="mb-4">
              Thanks for donating to us!
            </p>
            <button
              id="submit-button"
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
              onClick={handleSubmitClick}
            >
              Submit
            </button>
            <button
              className="mt-2 bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700"
              onClick={() => setPopupVisible(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpiPage;
