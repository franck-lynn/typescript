<template>
  <div class="flex flex-wrap h-full w-full">
    <div class="hidden md:block w-3/12 h-full">
      <slot name="left" />
    </div>

    <div class="flex-1 xl:w-auto h-full">
      <slot name="center" />
    </div>

    <div class="hidden xl:block w-3/12 h-full">
      <slot name="right" />
    </div>
  </div>
</template>
