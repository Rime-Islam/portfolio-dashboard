import { useState } from "react";
import {
    useGetAllExperience,
    useEditExperience,
  useDeleteExperience,
} from "../../../hooks/experience/experience.hook";
import { toast } from "sonner";
import { useGetAllSkill } from "../../../hooks/skills/skills.hook";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


const ManageExperience = () => {
    const [employmentType, setEmploymentType] = useState([]);
  const [jobType, setJobType] = useState([]);
    const [editorContent, setEditorContent] = useState('');
    const { data: skill } = useGetAllSkill();
  const { data } = useGetAllExperience();
   const { mutate: edit } = useEditExperience();
  const { mutate } = useDeleteExperience();
  const [selectedExperience, setSelectedExperience] = useState(null);
console.log(data?.data)
  const handleJobTypeChange = (e) => {
    const value = e.target.value;
    setJobType((prev) =>
      e.target.checked ? [...prev, value] : prev.filter((type) => type !== value)
    );
  };

  const handleEmploymentTypeChange = (e) => {
    const value = e.target.value;
    setEmploymentType((prev) =>
      e.target.checked ? [...prev, value] : prev.filter((type) => type !== value)
    );
  };

  const handleEditClick = (skill) => {
    setSelectedExperience(skill);
    document.getElementById("my_modal_1").showModal();
  };

  const handleCloseModal = () => {
    setSelectedExperience(null);
    document.getElementById("my_modal_1").close();
  };

  const handleUpdateExperience = async (e) => {
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

  
      const payload = {
        id: selectedExperience._id,
        data:   {
            companyName,
            start,
            end,
            position,
            technologies,
            employmentType,
            jobType,
            description,
          },
      };

      edit(payload, {
        onSuccess: () => {
          toast.success("Experience updated successfully");
          handleCloseModal();
        },
        onError: (error) => {
          console.error("Failed to update Experience", error);
          toast.error("Failed to update Experience");
        },
      });
    
  };
  const Data = ["Full-time", "Internship", "Part-time", "Contract"];
  const jobData = ["Remote", "Onsite", "Hybrid"];

  const handleDelete = (id) => {
    mutate(id, {
      onSuccess: () => {
        toast.success("Experience deleted successfully.");
        handleCloseModal();
      },
      onError: (err) => {
        console.error("Failed to delete Experience:", err);
      },
    });
  };

  return (
    <div>
      <div className="grid grid-cols-2 gap-5">
        {data?.data?.length ?
          data.data.map((Experience) => (
            <div key={Experience._id} className="p-6 border rounded shadow-md bg-white">
      <h1 className="text-2xl font-semibold mb-4">{Experience.companyName}</h1>
      <p className="text-lg">
        <strong>Position:</strong> {Experience.position}
      </p>
      <p>
        <strong>Employment Type:</strong> {Experience.employmentType.join(', ')}
      </p>
      <p>
        <strong>Job Type:</strong> {Experience.jobType.join(', ')}
      </p>
      <p>
        <strong>Years of Experience:</strong> from {Experience.start} to {Experience.end}
      </p>
      <div className="my-4">
        <h2 className="text-xl font-semibold">Description:</h2>
        <div
          className="prose"
          dangerouslySetInnerHTML={{ __html: Experience.description }}
        />
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-2">Technologies Used:</h2>
        <ul className="list-disc pl-5">
        {Experience.technologies.map((techId) => (
          <li key={techId} className="text-gray-700">
            {techId}
          </li>
        ))}
        </ul>
      </div>
      <div className="my-5 flex gap-2">
                  <button
                    onClick={() => handleDelete(Experience._id)} // Fix here
                    className="inline-flex items-center rounded-md border border-transparent bg-gray-800 px-3 py-2 text-sm font-medium leading-4 text-white hover:text-black shadow-sm hover:bg-gray-200"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleEditClick(Experience)}
                    className="inline-flex items-center rounded-md border border-transparent bg-gray-800 px-3 py-2 text-sm font-medium leading-4 text-white hover:text-black shadow-sm hover:bg-gray-200"
                  >
                    Edit
                  </button>
                </div>
    </div>
          )) : (
            <p>No Experience available</p>
          )
          
          }
      </div>

      {/* Modal */}
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="text-lg font-bold">Edit Experience</h3>
          {selectedExperience && (
          <form onSubmit={handleUpdateExperience} className="card-body">
                    {/* Company Name */}
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Company Name</span>
                      </label>
                      <input
                        type="text"
                        name="companyName"
                        defaultValue={selectedExperience.companyName}
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
              defaultValue={selectedExperience.start}
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
              defaultValue={selectedExperience.end}
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
                        defaultValue={selectedExperience.position}
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
                        {skill?.data?.length &&
                          skill?.data?.map((skill) => (
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
                        update Experience
                      </button>
                    </div>
                  </form>
          )}
          <form method="dialog" className="modal-action">
            <button className="btn" onClick={handleCloseModal}>
              Close
            </button>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default ManageExperience;
