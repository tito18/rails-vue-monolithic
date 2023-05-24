<script>

import { useAuthStore } from '@/stores';

export default {
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    async login() {
      const authStore = useAuthStore();
      // const { username, password } = values;
      await authStore.login(this.username, this.password);
      console.log('Hej its magic');
    },
    async logout() {
      const authStore = useAuthStore();
      // const { username, password } = values;
      await authStore.logout();
      console.log('Hej you know!');
    },
  },
};

// async function

</script>

<template>
    <div class="card">
        <div class="flex flex-column md:flex-row">
            <div class="w-full md:w-5 flex flex-column align-items-center justify-content-center gap-3 py-5">
                <div class="flex align-items-center gap-2">
                    <label>Username</label>
                    <InputText v-model="username" id="username" type="text" class="w-full" />
                </div>
                <div class="flex align-items-center gap-2">
                    <label>Password</label>
                    <InputText v-model="password" id="password" type="password" class="w-full" />
                </div>
                <Button label="Login" icon="pi pi-user" class="w-10rem" @click="login()"></Button>
            </div>
            <div class="w-full md:w-2">
                <Divider layout="vertical" class="hidden md:flex"><b>OR</b></Divider>
                <Divider layout="horizontal" class="flex md:hidden" align="center"><b>OR</b></Divider>
            </div>
            <div class="w-full md:w-5 flex align-items-center justify-content-center py-5">
                <Button label="Logout" icon="pi pi-user-plus" severity="danger" class="w-10rem" @click="logout()"></Button>
            </div>
        </div>
    </div>
</template>
