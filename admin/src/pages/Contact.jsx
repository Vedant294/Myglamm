import React, { useEffect, useState } from "react";

function Contact() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_API}/contact`
        );
        const data = await res.json();

        setContacts(data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch contacts:", error);
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Contact Submissions
      </h2>

      {loading ? (
        <p className="text-gray-500">Loading contacts...</p>
      ) : contacts.length === 0 ? (
        <p className="text-gray-500">No contact messages found.</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-xl shadow-md">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-100 border-b border-gray-400 text-gray-700">
              <tr>
                <th className="p-3 ">Name</th>
                <th className="p-3 ">Email</th>
                <th className="p-3 ">Subject</th>
                <th className="p-3 ">Message</th>
                <th className="p-3 ">Date</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact) => (
                <tr
                  key={contact._id}
                  className="hover:bg-gray-50 transition duration-150"
                >
                  <td className="p-3 ">{contact.name}</td>
                  <td className="p-3  text-blue-600">
                    {contact.email}
                  </td>
                  <td className="p-3 ">{contact.subject}</td>
                  <td className="p-3 ">{contact.message}</td>
                  <td className="p-3  text-sm text-gray-500">
                    {new Date(contact.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Contact;
