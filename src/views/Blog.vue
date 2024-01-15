<template>
  <main v-if="posts" id="main" :class="{'loading-skeleton':isLoading}"
        class="w-full 2xl:w-7/12 mx-auto overflow-x-hidden min-h-screen shadow-xl bg-white">

    <section class="h-auto w-full grid grid-cols-1">

      <div class="relative">
        <div class="w-full flex justify-between absolute top-0 overlay-f pt-10 max-h-[10rem] left-0 z-10 px-10">
          <span><ArrowLeftIcon class="w-8 h-8 text-gray-700 fill-white"/></span>
          <span><HeartIcon class="w-8 h-8 text-gray-700 fill-white"/></span>
        </div>
        <img src="@/assets/img/post-bg.jpg" alt="Blog Pic"
             class="w-full transition-all mx-auto md:max-h-[25rem] object-cover">
      </div>

      <div class="grid grid-cols-1 p-10">
        <div id="tags" class="col-span-12">
          <span v-for="(tag,idx) in posts.tags" :key="idx" :class="idx !== 1 ? '' : 'mx-1'"
                class="text-violet-600 text-sm font-bold rounded-lg bg-violet-300 px-2 py-1 ">{{ tag }}</span>
        </div>

        <div id="title" class="col-span-12 mt-5">
          <h1 class="text-xl font-bold text-gray-800">
            {{ posts.title }}
          </h1>
        </div>

        <div id="author" class="col-span-12 flex flex-row justify-start mt-5">
          <span>
            <AvatarIcon class="w-14 h-14"/>
          </span>
          <div class="flex flex-col justify-between ml-5 py-2">
            <span class="text-lg text-gray-700">By {{ posts.author }}</span>
            <span class="text-xs text-gray-500">{{ prettyTime(posts.date) }}</span>
          </div>
        </div>

        <div id="content" class="col-span-12 text-gray-600 mt-5 md:text-justify" v-html="posts.content"></div>
      </div>

      <div class="grid grid-cols-1 bg-gray-100 px-10 py-5">
        <div class="col-span-12 flex flex-row justify-start">
          <span>
            <AvatarIcon class="w-14 h-14"/>
          </span>
          <div class="flex flex-col justify-between ml-5 py-2">
            <span class="text-lg font-bold text-gray-700">About the author</span>
            <span class="text-sm text-gray-500 mt-1">Joel is a hard work blogger.</span>
            <div class="flex flex-row justify-between items-center mt-4">
              <button
                  class="rounded-full bg-violet-700 text-white px-4 py-2 flex flex-row justify-around items-center text-sm">
                <CheckIcon class="fill-white w-5 h-5 mr-1"/>
                Following
              </button>
              <button
                  class="rounded-full bg-transparent ml-3 px-4 py-2 flex flex-row justify-around items-center border-2 border-gray-500 text-sm">
                <BookmarkIcon class="fill-gray-700 font-bold w-4 h-4"/>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div id="reply" class="grid grid-cols-1 px-10 mt-5">
        <span class="col-span-12 text-gray-700 font-bold text-3xl">Share a reply?</span>
        <textarea type="text"
                  v-model="text"
                  class="w-full col-span-12 rounded-xl py-2 px-4 text-sm border bg-gray-100 h-[6rem] mt-4 border-0"
                  placeholder="Your message ...">
        </textarea>
        <button
            :disabled="text.length < 1"
            @click="submitComment"
            class="w-[10rem] rounded-full bg-violet-300 text-violet-700 font-bold px-4 py-2 flex flex-row justify-around items-center text-base mt-3 border-2 border-violet-700">
          Submit
        </button>
      </div>

      <div id="comments" class="grid grid-cols-1 px-10 mt-5">
        <div v-for="(comment,idx) in comments" class="col-span-12 flex flex-col my-3">
          <div class="flex flex-row justify-start mt-5">
          <span>
            <AvatarIcon class="w-14 h-14"/>
          </span>
            <div class="flex flex-col justify-between ml-5 py-2">
              <span class="text-lg text-gray-700">By {{ comment.username }}</span>
              <span class="text-xs text-gray-500">{{ prettyTime(comment.date) }}</span>
            </div>
          </div>
          <div
              class="w-full md:w-1/2 rounded-r-full rounded-bl-full py-4 px-5 text-base text-gray-600 bg-gray-100 mt-4">
            {{ comment.text }}
          </div>
        </div>
      </div>
    </section>

    <Footer/>
  </main>
</template>

<script>
import BookmarkIcon from "../components/icons/BookmarkIcon.vue";
import CheckIcon from "../components/icons/CheckIcon.vue";
import ArrowLeftIcon from "../components/icons/ArrowLeftIcon.vue";
import HeartIcon from "../components/icons/HeartIcon.vue";
import AvatarIcon from "../components/icons/AvatarIcon.vue";
import axios from "axios";
import {BlogCreateCommentRequest , BlogGetRequest} from "../libs/Api/Blog";
import Footer from "../components/Footer.vue";
import {useToast} from "vue-toastification";

export default {
  title: 'Vue-Task - Blog',
  components: {
    Footer,
    BookmarkIcon,
    CheckIcon,
    ArrowLeftIcon,
    HeartIcon,
    AvatarIcon
  },
  data() {
    return {
      isLoading: false,
      posts: null,
      comments: [],
      text: '',
      toast: useToast()
    }
  },
  async created() {
    await this.getPosts();
  },
  methods: {
    async getPosts() {
      let _this = this;
      _this.isLoading = true;

      let blogGetRequest = new BlogGetRequest(_this);
      await blogGetRequest.get(function (content) {
        _this.posts = content;
        _this.comments = content.comments;
        _this.isLoading = false;
      }, function (error) {
        _this.isLoading = false;
        console.log(error)
      })
    },
    async submitComment() {
      let _this = this;

      let data = {
        text: _this.text
      }

      let blogCreateCommentRequest = new BlogCreateCommentRequest(_this);
      blogCreateCommentRequest.setParams(1);
      blogCreateCommentRequest.setRequestParam(data);
      await blogCreateCommentRequest.fetch(function (content) {
        _this.text = "";
        _this.toast.success('Your Comment has been submitted');
      }, function (error) {
        _this.text = "";
        console.log(error)
      })
    },
    prettyTime(date) {
      let options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
      return new Date(date).toLocaleDateString("en-US", options)
    },
  },
}
</script>

