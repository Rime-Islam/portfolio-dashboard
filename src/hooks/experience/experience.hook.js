import {
    addExperience,
    deleteSingleExperience,
    editSingleExperience,
    getAllExperience,
    getSingleExperience,
  } from "../../service/experience.service";
  import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
  
  // Add Experience Hook
  export const useAddExperience = () => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: (data) => addExperience(data),
      onSuccess: () => {
        // Invalidate the 'getAllExperience' query to refetch data
        queryClient.invalidateQueries({ queryKey: ["getAllExperience"] });
      },
    });
  };
  
  // Delete Experience Hook
  export const useDeleteExperience = () => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: (id) => deleteSingleExperience(id),
      onSuccess: () => {
        // Invalidate the 'getAllExperience' query to refetch data
        queryClient.invalidateQueries({ queryKey: ["getAllExperience"] });
      },
    });
  };

    export const useEditExperience = () => {
      const queryClient = useQueryClient();
    
      return useMutation({
        mutationFn: (data) => editSingleExperience(data),
        onSuccess: () => {
          // Invalidate the 'getAllSkill' query to refetch the updated skills data
          queryClient.invalidateQueries({ queryKey: ["getAllExperience"] });
        },
      });
    };
  
  // Get All Experiences Hook
  export const useGetAllExperience = () => {
    return useQuery({
      queryKey: ["getAllExperience"],
      queryFn: getAllExperience,
    });
  };
  
  // Get Single Experience Hook
  export const useGetSingleExperience = (id) => {
    return useQuery({
      enabled: !!id,
      queryKey: ["getSingleExperience", id],
      queryFn: () => getSingleExperience(id),
    });
  };
  