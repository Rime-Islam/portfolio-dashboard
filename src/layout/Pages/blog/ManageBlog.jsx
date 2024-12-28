import { useState } from "react";
import {
    useGetAllBlog,
    useEditBlog,
  useDeleteBlog,
} from "../../../hooks/blogs/blogs.hook";
import { uploadImagesToCloudinary } from "../../../lib/uploadImageArray";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


const ManageBlog = () => {
    const [editorContent, setEditorContent] = useState('');
    const { data } = useGetAllBlog();
   const { mutate: edit } = useEditBlog();
  const { mutate } = useDeleteBlog();
  const [selectedProject, setSelectedProject] = useState(null);

  const handleEditClick = (skill) => {
    setSelectedProject(skill);
    document.getElementById("my_modal_1").showModal();
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
    document.getElementById("my_modal_1").close();
  };

  const handleUpdateProject = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const description = e.target.description.value;
    const files = e.target.photo.files;

    try {
      let uploadedImage = selectedProject.photo; 
      if (files && files.length > 0) {
        uploadedImage = await uploadImagesToCloudinary(files);
      }

      const payload = {
        id: selectedProject._id,
        data: {
          name,
          description,
          photo: uploadedImage[0], 
        },
      };

      edit(payload, {
        onSuccess: () => {
          toast.success("Blog updated successfully");
          handleCloseModal();
        },
        onError: (error) => {
          console.error("Failed to update Blog", error);
          toast.error("Failed to update Blog");
        },
      });
    } catch (error) {
      console.error("Error uploading Blog image:", error);
      toast.error("Error uploading Blog image");
    }
  };

  const handleDelete = (id) => {
    mutate(id, {
      onSuccess: () => {
        toast.success("Blog deleted successfully.");
        handleCloseModal();
      },
      onError: (err) => {
        console.error("Failed to delete Blog:", err);
      },
    });
  };

  return (
    <div>
      <div className="grid grid-cols-2 gap-5">
        {data?.data?.length ?
          data.data.map((project) => (
            <div
              key={project?._id}
              className=" max-w-lg border border-indigo-300 rounded-2xl hover:shadow-xl hover:shadow-indigo-500 flex flex-col items-center"
            >
             <Link to={`${project?._id}`}>
             <img
                src={project.photo}
                className="shadow rounded overflow-hidden"
                alt={`${project.name} photo`}
              />
             </Link>
              <div className="mt-8">
                <h4 className="font-bold text-start text-xl text-white">
                  {project?.name}
                </h4>
                <div className="my-5 flex gap-2">
                  <button
                    onClick={() => handleDelete(project._id)} // Fix here
                    className="inline-flex items-center rounded-md border border-transparent bg-gray-800 px-3 py-2 text-sm font-medium leading-4 text-white hover:text-black shadow-sm hover:bg-gray-200"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleEditClick(project)}
                    className="inline-flex items-center rounded-md border border-transparent bg-gray-800 px-3 py-2 text-sm font-medium leading-4 text-white hover:text-black shadow-sm hover:bg-gray-200"
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          )) : (
            <p>No Blog available</p>
          )
          
          }
      </div>

      {/* Modal */}
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="text-lg font-bold">Edit Project</h3>
          {selectedProject && (
           <form onSubmit={handleUpdateProject} className="card-body">
           <div className="form-control">
             <label className="label">
               <span className="label-text">Blog Name</span>
             </label>
             <input type="text" name="name" defaultValue={selectedProject.name} placeholder="Enter Your Skill name" className="input input-bordered" required />
           </div>
           <div className="form-control">
     <label htmlFor="photo" className="label">
       <span className="label-text">Blog Image</span>
     </label>
     <input type="file" id="photo" name="photo" accept="image/*" required />
   </div>

   <div className="form-control mb-8">
     <label className="label">
       <span className="label-text">Blog Description</span>
     </label>
     <ReactQuill
                        value={editorContent}
                        onChange={setEditorContent}
                        defaultValue={editorContent}
                        theme="snow"
                        className=" h-72 bg-white text-gray-700"
                        placeholder="Write your post description here..."
                      />
   </div>
           <div className="form-control mt-6">
           <button type="submit" className="btn btn-success">Edit Blog</button>
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

export default ManageBlog;
