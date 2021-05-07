<template>
  <div id="app">
    <header>
      <Header />
    </header>
    <main class="container">
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
    Footer
  }
}
</script>

<style>

@import url('https://fonts.googleapis.com/css2?family=Rubik:wght@300;400&display=swap');

#app {
  font-family: 'Rubik', Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-height: calc(100vh - 70px);
}

.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.toaster-bg-color {
  background-color: #1a95a9 !important;
}

</style>
