<template>
  <div class="login-logo flex flex-col w-full items-center" role="banner">
    <router-link to="/index">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="96" height="96">
        <path
          fill-rule="evenodd"
          d="M12 2.5a5.5 5.5 0 00-3.096 10.047 9.005 9.005 0 00-5.9 8.18.75.75 0 001.5.045 7.5 7.5 0 0114.993 0 .75.75 0 101.499-.044 9.005 9.005 0 00-5.9-8.181A5.5 5.5 0 0012 2.5zM8 8a4 4 0 118 0 4 4 0 01-8 0z"
        ></path>
      </svg>
    </router-link>
  </div>
</template>

<style scoped>
.login-logo {
  & svg {
    opacity: 0.5;
    &:hover {
      fill: #8193a5;
    }
  }
}
</style>
