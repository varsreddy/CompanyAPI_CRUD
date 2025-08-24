import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api/companies";

const industries = [
  "Technology",
  "Finance",
  "Healthcare",
  "Education",
  "E-Commerce",
  "Transportation",
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
  const [editingCompany, setEditingCompany] = useState(null);

  // Fetch companies from backend
  const fetchCompanies = async (query = "") => {
    try {
      const res = await axios.get(API_URL, { params: { search: query } });
      setCompanies(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  // Handle search with debounce
  useEffect(() => {
    const delay = setTimeout(() => {
      fetchCompanies(search);
    }, 300);
    return () => clearTimeout(delay);
  }, [search]);

  // Update form data when editingCompany changes
  useEffect(() => {
    if (editingCompany) {
      setFormData({
        name: editingCompany.name,
        location: editingCompany.location,
        size: editingCompany.size,
        founded: editingCompany.founded,
        industry: editingCompany.industry,
      });
    } else {
      setFormData({ name: "", location: "", size: "", founded: "", industry: "" });
    }
  }, [editingCompany]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingCompany) {
        const res = await axios.put(`${API_URL}/${editingCompany._id}`, formData);
        setCompanies((prev) =>
          prev.map((c) => (c._id === editingCompany._id ? res.data : c))
        );
        setEditingCompany(null);
      } else {
        const res = await axios.post(API_URL, formData);
        setCompanies((prev) => [...prev, res.data]);
      }
      setFormData({ name: "", location: "", size: "", founded: "", industry: "" });
    } catch (err) {
      console.error(err);
    }
  };

  const deleteCompany = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setCompanies((prev) => prev.filter((c) => c._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const editCompany = (company) => {
    setEditingCompany(company);
  };

  return (
    <div className="p-8 min-h-screen bg-gradient-to-b from-indigo-50 to-pink-50 font-sans">
      <h1 className="text-4xl font-extrabold text-indigo-700 mb-8 text-center">
        Company CRUD Dashboard
      </h1>

      <div className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto">
        {/* Left Side: Search + Form */}
        <div className="md:w-1/3 bg-white p-6 rounded-xl shadow-lg flex flex-col gap-6">
          <input
            type="text"
            placeholder="Search by name or industry..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-indigo-300 p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />

          <h2 className="text-xl font-semibold text-pink-700">
            {editingCompany ? "Editing Company - Update Fields" : "Add New Company"}
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="border p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-pink-300"
            />
            <input
              name="location"
              placeholder="Location"
              value={formData.location}
              onChange={handleChange}
              required
              className="border p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-pink-300"
            />
            <input
              name="size"
              placeholder="Size"
              type="number"
              value={formData.size}
              onChange={handleChange}
              required
              className="border p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-pink-300"
            />
            <input
              name="founded"
              placeholder="Founded Year"
              type="number"
              value={formData.founded}
              onChange={handleChange}
              required
              className="border p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-pink-300"
            />
            <select
              name="industry"
              value={formData.industry}
              onChange={handleChange}
              required
              className="border p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-pink-300"
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
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 shadow-md transition-all duration-200"
            >
              {editingCompany ? "Update Company" : "Add Company"}
            </button>
          </form>
        </div>

        {/* Right Side: Company List */}
        <div className="md:w-2/3 overflow-x-auto">
          <table className="w-full border border-indigo-300 bg-white rounded-xl shadow-lg overflow-hidden">
            <thead className="bg-indigo-100">
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
                  <td colSpan="6" className="p-4 text-center text-indigo-500">
                    No companies found
                  </td>
                </tr>
              ) : (
                companies.map((company) => (
                  <tr key={company._id} className="hover:bg-indigo-50">
                    <td className="p-3 border">{company.name}</td>
                    <td className="p-3 border">{company.location}</td>
                    <td className="p-3 border">{company.size}</td>
                    <td className="p-3 border">{company.founded}</td>
                    <td className="p-3 border">{company.industry}</td>
                    <td className="p-3 border flex gap-2">
                      <button
                        onClick={() => editCompany(company)}
                        disabled={editingCompany && editingCompany._id !== company._id}
                        className={`px-4 py-1 rounded ${
                          editingCompany && editingCompany._id === company._id
                            ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                            : "bg-blue-500 text-white hover:bg-blue-600"
                        }`}
                      >
                        {editingCompany && editingCompany._id === company._id
                          ? "Editing"
                          : "Edit"}
                      </button>
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
      </div>
    </div>
  );
};

export default App;
