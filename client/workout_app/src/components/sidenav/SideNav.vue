<template>
    <nav class="sidenav-panel">

      <!--  first level  -->
      <ul class="nav sidenav-list">
        <li
            v-for="(item, itemKey) in navItems"
            :key="itemKey"
            @click="activateNavItem(item)"
        >
          <SideNavItem
              v-bind:item="item"
              v-bind:are-children-visible.sync="showMoreKeys[item.text]"
              v-bind:class="{ 'pl-4': hasNavItemSubpages(item) }"
          />
            <!--  second level  -->
            <ul class="nav sidenav-list" v-if="hasNavItemSubpages(item) && showMoreKeys[item.text]">
              <li
                  v-for="(itemChildren, itemChildrenKey) in item.children"
                  :key="itemChildrenKey"
                  @click.stop="activateNavItem(itemChildren)"
              >
                <SideNavItem
                    v-bind:item="itemChildren"
                />
              </li>
            </ul>

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
    activateNavItem(activeItem) {
      if (this.currentActiveItem) {
        this.currentActiveItem.active = false
      }

      activeItem.active = true
      this.currentActiveItem = activeItem
    },
    hasNavItemSubpages(item) {
      return item.children.length > 0
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
          children: [
            {
              text: 'Back',
              navigateTo: 'exercises',
              icon: 'person',
              active: false,
              children: []
            },
            {
              text: 'Chest',
              navigateTo: 'exercises',
              icon: 'person',
              active: false,
              children: []
            },
            {
              text: 'Legs',
              navigateTo: 'exercises',
              icon: 'person',
              active: false,
              children: []
            },
          ]
        },
        {
          text: 'Trainings',
          navigateTo: 'trainings',
          icon: 'person',
          active: false,
          children: []
        },
      ],
      showMoreKeys: {},
      currentActiveItem: {},
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
  }

</style>