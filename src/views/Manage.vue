<template>
  <div class="home">
    <el-container style="height: 100%">

      <el-aside width="200px"
                style="background-color: rgb(238, 241, 246);
                height: 100%">
          <Aside />
      </el-aside>

      <el-container>
        <el-header style="text-align: right; font-size: 12px; border: 1px solid #cccccc">
            <Header />
        </el-header>

        <el-main>
<!--            当前页面子路由在router-view中展示-->
            <router-view />
        </el-main>
      </el-container>
    </el-container>

  </div>
</template>

<script>
// @ is an alias to /src

import Aside from "@/components/Aside.vue";
import Header from "@/components/Header.vue";

export default {
    name: 'Manage',
    components: {Header, Aside},
    data() {
      return {

      }
    },

    comments: {
        Aside,
        Header
    }
  }
</script>

<style>
.el-header {
  background-color: #B3C0D1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
.table-header {
  background-color: #409dd6;
  color: #2b2b2b;
}
</style>
