<template>
  <div>
    <h2>Music page</h2>
    <nav>
      <router-link to="/music/pop">Pop</router-link> |
      <router-link to="/music/rock">Rock</router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "MusicView",
};
</script>

<style scoped></style>
