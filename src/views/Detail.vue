<template>
    <div>
        <el-button type="text" @click="dataBack">返回</el-button>
        <el-tabs type="border-card">
            <el-tab-pane label="部件信息">
                <template>
                    <div>
                        <template>
                            <div class="left-section">
                                <el-tree :data="data" :props="defaultProps"
                                         node-key="id"
                                         @node-click="handleNodeClick"
                                         :default-expanded-keys="[1]">
                                </el-tree>
                            </div>
                        </template>
                        <template>
                            <div class="right-section">
                                <div style="margin-left: 10px; padding: 10px">
                                    总览
                                </div>
                                <div style="margin-left: 10px; padding: 10px">
                                    <h1>基本信息</h1>

                                </div>
                            </div>
                        </template>
                        <div style="clear:both;"></div>
                    </div>
                </template>
            </el-tab-pane>
            <el-tab-pane label="设备告警">
                设备告警
            </el-tab-pane>
            <el-tab-pane label="角色管理" disabled>角色管理</el-tab-pane>
            <el-tab-pane label="定时任务补偿" disabled>定时任务补偿</el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
export default {
    data() {
        return {
            activeTab: 'parts',
            deviceId: '',
            parts: [],
            alarms: [],
            data: [{
                id: 1,
                label: '',
                children: [{
                    id: 2,
                    label: 'CPU',
                    children: [{
                        id: 11,
                        label: '三级'
                    }]
                },{
                    id: 3,
                    label: 'Disk',
                    children: [{
                        id: 12,
                        label: '三级'
                    }]
                },{
                    id: 4,
                    label: 'RAID',
                    children: [{
                        id: 13,
                        label: '三级'
                    }]
                },{
                    id: 5,
                    label: 'NIC',
                    children: [{
                        id: 14,
                        label: '三级'
                    }]
                },{
                    id: 6,
                    label: 'Power',
                    children: [{
                        id: 15,
                        label: '三级'
                    }]
                },{
                    id: 7,
                    label: 'Fan',
                    children: [{
                        id: 16,
                        label: '三级'
                    }]
                },{
                    id: 8,
                    label: 'BIOS',
                    children: [{
                        id: 17,
                        label: '三级'
                    }]
                },{
                    id: 9,
                    label: 'Memory',
                    children: [{
                        id: 18,
                        label: '三级'
                    }]
                },{
                    id: 10,
                    label: 'Logical',
                    children: [{
                        id: 19,
                        label: '三级'
                    }]
                }
                ]
            }],
            defaultProps: {
                children: 'children',
                label: 'label'
            }
        }
    },

    mounted() {
        const id = this.$route.query.id
        this.deviceId = this.$route.query.id
    },

    created() {
        this.request.get("http://localhost:8081/user/" + this.$route.query.id).then(res => {
            if(res) {
                this.parts = res.records
            }
        })
    },

    methods: {
        dataBack() {
            this.$router.push("/user")
        },
        handleNodeClick(data) {
            console.log(data);
        }
    }
}
</script>

<style>
.left-section {
    float: left;
    width: 30%;
    /* 设置左部分宽度为页面宽度的30% */
    border-right: 1px solid #ccc;
    /* 添加右侧边框 */
    box-sizing: border-box;
    /* 让边框不会增加元素宽度 */
}

.right-section {
    float: right;
    width: 70%;
    /* 设置右部分宽度为页面宽度的70% */
    box-sizing: border-box;
    /* 让边框不会增加元素宽度 */
}
</style>
