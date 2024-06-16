<template>
  <section class="news-manage">
    <MenuList />
    <div class="news-content">

    </div>
  </section>
</template>

<script>

import MenuList from '@/components/home/MenuList.vue';

export default {
  components: {
    MenuList,
  }
}
</script>

<style lang="scss">
.news-manage {
  width: 100%;
  height: 100%;
  display: flex;

  .news-content {}
}
</style>