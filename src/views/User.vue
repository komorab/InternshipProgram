<template>
<div>

    <!--            主体表格搜索框和搜索按钮-->
    <div style="padding: 5px 0">
        <el-input style="width: 200px"
                  suffix-icon="el-icon-search"
                  placeholder="查询序列号"
                  v-model="sncode"
                  size="small">
        </el-input>
        <el-button class="ml-5" type="primary" @click="load" size="small">搜索</el-button>
        <el-button type="primary" @click="handleAdd" size="small">新增<i class="el-icon-circle-plus-outline"></i></el-button>
        <!--        <el-button type="danger" @click="delBatch" size="small">删除<i class="el-icon-remove-outline"></i></el-button>-->
        <el-button type="danger" @click="openBatch()" size="small">批量删除<i class="el-icon-remove-outline"></i></el-button>
    </div>


    <el-table :data="tableData"
              stripe
              border
              header-cell-class-name="table-header"
              @selection-change="handleSelectChange"
              size="small"><!--stripe表示斑马纹 border表示边框-->
        <el-table-column
                fixed
                type="selection"
                width="45"> <!--选择框-->
        </el-table-column>
        <el-table-column fixed prop="ip" label="IP" width="120">
        </el-table-column>
        <el-table-column prop="light" label="故障灯" width="70">
        </el-table-column>
        <el-table-column prop="statue" label="状态灯" width="70">
        </el-table-column>
        <el-table-column prop="version" label="型号" width="200">
        </el-table-column>
        <el-table-column prop="sncode" label="序列号" width="200">
        </el-table-column>
        <el-table-column prop="name" label="名称" width="200">
        </el-table-column>
        <el-table-column prop="note" label="备注" width="200">
        </el-table-column>
<!--        右侧固定栏-->
        <el-table-column fixed="right" label="操作" width="220" align="center">
            <template v-slot="scope">
                <el-button type="primary" @click="dataShow(scope.row)" size="small">详情</el-button>
                <el-button type="warning" @click="handleEdit(scope.row)" size="small">
                    修改
                </el-button>
                <el-button type="danger" @click="open(scope.row.id)" size="small">删除</el-button>
                <!--                   <el-button type="danger" @click="columnDelete(scope.row.id)" size="small">-->
                <!--                       删除<i class="el-icon-delete"></i>-->
                <!--                   </el-button>-->
            </template>
        </el-table-column>
    </el-table>
    <div style="padding: 10px 0">
        <div class="block">
<!--            分页栏-->
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="pageNum"
                    :page-sizes="[10, 20, 50, 100]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
            </el-pagination>
        </div>
    </div>
<!--        新增气泡菜单-->
    <el-dialog title="增加信息" :visible.sync="dialogFormVisible" width="30%">
        <el-form label-width="70px">
            <el-form-item label="ip*">
                <el-input v-model="form.ip" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="light">
                <el-select v-model="form.light" placeholder="请选择">
                    <el-option label="true" value="true"></el-option>
                    <el-option label="false" value="false"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="statue">
                <el-input v-model="form.statue" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="version*">
                <el-input v-model="form.version" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="sncode*">
                <el-input v-model="form.sncode" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="name*">
                <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="note">
                <el-input v-model="form.note" autocomplete="off"></el-input>
            </el-form-item>
            <div style="text-align: right">*为必填项目</div>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="save">确 定</el-button>
        </div>
    </el-dialog>

</div>
</template>

<script>
export default {
    name: "User",
    data() {
        return {
            tableData: [],
            pageNum: 1,
            pageSize: 10,
            total: 0,
            sncode: "",
            dialogFormVisible: false,
            form: {},
            multipleSelection: []
        }
    },

    created() {
        this.load()
    },

    methods: {
        // 加载界面
        load() {
            this.request.get("http://localhost:8081/user/page", {
                params: {
                    pageNum: this.pageNum,
                    pageSize: this.pageSize,
                    sncode: this.sncode
                }
            }).then(res => {
                    console.log(res)
                    this.tableData = res.records
                    this.total = res.total
                }
            )
        },

        // 增加数据和保存
        handleAdd() {
            this.dialogFormVisible = true
            this.form = {}
        },
        save() {
            this.request.post("http://localhost:8081/user", this.form).then(res => {
                if(res) {
                    this.$message.success("保存成功")
                    this.dialogFormVisible = false
                    this.load()
                } else {
                    this.$message.error("保存失败")
                }
            })
        },

        // 数据修改
        handleEdit(row) {
            this.form = row
            this.dialogFormVisible = true
            this.load()
        },

        //   数据删除
        columnDelete (id) {
            this.request.delete("http://localhost:8081/user/" + id).then(res => {
                if(res) {
                    this.dialogFormVisible = false
                    this.load()
                } else {
                    this.$message.error("删除失败")
                }
            })
        },

        //   页面大小
        handleSizeChange(pageSize) {
            this.pageSize = pageSize
            this.load()
        },

        //   页面号
        handleCurrentChange(pageNum) {
            this.pageNum = pageNum
            this.load()
        },

        // 多选设置及删除
        handleSelectChange(val) {
            console.log(val)
            this.multipleSelection = val
        },
        delBatch() {
            let ids = this.multipleSelection.map(v => v.id) // 对象数组变成纯id数组
            this.request.post("http://localhost:8081/user/del/batch", ids).then(res => {
                if(res) {
                    this.load()
                } else {
                    this.$message.error("删除失败")
                }
            })
        },

        // 删除提示框
        open (id) {
            this.$confirm('此操作将永久删除该行, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center: true
            }).then(() => {
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
                this.columnDelete(id);
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },

        //     批量删除
        openBatch() {
            this.$confirm('此操作将永久删除这些数据, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center: true
            }).then(() => {
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
                this.delBatch();
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },

    //     进入数据详情页
        dataShow(row) {
            this.$router.push({ path: '/detail', query: { id: row.id } });
        }
    }
}
</script>

<style scoped>

</style>
