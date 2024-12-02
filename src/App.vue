<template>
  <ChatView class="ChatView" v-if="isSingle" @close="handleIsSingle"/> 
  <Entrence class="Entrence" v-if="!isSingle" @isSingle="handleIsSingle"/>

</template>

<script>

import ChatView from './views/ChatView.vue';
import Entrence from './views/Entrence.vue';


export default {
  components: {
    ChatView,
    Entrence,

  },
  data() {
    return {
      isSingle: false,
    };
  },
  methods: {
    handleIsSingle(isSingle) {
      this.isSingle = !this.isSingle;
    },
  },
};
</script>

<style scoped>
.ChatView {
  display: flex;
  width: 100%;
  height: 100vh;

}


</style>