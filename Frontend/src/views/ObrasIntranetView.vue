<template>
    <div style="display: flex;">
        <LeftMenu />
        <DashboardPanelObras />
    </div>
</template>

<script lang="ts">
import LeftMenu from '../components/LeftMenu.vue';
import DashboardPanelObras from '../components/DashboardPanelObras.vue'


export default {
    name: 'ObrasIntranetView',
    components: {
        LeftMenu,
        DashboardPanelObras
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