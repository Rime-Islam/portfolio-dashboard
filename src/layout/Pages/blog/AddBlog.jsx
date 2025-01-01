import { toast } from "sonner";
import { useState } from "react";
import { useAddBlog } from "../../../hooks/blogs/blogs.hook";
import { uploadImagesToCloudinary } from "../../../lib/uploadImageArray";
import ManageBlog from "./ManageBlog";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


const AddBlog = () => {
    const [editorContent, setEditorContent] = useState('');
    const { mutate } = useAddBlog();

    const handleLogin = async(e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const files = e.target.photo.files;
        const description = editorContent;

        const uploads = await uploadImagesToCloudinary(files);
    
            mutate(
              { name, description, photo: uploads[0] },
              {
                onSuccess: () => {
                    toast.success("Blog Added");
             
                },
              }
            );
          
    };
    
    return (
        <div>
            <h1 className="text-2xl font-semibold">Add A Blog</h1>
        <div className="border my-8 rounded">
        <form onSubmit={handleLogin} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Blog Name</span>
          </label>
          <input type="text" name="name" placeholder="Enter Your Skill name" className="input input-bordered" required />
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
                    theme="snow"
                    className=" h-72 bg-white text-gray-700"
                    placeholder="Write your post description here..."
                  />
</div>
        <div className="form-control mt-6">
        <button type="submit" className="btn btn-success">Create Blog</button>
        </div>
      </form>
        </div>
      <ManageBlog/>
        </div>
    )
};

export default AddBlog;