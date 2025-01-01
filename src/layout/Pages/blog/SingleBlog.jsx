import { useParams } from "react-router-dom";
import {
    useGetSingleBlog
} from "../../../hooks/blogs/blogs.hook";


const SingleBlog = () => {
    const { id } = useParams();
    const { data } = useGetSingleBlog(id);

console.log()
    return (
    
    <div className="p-5">
    <h1 className="text-2xl">Blog Details</h1>
    
    <p className="my-4 text-lg"><strong>Name:</strong> {data?.data?.name}</p>
    <p className="mb-3"><strong>Likes Count:</strong> {data?.data?.likesCount}</p>
    <img
      src={data?.data?.photo}
      alt={`Project ${data?.data?.name}`}
 className="w-1/2"
    />
    <p className="mt-5 mb-3"><strong>Description:</strong></p>
    <div dangerouslySetInnerHTML={{ __html: data?.data?.description }} />
    

   
  </div>
    )
};

export default SingleBlog; 