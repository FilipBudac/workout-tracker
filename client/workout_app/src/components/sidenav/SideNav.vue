<template>
    <nav class="sidenav-panel">
      <ul class="nav sidenav-list">

        <li
            v-for="(item, itemKey) in navItems"
            :key="itemKey"
            @click="activateItem(item)"
        >
          <SideNavItem
              :text="item.text"
              :navigate-to="item.navigateTo"
              :icon="item.icon"
              :active="item.active"
          />

        </li>
      </ul>
    </nav>
</template>

<script>
import SideNavItem from "@/components/sidenav/SideNavItem";

export default {
  name: "SideNav",
  components: {
    SideNavItem
  },
  methods: {
    activateItem(activeItem) {
      this.navItems.forEach(item => {
        item.active = false
      })
      activeItem.active = true
    },

  },
  data() {
    return {
      navItems: [
        {
          text: 'Exercises',
          navigateTo: 'exercises',
          icon: 'person',
          active: false,
          children: []
        },
        {
          text: 'Trainings',
          navigateTo: 'trainings',
          icon: 'person',
          active: false,
          children: []
        },
      ]
    }
  }
}
</script>

<style scoped>

  .sidenav-panel {
    background-color: var(--secondary-color);
    height: var(--body-height);
    width: var(--sidenav-width);
    border: solid var(--primary-color);
  }

  .sidenav-list {
    list-style-type: none;
    padding: 2rem 0 0 0;
  }
</style>