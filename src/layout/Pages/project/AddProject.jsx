import { toast } from "sonner"; 
import { useState } from "react";
import { useAddProject } from "../../../hooks/projects/projects.hook";
import { uploadImagesToCloudinary } from "../../../lib/uploadImageArray";
import ManageProject from "./ManageProject";
import { useGetAllSkill } from "../../../hooks/skills/skills.hook";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


const AddProject = () => {
     const [editorContent, setEditorContent] = useState('');
    const { data } = useGetAllSkill();
    const { mutate } = useAddProject();

    const handleLogin = async(e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const files = e.target.photo.files;
        const features = e.target.features.value;
        const client = e.target.client.value;
        const server = e.target.server.value;
        const live = e.target.live.value;
        const description = editorContent;

        const uploads = await uploadImagesToCloudinary(files);
    
            mutate(
              { name, features, client, server, live, description, photo: uploads[0] },
              {
                onSuccess: () => {
                    toast.success("Project Added");
                    location.reload();
                },
              }
            );
          
    };
    
    return (
        <div>
            <h1 className="text-2xl font-semibold">Add your Projects</h1>
        <div className="border my-8 rounded">
        <form onSubmit={handleLogin} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Project Name</span>
          </label>
          <input type="text" name="name" placeholder="Enter Your Skill name" className="input input-bordered" required />
        </div>
        <div className="form-control">
  <label htmlFor="photo" className="label">
    <span className="label-text">Project Image</span>
  </label>
  <input type="file" id="photo" name="photo" accept="image/*" required />
</div>
<div className="form-control">
    <label className="label">
      <span className="label-text">Technology Used</span>
    </label>
    <div className="checkbox-group">
      {data?.data?.length && data?.data?.map((skill) => (
        <label key={skill._id} className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="features"
            value={skill._id}
            className="checkbox"
          />
          <span className="label-text">{skill.skillName}</span>
        </label>
      ))}
    </div>
  </div>

  <div className="form-control">
    <label className="label">
      <span className="label-text">Git Client</span>
    </label>
    <input
      type="text"
      name="client"
      placeholder="Enter Git Client"
      className="input input-bordered"
    />
  </div>

  <div className="form-control">
    <label className="label">
      <span className="label-text">Git Server</span>
    </label>
    <input
      type="text"
      name="server"
      placeholder="Enter Git Server"
      className="input input-bordered"
    />
  </div>

  <div className="form-control">
    <label className="label">
      <span className="label-text">Live Link</span>
    </label>
    <input
      type="text"
      name="live"
      placeholder="Enter Live Link"
      className="input input-bordered"
    />
  </div>
<div className="form-control mb-8">
  <label className="label">
    <span className="label-text">Project Description</span>
  </label>
  <ReactQuill
                      value={editorContent}
                      onChange={setEditorContent}
                      theme="snow"
                      className="h-96 bg-white text-gray-700"
                      placeholder="Write your post description here..."
                    />
</div>
        <div className="form-control mt-6">
        <button type="submit" className="btn btn-success">Add Project</button>
        </div>
      </form>
        </div>
      <ManageProject />
        </div>
    )
};

export default AddProject;