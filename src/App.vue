<template>
  <v-app id="inspire">
    <v-navigation-drawer
        v-model="drawer"
        app
        color="#CCCCFF"
    >
      <NavDrawer/>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>
        <router-link to="/" class="m-title">Record</router-link>
      </v-toolbar-title>
    </v-app-bar>

    <v-main class="m-wh">
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import NavDrawer from "@/components/NavDrawer";
export default {
  name: "App",
  data: () => ({ drawer: null }),
  components: {
    NavDrawer
  }
}
</script>

<style>
html, body {
  width: 100%;
  height: 100%;
}
 .m-title {
   text-decoration: none;
   color: black !important;
 }
 /*.m-wh {*/
 /*  width: 100%;*/
 /*  height: 100%;*/
 /*}*/
</style>
