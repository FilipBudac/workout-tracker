<template>
  <div
      v-bind:class="{ 'sidenav-item-container-active': item.active }"
      class="justify-content-center sidenav-item-container"
  >
    <b-icon
        class="sidenav-item-icon"
        :icon="item.icon"
        aria-hidden="true"
    />
    <router-link
        active
        exact
        class="sidenav-item"
        :to="{
              name:  item.navigateTo,
            }"
    >
      <span>
        {{ item.text }}
      </span>

      <span v-if="item.children.length > 0">
            <b-icon
                v-if="!this.areChildrenVisible"
                @click="showMore(item.text)"
                icon="arrow-down-short"
                aria-hidden="true"
            />
      </span>

      <span v-if="item.children.length > 0">
            <b-icon
                v-if="this.areChildrenVisible"
                @click="showMore(item.text)"
                icon="arrow-up-short"
                aria-hidden="true"
            />
      </span>

    </router-link>
  </div>

</template>

<script>
export default {
  name: "SideNavItem",
  props: {
    item: {
      type: Object,
      required: true,
      // validator
    },
    areChildrenVisible: {
      type: Boolean
    }
  },
  methods: {
    showMore() {
      this.areChildrenVisibleLocal = !this.areChildrenVisible

      // notify parent (SideNav) of any changes
      this.$emit('update:areChildrenVisible', this.areChildrenVisibleLocal)
    },
  },
  data() {
    return {
      areChildrenVisibleLocal: false
    }
  }
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