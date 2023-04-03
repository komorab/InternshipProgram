<template>
    <div class="login-container" style="background-color: #B3C0D1;">
        <!-- 把登录框置于右侧 -->
        <div class="login-box" style="float: right; background-color: white; width: 25vw">
            <h3 class="login-title">登录</h3>
            <el-form :model="form" ref="form" :rules="rules" label-width="0px">
                <el-form-item prop="username">
                    <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input v-model="form.password" type="password" placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-form-item>
                    <!-- 把登录按钮和清空按钮靠右 -->
                    <div style="text-align: right;">
                        <el-button type="primary" @click="submitForm">登录</el-button>
                        <el-button @click="clearForm">清空</el-button>
                    </div>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Login',
    data() {
        return {
            admin: "",
            form: {
                username: '',
                password: ''
            },
            rules: {
                username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
                password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
            }
        };
    },
    methods: {
        submitForm() {
            this.$refs.form.validate((valid) => {
                if (!valid) {//表单校验不合法
                    this.$message.error("error")
                } else {
                    this.request.post("http://localhost:8081/login", this.form).then(res => {
                        if (!res) {
                            this.$message.error("error")
                            localStorage.setItem("admin", "")
                        } else {
                            this.$router.push("/")
                            localStorage.setItem("admin", this.form.username)
                            localStorage.setItem("loginToken", "true")
                        }
                    })
                }
            })
        },
        clearForm() {
            this.form.username = '';
            this.form.password = '';
        }
    }
};
</script>

<style>
.login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

.login-box {
    width: 400px;
    padding: 30px;
    border-radius: 4px;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
}

.login-title {
    font-size: 24px;
    font-weight: bold;
    text-align: center;
    margin-bottom: 20px;
}
</style>
