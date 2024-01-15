<script>
export default {
  data() {
    return {
      user: {
        name: "hassan",
        family: "eskandari",
      },
      list: [
        {
          title: "New Year, New  Yays",
          Summary:
            "Jump-start your year with a week full <br> of offers in the Starbucks app.*",
          bgColor: "bg-[#bbf2d1]",
          img: "/img/1.jpg",
          button: "Order now",
        },
        {
          title: "Gift cards keep on giving",
          Summary:
            "Join Starbucks Rewards and start earning free drinks <br> & food when you use gift cards in the app. (Yes, really!)**",
          bgColor: "bg-[#1e3932]",
          img: "/img/2.jpg",
          button: "Order now",
        },
        {
          title: "Hey there, hazelnut",
          Summary:
            "Say hello to our Hazelnut Oatmilk <br> Shaken Espresso, a rich and layered pick-me-up.",
          bgColor: "bg-[#efabfc]",
          img: "/img/3.jpg",
          button: "Order now",
        },
        {
          title: "Pass the pistachios",
          Summary:
            "Your favorite winter duo is back: the Pistachio Latte and <br> Pistachio Cream Cold Brew.",
          bgColor: "bg-[#b2b267]",
          img: "/img/4.jpg",
          button: "Order now",
        },
        {
          title: "Daily delicious",
          Summary:
            "The new Potato, Cheddar & Chive Bakes are <br> full of protein-packed goodness.",
          bgColor: "bg-[#eec0ab]",
          img: "/img/5.jpg",
          button: "Order now",
        },
        {
          title: "Our inspiring new collection",
          Summary:
            "Alison Bremner pays homage to her Tlingit culture through design elements that merge ancient traditions and contemporary art in this powerful artist series.",
          bgColor: "bg-[#eec0ab]",
          img: "/img/6.jpg",
          // button: "Order now",
        },
      ],
    };
  },
  methods: {
    Result() {
      // alert('hsaas')
      this.counter++;
    },
    test() {},

    getClass(item, idx) {
      if (idx % 2 === 0) {
        return `${item.bgColor}  flex-row-reverse`;
      } else {
        return `${item.bgColor}`;
      }
      // return idx % 2 === 0 ? item.bgColor : item.bgColor + 'flex-row-reverse'
    },
  },
};
</script>

<template>
  <main id="app" class="w-full">
    <header class="w-full h-40 border border-blue-400 flexcol">
      <section class="w-1/3 flex border border-red-700">
        <figure></figure>
        <nav class="flex">
          <ul class="flex">
            <li>MENU</li>
            <li>REWARDS</li>
            <li>GIFT CARDS</li>
          </ul>
        </nav>
      </section>
      <section class="flex border border-black">
        <button>Sign in</button>
        <button>Join now</button>
      </section>
    </header>
    <section
      v-for="(akbar, idx) in list"
      :key="idx"
      :class="getClass(akbar, idx)"
      class="border box flex"
    >
      
      <div class="w-full md:w-1/2 text-center">
        <h2 class="text-[60px] mt-40" v-html="akbar.title"></h2>
        <p class="text-[20px] mt-10" v-html="akbar.Summary"></p>
        <button class="border border-black w-28 h-10 rounded-[35%] mt-10">
          {{ akbar.button }}
        </button>
      </div>
      <figure class="w-full md:w-1/2">
        <img :src="akbar.img" alt="" />
      </figure>
    </section>
  </main>
</template>

<style>
.box {
  @apply xl:w-10/12 w-full mx-auto  mt-20;
}
</style>