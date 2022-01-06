<template>
  <Header />
  <Footer />
</template>
<script>
import { defineComponent } from 'vue';
import Header from "app/src/components/Header.vue";
import Footer from "app/src/components/Footer.vue";

export default defineComponent({
  name: 'App',
  components: {
    Header,
    Footer,
  },
})
</script>
