import { useParams } from "react-router-dom";
import {
    useGetSingleProject
} from "../../../hooks/projects/projects.hook";


const SingleProject = () => {
    const { id } = useParams();
    const { data } = useGetSingleProject(id);

    return (
        <div className="text-white p-5">
        <h1 className="text-2xl font-semibold text-center mb-8">Project Details page</h1>
        <p className="my-3 text-lg font-bold"><strong>Name:</strong> {data?.data?.name}</p>
        {data?.data?.photo.map((url, index) => (
          <img
            key={index}
            src={url}
            alt={`Project ${data?.data?.name}`}
            className="my-5"
          />
        ))}
         <div>
      <h2 className="text-lg font-semibold">Selected Features</h2>
      <ul className="list-disc pl-5 ">
        {data?.data?.features?.map((i) => 
         
            <li key={i} className="">
            {i}
            </li>
        
        )}
      </ul>
    </div>
        <p className="my-3"><strong>Description:</strong></p>
        <div  dangerouslySetInnerHTML={{ __html: data?.data?.description }} />
      
      </div>
    )
};
export default SingleProject;