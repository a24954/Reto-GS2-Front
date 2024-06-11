<template>
    <div style="display: flex;">
        <LeftMenu />
        <DashboardPanel />
    </div>
</template>

<script lang="ts">
import LeftMenu from '../components/LeftMenu.vue';
import DashboardPanel from '../components/DashboardPanel.vue'
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
    name: 'IntranetView',
    components: {
        LeftMenu,
        DashboardPanel
    },

    setup() {
        console.log()
        const router = useRouter();
        const isLoggedIn = ref(false);

        function checkLoginStatus() {
            const user = localStorage.getItem('currentUser');
            isLoggedIn.value = !!user;
            if(!isLoggedIn.value){
                logout();
            }
        }

        function logout() {
            localStorage.removeItem('currentUser');
            isLoggedIn.value = false;
            router.push('/'); 
        }

        checkLoginStatus();

        return { isLoggedIn, logout };
    },
};
</script>

<style>
:root{
    --color-1:#161719;
    --color-2: #874fff;
    --color-3: #f0f0f1;
    --color-4: #383838;
    --color5: #d3d3d3;
}
</style>