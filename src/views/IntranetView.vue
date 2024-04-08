<template>
    <div style="display: flex;">
        <LeftMenu />
        <DashboardPanel />
    </div>
</template>

<script lang="ts">
import LeftMenu from '../components/LeftMenu.vue';
import DashboardPanel from '../components/DashboardPanel.vue'

export default {
    name: 'IntranetView',
    components: {
        LeftMenu,
        DashboardPanel
    }
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