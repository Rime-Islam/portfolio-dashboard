import {
    addSkill,
    deleteSingleSkill,
    editSingleSkill,
    getAllSkill,
  } from "../../service/skills.service.js";
  import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
  
  // Add Skill Hook
  export const useAddSkill = () => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: (data) => addSkill(data),
      onSuccess: () => {
        // Invalidate the 'getAllSkill' query to refetch the updated skills data
        queryClient.invalidateQueries({ queryKey: ["getAllSkill"] });
      },
    });
  };
  
  // Edit Skill Hook
  export const useEditSkill = () => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: (data) => editSingleSkill(data),
      onSuccess: () => {
        // Invalidate the 'getAllSkill' query to refetch the updated skills data
        queryClient.invalidateQueries({ queryKey: ["getAllSkill"] });
      },
    });
  };
  
  // Delete Skill Hook
  export const useDeleteSkill = () => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: (id) => deleteSingleSkill(id),
      onSuccess: () => {
        // Invalidate the 'getAllSkill' query to refetch the updated skills data
        queryClient.invalidateQueries({ queryKey: ["getAllSkill"] });
      },
    });
  };
  
  // Get All Skills Hook
  export const useGetAllSkill = () => {
    return useQuery({
      queryKey: ["getAllSkill"],
      queryFn: getAllSkill,
    });
  };
  