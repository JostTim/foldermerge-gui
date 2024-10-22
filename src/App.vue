<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <header>
    <div class="flex-row">

      <img alt="Vue logo" class="logo" src="@/assets/logo.svg"/>
      <div class="flex-column">
        <HelloWorld title="FolderMerge" />

        <nav>
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/about">About</RouterLink>
          <RouterLink to="/table">Table</RouterLink>
        </nav>

      </div>
    </div>
  </header>
  <div id="content">
  <RouterView />
  </div>
</template>

<style scoped>
header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  line-height: 1.5;
  height: 6rem;
  z-index: 1000;
  backdrop-filter: blur(10px);
  padding: 1rem;
}

.logo {
  margin: 0 2rem 0 0rem;
  background: var(--color-border);
  border-radius: 5px;
  height: 100%;
  width: auto;
}

nav {
  width: 100%;
  font-size: 1rem;
  text-align: left;
  margin-top: 0rem;
  padding: 0.2rem 0;
  display: flex;
  flex-direction: row;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 1;
}

.flex-row {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height:100%;
}

.flex-column {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  height: 100%;
}

@media (min-width: 1024px) {
  /* header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  } */
}
</style>
