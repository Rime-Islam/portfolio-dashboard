import {
    addBlog,
    deleteSingleBlog,
    editSingleBlog,
    getAllBlog,
    getSigleBlog,
  } from "../../service/blogs";
  import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
  
  // Add Blog Hook
  export const useAddBlog = () => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: (data) => addBlog(data),
      onSuccess: () => {
        // Invalidate the 'getAllBlog' query to refetch the updated blogs data
        queryClient.invalidateQueries({ queryKey: ["getAllBlog"] });
      },
    });
  };
  
  // Edit Blog Hook
  export const useEditBlog = () => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: ({ id, data }) => editSingleBlog({ id, data }),
      onSuccess: () => {
        // Invalidate the 'getAllBlog' query to refetch the updated blogs data
        queryClient.invalidateQueries({ queryKey: ["getAllBlog"] });
      },
    });
  };
  
  // Delete Blog Hook
  export const useDeleteBlog = () => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: (id) => deleteSingleBlog(id),
      onSuccess: () => {
        // Invalidate the 'getAllBlog' query to refetch the updated blogs data
        queryClient.invalidateQueries({ queryKey: ["getAllBlog"] });
      },
    });
  };
  
  // Get All Blogs Hook
  export const useGetAllBlog = () => {
    return useQuery({
      queryKey: ["getAllBlog"],
      queryFn: getAllBlog,
    });
  };
  
  // Get Single Blog Hook
  export const useGetSingleBlog = (id) => {
    return useQuery({
      enabled: !!id,
      queryKey: ["getSingleBlog", id],
      queryFn: () => getSigleBlog(id),
    });
  };
  