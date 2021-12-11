<script setup lang="ts">

</script>

<template>
    <h1> 前端路由 </h1>
    <!-- 路由出口 -->
    <router-link to="hello-route"> hello route </router-link>
    <div class="root-view">
        <router-view></router-view>
    </div>
</template>

<style lang="scss">
@import url("scss/main.scss");
</style>
