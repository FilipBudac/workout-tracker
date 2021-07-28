<template>
  <div id="app">

    <header class="header-height">
      <Header />
    </header>

    <main class="main-height">
        <router-view></router-view>
    </main>

    <footer>
      <Footer />
    </footer>

  </div>
</template>

<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default {
  name: 'App',
  components: {
    Header,
    Footer,
  }
}
</script>

<style>

/* FONTS */

@import url('https://fonts.googleapis.com/css2?family=Rubik:wght@300;400&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Karla:wght@300&display=swap');

/* CSS VARIABLES */

:root {
  --secondary-color: #1a95a9;
  --primary-color: #343a40;
  --bg-color: #f1f5f8;
  --primary-font-style: 'Rubik';
  --secondary-font-style: 'Karla';
  --body-height: 100vh;

  --sidenav-width: 16rem;
  --sidenav-item-height: 3rem;
}


/* GLOBAL STYLES */

#app {
  font-family: var(--secondary-font-style), var(--primary-font-style), Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: var(--bg-color);
}

.main-height {
  min-height: var(--body-height);
}

.toaster-bg-color {
  background-color: var(--secondary-color) !important;
}

.align-text-left {
  text-align: left
}

.button-bg-color {
  background-color: var(--secondary-color) !important;
}

.button-bg-color:hover {
  background-color: #126f80 !important;
}

.header-height {
  height: 4.5rem;
}

</style>
