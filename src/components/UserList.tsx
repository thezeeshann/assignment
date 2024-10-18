import { useState } from "react";
import { useUserData } from "../lib/api";
import { MdEdit, MdDelete } from "react-icons/md";

const UserList = () => {
  const { userData, setUserData } = useUserData();
  const [editUser, setEditUser] = useState<string | null>(null);
  const [editedUser, setEditedUser] = useState({
    first_name: "",
    last_name: "",
    age: 0,
    marital_status: "",
    is_employed: false,
    is_founder: false,
  });
  const [newUser, setNewUser] = useState({
    first_name: "",
    last_name: "",
    username: "",
    age: 0,
    marital_status: "",
    is_employed: false,
    is_founder: false,
  });

  const handleDelete = (userName: string) => {
    const newUserData = userData.filter((user) => user.username !== userName);
    setUserData(newUserData);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleEdit = (user: any) => {
    setEditUser(user.username);
    setEditedUser({
      first_name: user.first_name,
      last_name: user.last_name,
      age: user.age,
      marital_status: user.marital_status,
      is_employed: user.is_employed,
      is_founder: user.is_founder,
    });
  };

  const handleEditChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setEditedUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditSubmit = () => {
    const updatedUserData = userData.map((user) =>
      user.username === editUser ? { ...user, ...editedUser } : user
    );
    setUserData(updatedUserData);
    setEditUser(null);
  };

  const handleNewUserChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddUser = () => {
    if (newUser.username) {
      setUserData((prev) => [...prev, newUser]);
      setNewUser({
        first_name: "",
        last_name: "",
        username: "",
        age: 0,
        marital_status: "",
        is_employed: false,
        is_founder: false,
      });
    } else {
      alert("Username is required");
    }
  };

  return (
    <section>
      <div className="min-h-screen bg-gray-100 p-6">
        <h1 className="text-2xl font-bold mb-4">User List</h1>

        {/* Add User Form */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <h2 className="text-xl font-bold mb-2">Add New User</h2>
          <div className="flex flex-col gap-2">
            <input
              type="text"
              name="first_name"
              value={newUser.first_name}
              onChange={handleNewUserChange}
              className="border rounded p-1"
              placeholder="First Name"
            />
            <input
              type="text"
              name="last_name"
              value={newUser.last_name}
              onChange={handleNewUserChange}
              className="border rounded p-1"
              placeholder="Last Name"
            />
            <input
              type="text"
              name="username"
              value={newUser.username}
              onChange={handleNewUserChange}
              className="border rounded p-1"
              placeholder="Username"
            />
            <input
              type="number"
              name="age"
              value={newUser.age}
              onChange={handleNewUserChange}
              className="border rounded p-1"
              placeholder="Age"
            />
            <select
              name="marital_status"
              value={newUser.marital_status}
              onChange={handleNewUserChange}
              className="border rounded p-1"
            >
              <option value="">Select Marital Status</option>
              <option value="Single">Single</option>
              <option value="Married">Married</option>
              <option value="Divorced">Divorced</option>
            </select>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="is_employed"
                checked={newUser.is_employed}
                onChange={(e) =>
                  setNewUser((prev) => ({
                    ...prev,
                    is_employed: e.target.checked,
                  }))
                }
              />
              <span className="ml-2">Employed</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="is_founder"
                checked={newUser.is_founder}
                onChange={(e) =>
                  setNewUser((prev) => ({
                    ...prev,
                    is_founder: e.target.checked,
                  }))
                }
              />
              <span className="ml-2">Founder</span>
            </label>
            <button
              onClick={handleAddUser}
              className="bg-green-500 text-white rounded p-2 mt-2"
            >
              Add User
            </button>
          </div>
        </div>

        {/* User List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {userData.length > 0 ? (
            userData.map((user) => (
              <div
                key={user.username}
                className="bg-white rounded-lg shadow-md flex flex-row justify-between p-4"
              >
                {editUser === user.username ? (
                  <div className="flex flex-col">
                    <input
                      type="text"
                      name="first_name"
                      value={editedUser.first_name}
                      onChange={handleEditChange}
                      className="border rounded p-1 mb-2"
                      placeholder="First Name"
                    />
                    <input
                      type="text"
                      name="last_name"
                      value={editedUser.last_name}
                      onChange={handleEditChange}
                      className="border rounded p-1 mb-2"
                      placeholder="Last Name"
                    />
                    <input
                      type="number"
                      name="age"
                      value={editedUser.age}
                      onChange={handleEditChange}
                      className="border rounded p-1 mb-2"
                      placeholder="Age"
                    />
                    <select
                      name="marital_status"
                      value={editedUser.marital_status}
                      onChange={handleEditChange}
                      className="border rounded p-1 mb-2"
                    >
                      <option value="Single">Single</option>
                      <option value="Married">Married</option>
                      <option value="Divorced">Divorced</option>
                    </select>
                    <button
                      onClick={handleEditSubmit}
                      className="bg-green-500 text-white rounded p-1 mt-2"
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <div className="">
                    <h2 className="text-base font-semibold">
                      Name: {user.first_name} {user.last_name}
                    </h2>
                    <h2 className="text-base font-semibold">
                      Username: {user.username}
                    </h2>
                    <p className="font-semibold">Age: {user.age}</p>
                    <p className="font-semibold">
                      Marital Status: {user.marital_status}
                    </p>
                    <p className="font-semibold">
                      Employed: {user.is_employed ? "Yes" : "No"}
                    </p>
                    <p className="font-semibold">
                      Founder: {user.is_founder ? "Yes" : "No"}
                    </p>
                  </div>
                )}

                <div className="flex flex-row gap-x-2">
                  <MdEdit
                    onClick={() => handleEdit(user)}
                    color="#22c55e"
                    className="cursor-pointer"
                    size={25}
                  />
                  <MdDelete
                    onClick={() => handleDelete(user.username)}
                    size={26}
                    color="#ef4444"
                    className="cursor-pointer"
                  />
                </div>
              </div>
            ))
          ) : (
            <p className=" text-gray-600 text-center font-semibold">
              No users available
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default UserList;
