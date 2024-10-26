import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from './Modal'; // Import the Modal component

const Requests = ({ user }) => {
  const [selectedUser, setSelectedUser] = useState(null);  // Store the selected user for details view
  const [details, setDetails] = useState(user);  // Store user details
  const [isModalOpen, setIsModalOpen] = useState(false);  // Control modal visibility
  const [base64Image, setBase64Image] = useState('');  // Store fetched image data

  const handleOpenDetails = (user) => {
    setSelectedUser(user);
    fetchUserImage(user.User_id);
    console.log(user);  // Fetch user image when opening details
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
    setBase64Image('');  // Reset the image when closing modal
  };

  const handleActivateAccount = (User_id) => {
    // API call to activate the user account
    axios.post(`https://matrimony-v2-0.onrender.com/activateUser/${User_id}`)
      .then(response => {
        alert('User account activated successfully');
        setDetails(details.map(user => user.User_id === User_id ? { ...user, status: 'active' } : user));
        handleCloseModal();
      })
      .catch(error => {
        console.error('Error activating account:', error);
      });
  };

  const handleDeActivateAccount = (User_id) => {
    // API call to deactivate the user account
    axios.post(`https://matrimony-v2-0.onrender.com/deactivateUser/${User_id}`)
      .then(response => {
        alert('User account deactivated successfully');
        setDetails(details.map(user => user.User_id === User_id ? { ...user, status: 'inactive' } : user));
        handleCloseModal();
      })
      .catch(error => {
        console.error('Error deactivating account:', error);
      });
  };

  const fetchUserImage = async (User_id) => {
    try {
      const res = await axios.get(`https://matrimony-v2-0.onrender.com/getImage?User_id=${User_id}`);
      setBase64Image(res.data.image);
    } catch (error) {
      console.error('Error fetching user image:', error);
    }
  };

  const renderUserDetails = () => {
    if (!selectedUser) return null;

    return (
      <div className="max-w-lg mx-auto bg-white rounded-lg shadow-lg p-6 sm:p-8 lg:p-6 overflow-y-auto max-h-[500px] space-y-4">
    <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">User Details</h2>
    <div className="flex flex-col items-center">
        <img
            src={'data:image/jpeg;base64,' + selectedUser.image}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover mb-4 border border-gray-200 shadow-sm"
        />
        <p className="text-lg font-medium text-gray-700 mb-2">{selectedUser.name}</p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-gray-600">
        <div>
            <p><strong>User ID:</strong> {selectedUser.User_id}</p>
            <p><strong>Email:</strong> {selectedUser.email}</p>
            <p><strong>Mother Tongue:</strong> {selectedUser.mother_tongue}</p>
            <p><strong>Date of Birth:</strong> {selectedUser.dob}</p>
        </div>
        <div>
            <p><strong>Highest Degree:</strong> {selectedUser.highest_degree}</p>
            <p><strong>Occupation:</strong> {selectedUser.employed_in}</p>
            <p><strong>Annual Income:</strong> {selectedUser.annual_income}</p>
        </div>
    </div>

    <div className="mt-4 text-gray-700">
        <p className="font-semibold">Express Yourself:</p>
        <p className="mb-4">{selectedUser.express_yourself}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
                <p><strong>Family Type:</strong> {selectedUser.family_type}</p>
                <p><strong>Father's Occupation:</strong> {selectedUser.father_occupation}</p>
                <p><strong>Mother's Occupation:</strong> {selectedUser.mother_occupation}</p>
                <p><strong>Brothers:</strong> {selectedUser.brother}</p>
            </div>
            <div>
                <p><strong>Sisters:</strong> {selectedUser.sister}</p>
                <p><strong>Family Living Location:</strong> {selectedUser.family_living_location}</p>
                <p><strong>Contact Address:</strong> {selectedUser.contact_address}</p>
                <p><strong>About Family:</strong> {selectedUser.about_family}</p>
            </div>
        </div>
        <p className="mt-4"><strong>Status:</strong> {selectedUser.status}</p>
    </div>

    <div className="flex justify-between mt-6">
        <button
            onClick={handleCloseModal}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition duration-200"
        >
            Back to Users
        </button>
        <button
            onClick={() => handleDeActivateAccount(selectedUser.User_id)}
            className="bg-red-500 ms-4 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded transition duration-200"
        >
            Deactivate Account
        </button>
        <button
            onClick={() => handleActivateAccount(selectedUser.User_id)}
            className="bg-green-500 ms-4 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded transition duration-200"
        >
            Activate Account
        </button>
    </div>
</div>

    );
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">User ID</th>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Gender</th>
            <th className="py-2 px-4 border-b">Open</th>
          </tr>
        </thead>
        <tbody>
          {details.filter(user => user.status === 'waiting').map(user => (
            <tr key={user.User_id}>
              <td className="py-2 px-4 border">{user.User_id}</td>
              <td className="py-2 px-4 border">{user.name}</td>
              <td className="py-2 px-4 border">{user.email}</td>
              <td className="py-2 px-4 border">{user.gender}</td>
              <td className="py-2 flex justify-center px-4 border items-center">
                <button
                  onClick={() => handleOpenDetails(user)}
                  className='bg-green-700 text-white py-2 rounded-lg font-medium px-4'
                >
                  Open
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        {renderUserDetails()}
      </Modal>
    </div>
  );
};

export default Requests;
