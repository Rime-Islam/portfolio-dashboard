import { toast } from "sonner";
import { useState } from "react";
import { useAddExperience } from "../../../hooks/experience/experience.hook";
import ManageExperience from "./ManageExprience";
import { useGetAllSkill } from "../../../hooks/skills/skills.hook";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const AddExperience = () => {
  const [editorContent, setEditorContent] = useState("");
  const { data } = useGetAllSkill();
  const { mutate } = useAddExperience();

  const [employmentType, setEmploymentType] = useState([]);
  const [jobType, setJobType] = useState([]);

  const handleEmploymentTypeChange = (e) => {
    const value = e.target.value;
    setEmploymentType((prev) =>
      e.target.checked ? [...prev, value] : prev.filter((type) => type !== value)
    );
  };

  const handleJobTypeChange = (e) => {
    const value = e.target.value;
    setJobType((prev) =>
      e.target.checked ? [...prev, value] : prev.filter((type) => type !== value)
    );
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const companyName = e.target.companyName.value;
    const start = e.target.start.value;
    const end = e.target.end.value;
    const position = e.target.position.value;
    const technologies = Array.from(
      e.target.technologies,
      (checkbox) => checkbox.checked && checkbox.value
    ).filter(Boolean);
    const description = editorContent;

    mutate(
      {
        companyName,
        start,
        end,
        position,
        technologies,
        employmentType,
        jobType,
        description,
      },
      {
        onSuccess: () => {
          toast.success("Experience Added");
       
        },
      }
    );
  };

  const Data = ["Full-time", "Internship", "Part-time", "Contract"];
  const jobData = ["Remote", "Onsite", "Hybrid"];

  return (
    <div>
      <h1 className="text-2xl font-semibold">Add your Experiences</h1>
      <div className="border my-8 rounded">
        <form onSubmit={handleLogin} className="card-body">
          {/* Company Name */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Company Name</span>
            </label>
            <input
              type="text"
              name="companyName"
              placeholder="Enter Your company name"
              className="input input-bordered"
              required
            />
          </div>

          {/* Years of Experience */}
        
        <div className="flex justify-between">
        <div className="form-control">
            <label className="label">
              <span className="label-text">Start Time</span>
            </label>
            <input
              type="date"
              name="start"
              placeholder="Your job start time"
              className="input input-bordered"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">End Time</span>
            </label>
            <input
              type="date"
              name="end"
              placeholder="Your job end time"
              className="input input-bordered"
            />
          </div>
        </div>

          {/* Position */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Your Position</span>
            </label>
            <input
              type="text"
              name="position"
              placeholder="Enter Position"
              className="input input-bordered"
            />
          </div>

          {/* Technologies */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Technology Used</span>
            </label>
            <div className="checkbox-group">
              {data?.data?.length &&
                data?.data?.map((skill) => (
                  <label
                    key={skill._id}
                    className="flex items-center space-x-2"
                  >
                    <input
                      type="checkbox"
                      name="technologies"
                      value={skill.skillName}
                      className="checkbox"
                    />
                    <span className="label-text">{skill.skillName}</span>
                  </label>
                ))}
            </div>
          </div>

          {/* Employment Type */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Employment Type</span>
            </label>
            <div className="checkbox-group">
              {Data.map((type) => (
                <label
                  key={type}
                  className="flex items-center mt-1 space-x-2"
                >
                  <input
                    type="checkbox"
                    value={type}
                    onChange={handleEmploymentTypeChange}
                    className="checkbox"
                  />
                  <span className="label-text">{type}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Job Type */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Job Type</span>
            </label>
            <div className="checkbox-group">
              {jobData.map((type) => (
                <label
                  key={type}
                  className="flex items-center mt-1 space-x-2"
                >
                  <input
                    type="checkbox"
                    value={type}
                    onChange={handleJobTypeChange}
                    className="checkbox"
                  />
                  <span className="label-text">{type}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Experience Description */}
          <div className="form-control bg-white mb-8">
            <label className="label">
              <span className="label-text">Experience Description</span>
            </label>
            <ReactQuill
              value={editorContent}
              onChange={setEditorContent}
              theme="snow"
              className="h-96 text-gray-700"
              placeholder="Write your post description here..."
            />
          </div>

          {/* Submit Button */}
          <div className="form-control mt-6">
            <button type="submit" className="btn btn-success">
              Add Experience
            </button>
          </div>
        </form>
      </div>
      <ManageExperience />
    </div>
  );
};

export default AddExperience;
