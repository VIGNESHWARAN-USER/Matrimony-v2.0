import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  // State for user details
  const [user, setUser] = useState({
    User_id: '',
    name: '',
    email: '',
    mother_tongue: '',
    marital_status: '',
    dob: '',
    gender: '',
    highest_degree: '',
    employed_in: '',
    annual_income: '',
    express_yourself: '',
    family_type: '',
    father_occupation: '',
    mother_occupation: '',
    brother: '',
    sister: '',
    family_living_location: '',
    contact_address: '',
    about_family: '',
    status: '',
    image: '',
    option_val: '',
    refer: '',
    donor: ''
  });

  const navigate = useNavigate();

  // State to manage editing modes
  const [isEditing, setIsEditing] = useState(false);
  const [isEditing1, setIsEditing1] = useState(false);

  // State to manage active profile section
  const [activeState, setActiveState] = useState('ProfileDetails');

  // State for handling image uploads
  const [postImage, setPostImage] = useState({
    myfile: '',
    User_id: '',
  });

  // Fetch user details on component mount
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = JSON.parse(localStorage.getItem('user'));
        setUser(response);

        if (response && response.User_id) {
          const res = await axios.get(
            `https://matrimony-v2-0.onrender.com/getImage?User_id=${response.User_id}`
          );
          const base64Image = res.data.image;
          setPostImage({ myfile: base64Image, User_id: response.User_id });
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, []);

  // Handle editing modes
  const handleEdit = () => {
    setIsEditing(true); // Enable editing mode
  };

  const handleEdit1 = () => {
    setIsEditing1(true); // Enable image editing mode
  };

  // Handle input changes for user details
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value, // Update user profile details
    });
  };

  // Convert image file to base64
  const convertionOfImage = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result.split(',')[1];
        resolve(base64String);
      };
      if (file) {
        reader.readAsDataURL(file);
      } else {
        reject('No file provided');
      }
    });
  };

  // Handle image file selection
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const base64 = await convertionOfImage(file);
        setPostImage({ ...postImage, myfile: base64, User_id: user.User_id });
      } catch (error) {
        console.error('Error converting image:', error);
      }
    }
  };

  // Handle saving profile details
  const handleSaveProfileDetails = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(

        'https://matrimony-v2-0.onrender.com/updateProfileDetails',
        {
          User_id: user.User_id,
          name: user.name,
          dob: user.dob,
          marital_status: user.marital_status,
          mother_tongue: user.mother_tongue,
          gender: user.gender,
          option_val: user.option_val,
          refer: user.refer,
          donor: user.donor
        }
      );
      setIsEditing(false);
      setUser(res.data.updatedDetails);
      localStorage.setItem('user', JSON.stringify(res.data.updatedDetails));
      alert('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Error updating profile...');
    }
  };

  // Handle saving career details
  const handleSaveCareerDetails = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        'https://matrimony-v2-0.onrender.com/updateCareerDetails',
        {
          User_id: user.User_id,
          highest_degree: user.highest_degree,
          employed_in: user.employed_in,
          annual_income: user.annual_income,
          express_yourself: user.express_yourself,
        }
      );
      setIsEditing(false); // Disable editing mode
      setUser(res.data.updatedDetails);
      localStorage.setItem('user', JSON.stringify(res.data.updatedDetails)); // Save updated details to local storage
      alert('Career details updated successfully');
    } catch (error) {
      console.error('Error updating career details:', error);
      alert('Error updating career details');
    }
  };

  // Handle saving lifestyle and family details
  const handleSaveLifestyleFamily = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        'https://matrimony-v2-0.onrender.com/updateFamilyDetails',
        {
          User_id: user.User_id,
          family_type: user.family_type,
          father_occupation: user.father_occupation,
          mother_occupation: user.mother_occupation,
          brother: user.brother,
          sister: user.sister,
          family_living_location: user.family_living_location,
          contact_address: user.contact_address,
          about_family: user.about_family,
        }
      );
      setIsEditing(false); // Disable editing mode
      setUser(res.data.updatedDetails);
      localStorage.setItem('user', JSON.stringify(res.data.updatedDetails)); // Save updated details to local storage
      alert('Lifestyle and family details updated successfully');
    } catch (error) {
      console.error('Error updating lifestyle and family details:', error);
      alert('Error updating lifestyle and family details');
    }
  };

  // Handle image upload to server
  const handleImageUpload = async () => {
    if (postImage.myfile) {
      try {
        const res = await axios.post(
          'https://matrimony-v2-0.onrender.com/uploadImage',
          postImage
        );
        alert(res.data.msg);
      } catch (error) {
        console.error('Error uploading image:', error);
        alert('Error uploading image');
      } finally {
        setIsEditing1(false);
      }
    } else {
      alert('No image selected to upload');
    }
  };

  // Define profile sections content
  const profileSections = {
    ProfileDetails: (
      <div>
        <form>
          <div className="form-group">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={user.name}
              onChange={handleChange}
              disabled={!isEditing}
              required
              className="mt-2 block w-full border border-gray-300 rounded-lg p-3 text-gray-800 shadow-sm focus:ring focus:ring-amber-300"
            />
          </div>
          <div className="form-group">
            <label
              htmlFor="mother_tongue"
              className="block text-sm font-medium text-gray-700"
            >
              Mother Tongue
            </label>
            <input
              type="text"
              id="mother_tongue"
              name="mother_tongue"
              value={user.mother_tongue}
              onChange={handleChange}
              disabled={!isEditing}
              required
              className="mt-2 block w-full border border-gray-300 rounded-lg p-3 text-gray-800 shadow-sm focus:ring focus:ring-amber-300"
            />
          </div>
          <div className="form-group">
            <label
              htmlFor="marital_status"
              className="block text-sm font-medium text-gray-700"
            >
              Marital Status
            </label>
            <select
              id="marital_status"
              name="marital_status"
              value={user.marital_status}
              onChange={handleChange}
              disabled={!isEditing}
              required
              className="mt-2 block w-full border border-gray-300 rounded-lg p-3 text-gray-800 shadow-sm focus:ring focus:ring-amber-300"
            >
              <option value="Single">Single</option>
              <option value="Divorced">Divorced</option>
              <option value="Married">Married</option>
            </select>
          </div>
          <div className="form-group">
            <label
              htmlFor="dob"
              className="block text-sm font-medium text-gray-700"
            >
              Date of Birth
            </label>
            <input
              type="date"
              id="dob"
              name="dob"
              value={user.dob}
              onChange={handleChange}
              disabled={!isEditing}
              required
              className="mt-2 block w-full border border-gray-300 rounded-lg p-3 text-gray-800 shadow-sm focus:ring focus:ring-amber-300"
            />
          </div>
          <div className="form-group">
            <label
              htmlFor="gender"
              className="block text-sm font-medium text-gray-700"
            >
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              value={user.gender}
              onChange={handleChange}
              disabled={!isEditing}
              required
              className="mt-2 block w-full border border-gray-300 rounded-lg p-3 text-gray-800 shadow-sm focus:ring focus:ring-amber-300"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="form-group">
  <label
    htmlFor="option_val"
    className="block text-sm font-medium text-gray-700"
  >
    Siddha vidhai petravara?
  </label>
  <div className="mt-2 flex space-x-4">
    <label className="flex items-center">
      <input
        type="radio"
        id="yes"
        name="option_val"
        value="yes"
        checked={user.option_val === 'yes'}
        onChange={handleChange}
        disabled={!isEditing}
        required
        className="mr-2 text-gray-800 focus:ring focus:ring-amber-300"
      />
      Yes
    </label>
    <label className="flex items-center">
      <input
        type="radio"
        id="no"
        name="option_val"
        value="no"
        checked={user.option_val === 'no'}
        onChange={handleChange}
        disabled={!isEditing}
        required
        className="mr-2 text-gray-800 focus:ring focus:ring-amber-300"
      />
      No
    </label>
  </div>
</div>


          <div className="form-group">
            <label
              htmlFor="donor"
              className="block text-sm font-medium text-gray-700"
            >
              Yearidam siddha vidhai petreergal?
            </label>
            <input
              type="text"
              id="donor"
              name="donor"
              value={user.donor}
              onChange={handleChange}
              disabled={!isEditing}
              required
              className="mt-2 block w-full border border-gray-300 rounded-lg p-3 text-gray-800 shadow-sm focus:ring focus:ring-amber-300"
            />
          </div>
          <div className="form-group">
            <label
              htmlFor="refer"
              className="block text-sm font-medium text-gray-700"
            >
              Mention two name to refer your profile
            </label>
            <input
              type="text"
              id="refer"
              name="refer"
              value={user.refer}
              onChange={handleChange}
              disabled={!isEditing}
              required
              className="mt-2 block w-full border border-gray-300 rounded-lg p-3 text-gray-800 shadow-sm focus:ring focus:ring-amber-300"
            />
          </div>
          <div className="flex justify-end">
            {isEditing ? (
              <button
                type="button"
                onClick={handleSaveProfileDetails}
                className="mt-4 bg-amber-600 text-white py-2 px-4 rounded-lg hover:bg-amber-700 focus:outline-none focus:ring focus:ring-amber-300"
              >
                Save Profile Details
              </button>
            ) : (
              <button
                type="button"
                onClick={handleEdit}
                className="mt-4 bg-amber-600 text-white py-2 px-4 rounded-lg hover:bg-amber-700 focus:outline-none focus:ring focus:ring-amber-300"
              >
                Edit Profile Details
              </button>
            )}
          </div>
        </form>
      </div>
    ),
    CareerDetails: (
      <div>
        <form>
          <div className="form-group">
            <label
              htmlFor="highest_degree"
              className="block text-sm font-medium text-gray-700"
            >
              Highest Degree
            </label>
            <input
              type="text"
              id="highest_degree"
              name="highest_degree"
              value={user.highest_degree}
              onChange={handleChange}
              disabled={!isEditing}
              required
              className="mt-2 block w-full border border-gray-300 rounded-lg p-3 text-gray-800 shadow-sm focus:ring focus:ring-amber-300"
            />
          </div>
          <div className="form-group">
            <label
              htmlFor="employed_in"
              className="block text-sm font-medium text-gray-700"
            >
              Employed In
            </label>
            <input
              type="text"
              id="employed_in"
              name="employed_in"
              value={user.employed_in}
              onChange={handleChange}
              disabled={!isEditing}
              required
              className="mt-2 block w-full border border-gray-300 rounded-lg p-3 text-gray-800 shadow-sm focus:ring focus:ring-amber-300"
            />
          </div>
          <div className="form-group">
            <label
              htmlFor="annual_income"
              className="block text-sm font-medium text-gray-700"
            >
              Annual Income
            </label>
            <input
              type="number"
              id="annual_income"
              name="annual_income"
              value={user.annual_income}
              onChange={handleChange}
              disabled={!isEditing}
              required
              className="mt-2 block w-full border border-gray-300 rounded-lg p-3 text-gray-800 shadow-sm focus:ring focus:ring-amber-300"
            />
          </div>
          <div className="form-group">
            <label
              htmlFor="express_yourself"
              className="block text-sm font-medium text-gray-700"
            >
              Express Yourself
            </label>
            <textarea
              id="express_yourself"
              name="express_yourself"
              value={user.express_yourself}
              onChange={handleChange}
              disabled={!isEditing}
              required
              className="mt-2 block w-full border border-gray-300 rounded-lg p-3 text-gray-800 shadow-sm focus:ring focus:ring-amber-300"
            ></textarea>
          </div>

          <div className="flex justify-end">
            {isEditing ? (
              <button
                type="button"
                onClick={handleSaveCareerDetails}
                className="mt-4 bg-amber-600 text-white py-2 px-4 rounded-lg hover:bg-amber-700 focus:outline-none focus:ring focus:ring-amber-300"
              >
                Save Career Details
              </button>
            ) : (
              <button
                type="button"
                onClick={handleEdit}
                className="mt-4 bg-amber-600 text-white py-2 px-4 rounded-lg hover:bg-amber-700 focus:outline-none focus:ring focus:ring-amber-300"
              >
                Edit Career Details
              </button>
            )}
          </div>
        </form>
      </div>
    ),
    LifestyleFamily: (
      <div>
        <form>
          <div className="form-group">
            <label
              htmlFor="family_type"
              className="block text-sm font-medium text-gray-700"
            >
              Family Type
            </label>
            <input
              type="text"
              id="family_type"
              name="family_type"
              value={user.family_type}
              onChange={handleChange}
              disabled={!isEditing}
              required
              className="mt-2 block w-full border border-gray-300 rounded-lg p-3 text-gray-800 shadow-sm focus:ring focus:ring-amber-300"
            />
          </div>
          <div className="form-group">
            <label
              htmlFor="father_occupation"
              className="block text-sm font-medium text-gray-700"
            >
              Father Occupation
            </label>
            <input
              type="text"
              id="father_occupation"
              name="father_occupation"
              value={user.father_occupation}
              onChange={handleChange}
              disabled={!isEditing}
              required
              className="mt-2 block w-full border border-gray-300 rounded-lg p-3 text-gray-800 shadow-sm focus:ring focus:ring-amber-300"
            />
          </div>
          <div className="form-group">
            <label
              htmlFor="mother_occupation"
              className="block text-sm font-medium text-gray-700"
            >
              Mother Occupation
            </label>
            <input
              type="text"
              id="mother_occupation"
              name="mother_occupation"
              value={user.mother_occupation}
              onChange={handleChange}
              disabled={!isEditing}
              required
              className="mt-2 block w-full border border-gray-300 rounded-lg p-3 text-gray-800 shadow-sm focus:ring focus:ring-amber-300"
            />
          </div>
          <div className="form-group">
            <label
              htmlFor="brother"
              className="block text-sm font-medium text-gray-700"
            >
              Brother
            </label>
            <input
              type="number"
              id="brother"
              name="brother"
              value={user.brother}
              onChange={handleChange}
              disabled={!isEditing}
              required
              className="mt-2 block w-full border border-gray-300 rounded-lg p-3 text-gray-800 shadow-sm focus:ring focus:ring-amber-300"
            />
          </div>
          <div className="form-group">
            <label
              htmlFor="sister"
              className="block text-sm font-medium text-gray-700"
            >
              Sister
            </label>
            <input
              type="number"
              id="sister"
              name="sister"
              value={user.sister}
              onChange={handleChange}
              disabled={!isEditing}
              required
              className="mt-2 block w-full border border-gray-300 rounded-lg p-3 text-gray-800 shadow-sm focus:ring focus:ring-amber-300"
            />
          </div>
          <div className="form-group">
            <label
              htmlFor="family_living_location"
              className="block text-sm font-medium text-gray-700"
            >
              Family Living Location
            </label>
            <input
              type="text"
              id="family_living_location"
              name="family_living_location"
              value={user.family_living_location}
              onChange={handleChange}
              disabled={!isEditing}
              required
              className="mt-2 block w-full border border-gray-300 rounded-lg p-3 text-gray-800 shadow-sm focus:ring focus:ring-amber-300"
            />
          </div>
          <div className="form-group">
            <label
              htmlFor="contact_address"
              className="block text-sm font-medium text-gray-700"
            >
              Contact Address
            </label>
            <textarea
              id="contact_address"
              name="contact_address"
              value={user.contact_address}
              onChange={handleChange}
              disabled={!isEditing}
              required
              className="mt-2 block w-full border border-gray-300 rounded-lg p-3 text-gray-800 shadow-sm focus:ring focus:ring-amber-300"
            ></textarea>
          </div>
          <div className="form-group">
            <label
              htmlFor="about_family"
              className="block text-sm font-medium text-gray-700"
            >
              About Family
            </label>
            <textarea
              id="about_family"
              name="about_family"
              value={user.about_family}
              onChange={handleChange}
              disabled={!isEditing}
              required
              className="mt-2 block w-full border border-gray-300 rounded-lg p-3 text-gray-800 shadow-sm focus:ring focus:ring-amber-300"
            ></textarea>
          </div>

          <div className="flex justify-end">
            {isEditing ? (
              <button
                type="button"
                onClick={handleSaveLifestyleFamily}
                className="mt-4 bg-amber-600 text-white py-2 px-4 rounded-lg hover:bg-amber-700 focus:outline-none focus:ring focus:ring-amber-300"
              >
                Save Family Details
              </button>
            ) : (
              <button
                type="button"
                onClick={handleEdit}
                className="mt-4 bg-amber-600 text-white py-2 px-4 rounded-lg hover:bg-amber-700 focus:outline-none focus:ring focus:ring-amber-300"
              >
                Edit Family Details
              </button>
            )}
          </div>
        </form>
      </div>
    ),
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-300 via-amber-100 to-amber-300">
      <div className="container max-w-screen-lg mx-auto p-6">
        <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Left Column: Profile Image and Edit */}
            <div className="col-span-1">
              <div className="flex flex-col items-center justify-center">
                <div className="mt-4">
                  {postImage.myfile ? (
                    <img
                      src={`data:image/jpeg;base64,${postImage.myfile}`}
                      alt="Profile"
                      className="w-32 h-32 object-cover rounded-full shadow-md"
                    />
                  ) : (
                    <p>No image uploaded</p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={handleEdit1}
                  className="mt-4 bg-amber-600 text-white py-2 px-4 rounded-lg hover:bg-amber-700 focus:outline-none focus:ring focus:ring-amber-300"
                >
                  {isEditing1
                    ? 'Change Profile Picture'
                    : 'Edit Profile Picture'}
                </button>
                {isEditing1 && (
                  <div className="mt-4">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="border border-gray-300 rounded-lg p-2"
                    />
                    <button
                      type="button"
                      onClick={handleImageUpload}
                      className="mt-2 bg-amber-600 text-white py-2 px-4 rounded-lg hover:bg-amber-700 focus:outline-none focus:ring focus:ring-amber-300"
                    >
                      Save Image
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Profile Sections */}
            <div className="col-span-3">
              <div className="flex justify-center mb-6">
                <button
                  type="button"
                  onClick={() => setActiveState('ProfileDetails')}
                  className={`py-2 px-4 ${
                    activeState === 'ProfileDetails'
                      ? 'bg-amber-600 text-white'
                      : 'bg-gray-200 text-gray-800'
                  } rounded-lg focus:outline-none focus:ring focus:ring-amber-300 mr-4`}
                >
                  Profile Details
                </button>
                <button
                  type="button"
                  onClick={() => setActiveState('CareerDetails')}
                  className={`py-2 px-4 ${
                    activeState === 'CareerDetails'
                      ? 'bg-amber-600 text-white'
                      : 'bg-gray-200 text-gray-800'
                  } rounded-lg focus:outline-none focus:ring focus:ring-amber-300 mr-4`}
                >
                  Career Details
                </button>
                <button
                  type="button"
                  onClick={() => setActiveState('LifestyleFamily')}
                  className={`py-2 px-4 ${
                    activeState === 'LifestyleFamily'
                      ? 'bg-amber-600 text-white'
                      : 'bg-gray-200 text-gray-800'
                  } rounded-lg focus:outline-none focus:ring focus:ring-amber-300`}
                >
                  Family Details
                </button>
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="py-2 px-4 bg-gray-200 text-gray-800 rounded-lg focus:outline-none ml-4 focus:ring focus:ring-amber-300"
                >
                  Back
                </button>
              </div>
              <div className="mt-8">{profileSections[activeState]}</div>
            </div>
          </div>
          {/* User Status */}
          <div className="mt-6 text-center">
            <h2 className="text-xl font-semibold text-gray-800">
              {user.status === 'active' ? (
                <span className="text-green-600">Active User</span>
              ) : (
                <span className="text-red-600">Inactive User</span>
              )}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;