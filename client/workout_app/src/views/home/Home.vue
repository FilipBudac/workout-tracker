<template>
  <div>
      <b-row>

        <b-col lg="2">
          <SideNav />
        </b-col>

        <b-col lg="10">
          <router-view></router-view>
        </b-col>

      </b-row>
  </div>
</template>

<script>

import SideNav from "@/components/sidenav/SideNav";

export default {
  name: 'Home',
  components: {
    SideNav
  },
}
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
