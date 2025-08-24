import mongoose from "mongoose";

const companySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Company name is required"],
      trim: true,
    },
    industry: {
      type: String,
      default: "General",
    },
    location: {
      type: String,
      required: [true, "Location is required"],
    },
    size: {
      type: Number,
      min: [1, "Size must be at least 1 employee"],
    },
    founded: {
      type: Number,
      min: [1900, "Founded year must be after 1900"],
      max: [new Date().getFullYear(), "Founded year cannot be in the future"],
    },
  },
  { timestamps: true } 
);

const Company = mongoose.model("Company", companySchema);
export default Company;
