import { useState } from "react";
import {
  useGetAllSkill,
  useEditSkill,
  useDeleteSkill,
} from "../../../hooks/skills/skills.hook";
import { uploadImagesToCloudinary } from "../../../lib/uploadImageArray";
import { toast } from "sonner";

const ManageSkills = () => {
  const { data } = useGetAllSkill();
  const { mutate: edit } = useEditSkill();
  const { mutate } = useDeleteSkill();
  const [selectedSkill, setSelectedSkill] = useState(null);

  const handleEditClick = (skill) => {
    setSelectedSkill(skill);
    document.getElementById("my_modal_1").showModal();
  };

  const handleCloseModal = () => {
    setSelectedSkill(null);
    document.getElementById("my_modal_1").close();
  };

  const handleUpdateSkill = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const files = e.target.icone.files;

    try {
      let uploads = selectedSkill.icon; // Default to existing icon
      if (files && files.length > 0) {
        uploads = await uploadImagesToCloudinary(files);
      }

      const payload = {
        id: selectedSkill._id,
        data: { skillName: name, icon: uploads[0] },
      };

      edit(payload, {
        onSuccess: () => {
          toast.success("Skill updated successfully");
          handleCloseModal();
        },
        onError: (error) => {
          console.error("Failed to update skill", error);
          toast.error("Failed to update skill");
        },
      });
    } catch (error) {
      console.error("Error uploading skill icon:", error);
      toast.error("Error uploading skill icon");
    }
  };

  const handleDelete = (id) => {
    mutate(id, {
      onSuccess: () => {
        toast.success("Skill deleted.");
        handleCloseModal();
      },
      onError: () => {
        toast.error("Failed to delete Skill. Try again.");
      },
    });
  };

  return (
    <div>
      <div className="grid grid-cols-4">
        {data?.data?.length ?
          data.data.map((skill) => (
            <div
              key={skill?._id}
              className="p-8 max-w-lg border border-indigo-300 rounded-2xl hover:shadow-xl hover:shadow-indigo-500 flex flex-col items-center"
            >
              <img
                src={skill.icon}
                className="shadow w-20 rounded overflow-hidden border"
                alt={`${skill.skillName} icon`}
              />
              <div className="mt-8">
                <h4 className="font-bold text-xl text-white">
                  {skill?.skillName}
                </h4>
                <div className="mt-5 flex gap-2">
                  <button
                    onClick={() => handleDelete(skill._id)} // Fix here
                    className="inline-flex items-center rounded-md border border-transparent bg-gray-800 px-3 py-2 text-sm font-medium leading-4 text-white hover:text-black shadow-sm hover:bg-gray-200"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleEditClick(skill)}
                    className="inline-flex items-center rounded-md border border-transparent bg-gray-800 px-3 py-2 text-sm font-medium leading-4 text-white hover:text-black shadow-sm hover:bg-gray-200"
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          )) : (
            <p>No Skill available</p>
          )
          
          }
      </div>

      {/* Modal */}
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="text-lg font-bold">Edit Skill</h3>
          {selectedSkill && (
            <form onSubmit={handleUpdateSkill} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  name="name"
                  defaultValue={selectedSkill.skillName}
                  placeholder="Enter Your Skill name"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label htmlFor="icone" className="label">
                  <span className="label-text">Skill Icon</span>
                </label>
                <input
                  type="file"
                  id="icone"
                  name="icone"
                  accept="image/*"
                />
              </div>
              <div className="form-control mt-6">
                <button type="submit" className="btn btn-success">
                  Update Skill
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

export default ManageSkills;
