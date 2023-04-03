<template>
    <el-menu :default-openeds="['1', '3']"
    router>

        <!--          左上标题-->
        <div style="height: 60px; line-height: 60px;
          text-align: center;
          border-bottom: 1px solid;
          border-bottom-color: #cccccc;
          background-color: #B3C0D1">
            <b>后台管理</b>
        </div>

        <!--          左侧下拉栏-->
        <el-menu-item index="/" style="text-align: center">
            主页
        </el-menu-item>

        <el-submenu index="2">
            <template v-slot:title><i class="el-icon-menu"></i>设备监管控</template>
            <!--              slot弃用，使用v-slot替代，需要包在<template>中-->
            <el-menu-item index="/user">设备管理</el-menu-item>
            <el-menu-item index="2-2">iKVM</el-menu-item>
            <el-menu-item index="2-3">网络盘点</el-menu-item>

        </el-submenu>
        <el-submenu index="3">
            <template v-slot:title><i class="el-icon-setting"></i>告警与日志</template>

            <el-menu-item index="3-1">告警事件</el-menu-item>
            <el-menu-item index="3-2">告警统计</el-menu-item>

        </el-submenu>
    </el-menu>
</template>

<script>
export default {
    name: "Aside"
}
</script>

<style scoped>

</style>
