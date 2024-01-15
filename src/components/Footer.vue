<template>
  <footer class="grid grid-cols-1 bg-gray-100 px-10 py-5 mt-5">
    <span class="text-gray-700 font-semibold text-lg">Company</span>
    <div class="flex flex-row justify-between items-center mt-5">
      <a href="#" class="text-gray-900 font-bold text-sm">About</a>
      <a href="#" class="text-gray-900 font-bold text-sm">Community</a>
    </div>
    <div class="flex flex-row justify-center space-x-10 items-center mt-5">
      <FacebookIcon/>
      <InstagramIcon/>
      <YoutubeIcon/>
    </div>
  </footer>
</template>

<script>
import FacebookIcon from "./icons/FacebookIcon.vue";
import YoutubeIcon from "./icons/YoutubeIcon.vue";
import InstagramIcon from "./icons/InstagramIcon.vue";
export default {
  name: "Footer",
  components: {
    YoutubeIcon,
    InstagramIcon,
    FacebookIcon,
  }
}
</script>

<style scoped>

</style>