<template>
  <v-container class="m-wh">
    <v-card
        class="mx-auto"
        width="100%"
        height="100%"
        color="#CCCCFF"
    >
      <v-card-text>
        <div>What is this?</div>
        <p class="text-h4 text--primary">
          只是想做一个日常工作使用的工具
        </p>
        <p>Why do it?</p>
        <div class="text--primary">
          因为在网络上找的一些工具<br>
          要么收费，要么不符期望
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn
            text
            color="deep-purple accent-4"
        >
          <a href="https://github.com/mo1230/record-video">Learn More</a>
          <v-icon
              large
              color="black darken-2"
          >
            mdi-github
          </v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
  export default {
    name: 'HelloWorld',

    data: () => ({

    }),
  }
</script>
