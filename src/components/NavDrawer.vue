<template>
  <v-card
      height="100%"
      width="256"
      class="mx-auto"
  >
<!--    <v-navigation-drawer permanent>-->
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            Record
          </v-list-item-title>
          <v-list-item-subtitle class="font-italic text-caption">
            记录点滴
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list
          dense
          nav

      >
        <v-list-item
            v-for="item in items"
            :key="item.title"
            link
            @click="nav(item.pathName)"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
<!--    </v-navigation-drawer>-->
  </v-card>
</template>

<script>
export default {
  name: "NavDrawer",
  data: function () {
    return {
      items: [
        { title: "Record Video", icon: "mdi-view-dashboard", pathName: "Record" },
        { title: "Photos", icon: "mdi-image", pathName: "Photos" },
        { title: "About", icon: "mdi-help-box", pathName: "About" },
      ]
    }
  },
  methods: {
    nav: function (path) {
      console.log("select")
      this.$router.push(path)

    }
  }
}
</script>

<style scoped>

</style>
