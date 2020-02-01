<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <router-link class="navbar-brand" :to="{ name: 'home' }"
        >Auth for Newbs 🤖</router-link
      >
    </nav>
    <router-view class="container pt-2" />
  </div>
</template>

<style></style>
