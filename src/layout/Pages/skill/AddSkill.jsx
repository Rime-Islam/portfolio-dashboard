import { toast } from "sonner";
import { useAddSkill } from "../../../hooks/skills/skills.hook";
import { uploadImagesToCloudinary } from "../../../lib/uploadImageArray";
import ManageSkills from "./ManageSkills";

const AddSkill = () => {
    const { mutate } = useAddSkill();

    const handleLogin = async(e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const files = e.target.icone.files;

        const uploads = await uploadImagesToCloudinary(files);
       
   
            mutate(
              { skillName: name, icon: uploads[0] },
              {
                onSuccess: () => {
                  toast.success("Skill Added");
                },
              }
            );
          
    };
    
    return (
        <div>
            <h1 className="text-2xl font-semibold">Add your skills</h1>
        <div className="border my-8 rounded">
        <form onSubmit={handleLogin} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input type="text" name="name" placeholder="Enter Your Skill name" className="input input-bordered" required />
        </div>
        <div className="form-control">
  <label htmlFor="icone" className="label">
    <span className="label-text">Skill Icon</span>
  </label>
  <input type="file" id="icone" name="icone" accept="image/*" required />
</div>
        <div className="form-control mt-6">
        <button type="submit" className="btn btn-success">Add Skill</button>
        </div>
      </form>
        </div>
      <ManageSkills />
        </div>
    )
};

export default AddSkill;