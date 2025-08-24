import React, { useEffect, useState } from "react";
import axios from "axios";
const API_URL = "http://localhost:5000/api/companies";

const industries = [
  "Technology",
  "Finance",
  "Healthcare",
  "Education",
  "Manufacturing",
  "Retail",
  "Energy",
  "Transportation",
  "Hospitality",
  "Other",
];

const App = () => {
  const [companies, setCompanies] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    size: "",
    founded: "",
    industry: "",
  });
  const [search, setSearch] = useState("");

  const fetchCompanies = async (query = "") => {
    try {
      const res = await axios.get(API_URL, {
        params: { search: query }, // to send search query to backend
      });
      setCompanies(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchCompanies(search);
    }, 300); 

    return () => clearTimeout(delayDebounce);
  }, [search]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(API_URL, formData);
      fetchCompanies();
      setFormData({
        name: "",
        location: "",
        size: "",
        founded: "",
        industry: "",
      });
    } catch (err) {
      console.error(err);
    }
  };

  const deleteCompany = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchCompanies();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <h1 className="text-4xl font-extrabold text-teal-600 mb-8">
        Company CRUD Dashboard With Simple UI
      </h1>

      {/* Dynamic Search Input Code Included Here */}
      <input
        type="text"
        placeholder="Search by name or industry..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border border-slate-300 p-3 rounded-lg shadow-sm w-72 focus:outline-none focus:ring-2 focus:ring-teal-400 mb-8"
      />

      <h2 className="text-2xl font-semibold mb-4 text-amber-700">
        Add Company
      </h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 mb-8">
        <input
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="border p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-amber-300"
        />
        <input
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          required
          className="border p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-amber-300"
        />
        <input
          name="size"
          placeholder="Size"
          type="number"
          value={formData.size}
          onChange={handleChange}
          required
          className="border p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-amber-300"
        />
        <input
          name="founded"
          placeholder="Founded Year"
          type="number"
          value={formData.founded}
          onChange={handleChange}
          required
          className="border p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-amber-300"
        />
        <select
          name="industry"
          value={formData.industry}
          onChange={handleChange}
          required
          className="border p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-amber-300"
        >
          <option value="">Select Industry</option>
          {industries.map((ind, idx) => (
            <option key={idx} value={ind}>
              {ind}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="col-span-2 bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 shadow-md"
        >
          Add Company
        </button>
      </form>

      <h2 className="text-2xl font-semibold mb-4 text-purple-700">
        Company List
      </h2>
      <table className="w-full border border-slate-300 bg-white rounded-lg shadow-lg overflow-hidden">
        <thead className="bg-teal-100">
          <tr>
            <th className="p-3 border">Name</th>
            <th className="p-3 border">Location</th>
            <th className="p-3 border">Size</th>
            <th className="p-3 border">Founded</th>
            <th className="p-3 border">Industry</th>
            <th className="p-3 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {companies.length === 0 ? (
            <tr>
              <td colSpan="6" className="p-4 text-center text-slate-500">
                No companies found
              </td>
            </tr>
          ) : (
            companies.map((company) => (
              <tr key={company._id} className="hover:bg-slate-50">
                <td className="p-3 border">{company.name}</td>
                <td className="p-3 border">{company.location}</td>
                <td className="p-3 border">{company.size}</td>
                <td className="p-3 border">{company.founded}</td>
                <td className="p-3 border">{company.industry}</td>
                <td className="p-3 border">
                  <button
                    onClick={() => deleteCompany(company._id)}
                    className="bg-amber-500 text-white px-4 py-1 rounded hover:bg-amber-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default App;
