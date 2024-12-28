import { userLogin } from "../../service/auth.service";
import { useMutation } from "@tanstack/react-query";

export const useUserlogin = () => {
  return useMutation({
    mutationFn: (data) => userLogin(data),
  });
};