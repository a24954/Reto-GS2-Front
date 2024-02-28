<template>
    <div class="ds-left-menu">

        <div class="ds-perfil">
            <div class="info-perfil">
                <span>Admin</span>
            </div>
        </div>

        <div class="ds-menu">
            <ul>
                <li><a href="Comite.html"><i class="fa-solid fa-truck-fast"></i><span>Works Council</span></a></li>
                <li><a href="usuarios.html"><i class="fa-solid fa-truck-fast"></i><span>Users</span></a></li>
                <li><a href="productos.html"><i class="fa-solid fa-truck-fast"></i><span>Products</span></a></li>
            </ul>
        </div>

        <div class="sign-off">
            <a onclick="Logout()" href="#" id="logout" class="btn-sign-off">
                <span><router-link to="/">SALIR</router-link></span>
            </a>
        </div>

    </div>
</template>

<script lang="ts">
export default {
    name: 'LeftMenu',
    // Aquí puedes agregar data, methods, computed properties, etc.
};
</script>

<style scoped>

.ds-left-menu {
    background: var(--color-1);
    height: 100vh;
    color: #fff;
    width: 250px;
    position: relative;
    padding: 0px 20px;
    transition: margin-left .3s ease-in-out, width .3s ease-in-out;
}

.ds-left-menu.menu-active {
    width: 80px;
    padding: 0px 10px;
}

.ds-left-menu.menu-active .ds-perfil {
    justify-content: center;
}

.ds-left-menu.menu-active .ds-perfil .info-perfil {
    display: none;
}

.ds-left-menu.menu-active ul li a span,
.ds-left-menu.menu-active .sign-off  a span {
    visibility: hidden;
    display: none;
}

.ds-left-menu.menu-active ul li a i,
.ds-left-menu.menu-active .sign-off  a i {
    margin-right: 0;
}

.ds-left-menu.menu-active .sign-off {
    width: calc(100% - 20px);
}

.ds-left-menu.menu-active .sign-off a,
.ds-left-menu.menu-active ul li a {
    text-align: center;
}

.ds-menu {
    width: 100%;
    overflow-x: scroll;
    height: 100%;
    padding-bottom: 150px;
    padding-top: 20px;
    border-top: 1px solid #252628;
}

.ds-menu ul {
    list-style-type: none; /* Elimina los puntos de la lista */
    padding-left: 0; /* Elimina el padding izquierdo que suele causar un indentado en las listas */
}

.ds-menu ul li a {
    cursor: pointer;
    color: var(--color5); /* Asegúrate de que este color esté definido */
    background: transparent;
    width: 100%;
    display: block;
    margin-bottom: 10px;
    padding: 10px 20px; /* Ajusta el padding según necesites */
    border-radius: 4px;
    text-align: left; /* Alinea el texto a la izquierda si es necesario */
}

.ds-menu ul li a:hover {
    background: var(--color-2); /* Asegúrate de que este color esté definido */
    color: #fff;
}

.ds-menu ul li a i {
    margin-right: 10px; /* Ajusta el margen derecho de los íconos si es necesario */
}

.ds-perfil {
    display: flex;
    align-items: center;
    padding: 20px 0px;
    justify-content: left;
    margin-left: 20px;
}

.ds-perfil .info-perfil {
    padding-right: 20px;
}

.ds-perfil .info-perfil span {
    font-size: 16px;
    color: #bcbcbd; /* Asegúrate de definir este color o reemplazarlo */
}

.sign-off {
    position: absolute;
    bottom: 0;
    background: var(--color-1);
    width: calc(100% - 40px);
    border-top: 1px solid #252628;
    padding: 15px 0px;
}

.sign-off a.btn-sign-off {
    cursor: pointer;
    color: var(--color5); /* Asegúrate de definir este color o reemplazarlo */
    background: transparent;
    width: 100%;
    display: block;
    padding: 10px;
    border-radius: 4px;
}

.sign-off a.btn-sign-off:hover {
    background: #dd4b39; /* Asegúrate de definir este color o reemplazarlo */
    color: #fff;
}

</style>
  