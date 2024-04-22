import { defineStore } from "pinia";
import { ref } from "vue";

import UserEntity from "@/core/User/entity/user.entity";
import AuthService from "@/core/User/services/auth.service";
import UserRepo from "@/core/User/repository/user.repository";

const useUserStore = defineStore("userStore", () => {
  const user = ref<UserEntity | null>(null);
  const isUserLoaded = ref(false);

  const authService = new AuthService(new UserRepo());

  const setUser = async () => {
    try {
      user.value = await authService.getUser();
    } catch (error) {
      throw error;
    } finally {
      isUserLoaded.value = true;
    }
  };

  return { user, isUserLoaded, setUser };
});

export  { useUserStore };
