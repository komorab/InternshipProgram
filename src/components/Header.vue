<template>
    <div>
<!--        <div>-->
<!--            <span></span>-->
<!--            <el-breadcrumb separator="/" style="display: inline-block">-->
<!--                <el-breadcrumb-item :to="{path: '/'}">首页</el-breadcrumb-item>-->
<!--                <el-breadcrumb-item>后台管理</el-breadcrumb-item>-->
<!--            </el-breadcrumb>-->
<!--        </div>-->
        <el-dropdown>
            <span>{{admin}}</span>
            <i class="el-icon-arrow-down" style="margin-right: 15px"></i>
            <el-dropdown-menu>
                <template v-slot:dropdown></template>
                <el-dropdown-item>查看</el-dropdown-item>
                <el-dropdown-item>
                    <span style="text-decoration: none" @click="logout">退出</span>
                </el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
</template>

<script>
export default {
    name: "Header",
    data() {
        return {
            admin: localStorage.getItem("admin")
        }
    },
    methods: {
        logout() {
            this.$router.push("/login")
            localStorage.removeItem("admin")
            localStorage.removeItem("loginToken")
            this.$message.success("退出成功")
        }
    }
}
</script>

<style scoped>

</style>
