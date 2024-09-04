import React, { useState } from "react";

function CustomerPageDash() {
  const allUsers = [
    {
      name: "Jane Cooper",
      status: "Active",
      permissions: "Administrator",
      email: "cooper@gmail.com",
      tags: ["Collaboration", "+2"],
      imageUrl: "https://randomuser.me/api/portraits/women/1.jpg",
    },
    {
      name: "Wade Warren",
      status: "Onboarding",
      permissions: "Accounting",
      email: "warren@gmail.com",
      tags: ["Leadership", "+1"],
      imageUrl: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
      name: "Esther Howard",
      status: "Active",
      permissions: "Accounting",
      email: "howard@gmail.com",
      tags: ["Innovation", "+3"],
      imageUrl: "https://randomuser.me/api/portraits/women/2.jpg",
    },
    // Add more user objects here
  ];

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(8);

  // Calculate the range of users to display
  const indexOfLastUser = currentPage * rowsPerPage;
  const indexOfFirstUser = indexOfLastUser - rowsPerPage;
  const currentUsers = allUsers.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(allUsers.length / rowsPerPage);

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(1); // Reset to first page when rows per page changes
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div >
      <div >
        <div className="flex justify-between p-4 border-b">
          <h2 className="text-xl font-semibold">Users</h2>
          <button className="bg-blue-500 text-white px-4 py-2 rounded">Add user</button>
        </div>
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-4">Image</th>
              <th className="p-4">Name</th>
              <th className="p-4">Status</th>
              <th className="p-4">Permissions</th>
              <th className="p-4">Email</th>
              <th className="p-4">Tags</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user, index) => (
              <tr key={index} className="border-b">
                <td className="p-4">
                  <img
                    className="w-10 h-10 rounded-full"
                    src={user.imageUrl}
                    alt={`${user.name}'s avatar`}
                  />
                </td>
                <td className="p-4">{user.name}</td>
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      user.status === "Active"
                        ? "bg-green-100 text-green-500"
                        : "bg-yellow-100 text-yellow-500"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="p-4">{user.permissions}</td>
                <td className="p-4">{user.email}</td>
                <td className="p-4">
                  {user.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs mr-1"
                    >
                      {tag}
                    </span>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center">
            <span className="mr-2">Show rows per page</span>
            <select
              value={rowsPerPage}
              onChange={handleRowsPerPageChange}
              className="border rounded px-2 py-1"
            >
              <option value={8}>8</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
            </select>
          </div>
          <div className="flex items-center">
            <span className="mr-4">{`${indexOfFirstUser + 1}-${Math.min(
              indexOfLastUser,
              allUsers.length
            )} of ${allUsers.length}`}</span>
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className="mr-2 p-2 disabled:opacity-50"
            >
              {"<"}
            </button>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="p-2 disabled:opacity-50"
            >
              {">"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerPageDash;
