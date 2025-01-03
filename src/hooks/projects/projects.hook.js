import {
    addProject,
    deleteSingleProject,
    editSingleProject,
    getAllProject,
    getSingleProject,
  } from "../../service/project.service.js";
  import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
  
  // Add Project Hook
  export const useAddProject = () => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: (data) => addProject(data),
      onSuccess: () => {
        // Invalidate the 'getAllProject' query to refetch data
        queryClient.invalidateQueries({ queryKey: ["getAllProject"] });
      },
    });
  };
  
  // Delete Project Hook
  export const useDeleteProject = () => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: (id) => deleteSingleProject(id),
      onSuccess: () => {
        // Invalidate the 'getAllProject' query to refetch data
        queryClient.invalidateQueries({ queryKey: ["getAllProject"] });
      },
    });
  };

    export const useEditProject = () => {
      const queryClient = useQueryClient();
    
      return useMutation({
        mutationFn: (data) => editSingleProject(data),
        onSuccess: () => {
          // Invalidate the 'getAllSkill' query to refetch the updated skills data
          queryClient.invalidateQueries({ queryKey: ["getAllProject"] });
        },
      });
    };
  
  // Get All Projects Hook
  export const useGetAllProject = () => {
    return useQuery({
      queryKey: ["getAllProject"],
      queryFn: getAllProject,
    });
  };
  
  // Get Single Project Hook
  export const useGetSingleProject = (id) => {
    return useQuery({
      enabled: !!id,
      queryKey: ["getSingleProject", id],
      queryFn: () => getSingleProject(id),
    });
  };
  