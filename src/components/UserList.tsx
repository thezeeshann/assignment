import { useUserData } from "../lib/api";

const UserList = () => {
  const { userData } = useUserData();

  return (
    <section>
      <div className="min-h-screen bg-gray-100 p-6">
        <h1 className="text-2xl font-bold mb-4">User List</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {userData.length > 0 ? (
            userData.map((user) => (
              <div
                key={user.username}
                className="bg-white rounded-lg shadow-md p-4"
              >
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
            ))
          ) : (
            <p className="text-center text-gray-600">No users available</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default UserList;
