<template>
    <div class="ds-panel">
        <div class="panel-header">
            <div class="icono">
                <i class="fa-solid fa-bag-shopping"></i>
            </div>
        </div>
        <h1>INTRANET ADMIN</h1>
    </div>
</template>

<script lang="ts">
export default {
    name: 'DashboardPanel',
};
</script>

<style scoped>
:root{
    --color-1:#161719;
    --color-2: #874fff;
    --color-3: #f0f0f1;
    --color-4: #383838;
    --color5: #d3d3d3;
}

*{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}

body{
    font-family: 'Poppins',sans-serif;
    overflow: hidden;
}

.ds-panel{
    display: flex;
    text-align: center;
    justify-content: center;
    width: 100%;
    height: 100vh;
    align-items: center;
    font-size: 70px;
    background-color:   burlywood;
}

ol,ul{
    list-style: none;
}

a{
    text-decoration: none;
}

.admin-dashboard{
    position: relative;
    display: flex;
}

.ds-left-menu{
    background: var(--color-1);
    height: 100vh;
    color: #fff;
    width: 250px;
    position: relative;
    padding: 0px 20px;

    transition: margin-left .3s ease-in-out,width .3s ease-in-out;

}

.ds-left-menu.menu-active{
    width: 80px;
    padding: 0px 10px;
}

.ds-left-menu.menu-active .ds-perfil{
    justify-content: center;
}

.ds-left-menu.menu-active .ds-perfil .info-perfil{
    display: none;
}

.ds-left-menu.menu-active ul li a span,
.ds-left-menu.menu-active .sign-off  a span{
    visibility: hidden;
    display: none;
}

.ds-left-menu.menu-active ul li a i,
.ds-left-menu.menu-active .sign-off  a i{
    margin-right: 0;
}

.ds-left-menu.menu-active .sign-off{
    width: calc(100% - 20px);
}

.ds-left-menu.menu-active .sign-off a,
.ds-left-menu.menu-active ul li a{
    text-align: center;
}
.btn-menu{
    position: absolute;
    background: var(--color-2);
    color: #fff;
    width: 35px;
    height: 35px;
    line-height: 35px;
    text-align: center;
    cursor: pointer;
    border-radius: 50%;
    border: none;
    top:10px;
    right: -16px;
    font-size: 16px;
    z-index: 100;
}

.ds-menu{
    width: 100%;
    overflow-x: scroll;
    height: 100%;
    padding-bottom: 150px;
    padding-top: 20px;
    border-top: 1px solid #252628;
}

.ds-menu ul li{
    position: relative;
}

.ds-menu ul li a{
    cursor: pointer;
    color: var(--color5);
    background: transparent;
    width: 100%;
    display: block;
    margin-bottom: 10px;
    padding: 10px;
    border-radius: 4px;

}

.ds-menu ul li a:hover{
    background: var(--color-2);
    color: #fff;
}

.ds-menu ul li a i{
    margin-right: 10px;
}
.ds-menu::-webkit-scrollbar {
    -webkit-appearance: none;
}

.ds-menu::-webkit-scrollbar:vertical {
    width:10px;
}

.ds-menu::-webkit-scrollbar-button:increment,.ds-menu::-webkit-scrollbar-button {
    display: none;
} 

.ds-menu::-webkit-scrollbar:horizontal {
    height: 10px;
}

.ds-menu::-webkit-scrollbar-thumb {
    background-color: #4f486e;
    border-radius: 20px;
    border: 2px solid var(--color-1);
}

.ds-menu::-webkit-scrollbar-track {
    border-radius: 10px;
}

.ds-perfil{
    display: flex;
    align-items: center;
    padding: 20px 0px;
    justify-content: left;
     margin-left: 20px;
}



.ds-perfil .info-perfil{
    padding-right: 20px;
}

.ds-perfil .info-perfil span{
    font-size: 16px;
    color: #bcbcbd;
}

.ds-perfil .info-perfil h3{
    font-size: 18px;
    font-weight: 400;
    margin-top: -5px;
}

.sign-off{
    position: absolute;
    bottom: 0;
    background: var(--color-1);
    width: calc(100% - 40px);
    margin: auto;
    border-top:1px solid #252628;
    padding: 15px 0px;
}

.sign-off a.btn-sign-off{
    cursor: pointer;
    color: var(--color5);
    background: transparent;
    width: 100%;
    display: block;
    padding: 10px;
    border-radius: 4px;
}

.sign-off a.btn-sign-off:hover{
    background:#dd4b39;
    color: #fff;
}

.sign-off a.btn-sign-off i{
    margin-right: 10px;
    transform: rotate(180deg);
}
</style>
  