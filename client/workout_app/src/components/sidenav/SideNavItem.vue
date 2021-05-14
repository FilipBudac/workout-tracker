<template>
  <div
      v-bind:class="{ 'sidenav-item-container-active': active }"
      class="justify-content-center sidenav-item-container"
  >
    <b-icon
        class="sidenav-item-icon"
        :icon="icon"
        aria-hidden="true"
    />
    <router-link
        active
        exact
        class="sidenav-item"
        :to="{
              name:  navigateTo,
            }"
    >
      {{ text }}
    </router-link>
  </div>
</template>

<script>
export default {
  name: "SideNavItem",
  props: ['text', 'navigateTo', 'icon', 'active']
}
</script>

<style scoped>

  .sidenav-item {
    color: white;
    text-decoration: none;
    font-size: 14pt;
  }

  .sidenav-item-container-active {
    background-color: #19889b;
  }

  .sidenav-item-icon {
    width: 1.2rem;
    height: 1.2rem;
  }

  .sidenav-item-container:hover {
    background-color: #19889b;
  }

  .sidenav-item-container {
    width: calc(var(--sidenav-width) - 5px);
    height: var(--sidenav-item-height);
    line-height: var(--sidenav-item-height); /* text vertical alignment */
  }


</style>