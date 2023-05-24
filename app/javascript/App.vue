<script>
// import { Nav, Alert } from '@/components';
import { mapState } from 'pinia';
import { useAuthStore } from '@/stores';

export default {
  computed: {
    ...mapState(useAuthStore, ['user']),
  },
};
// const authStore = useAuthStore();

</script>

<template>
    <div class="app-container" :class="user && 'bg-light'">
    <!-- <div class="app-container"> -->
        <!-- <Nav /> -->
        <!-- <Alert /> -->
        <div class="container pt-4 pb-4">
            <router-view />
        </div>
    </div>
</template>
