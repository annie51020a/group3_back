<template>
    <Form class="admin-info-form" ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
        <h3 class="admin-info-title">新增後台帳號</h3>
        <FormItem label="編號" prop="emp-id">
            <Input style="width: 400px;" v-model="formValidate.id" disabled></Input>
        </FormItem>
        <FormItem label="員工名稱" prop="emp-name">
            <Input style="width: 400px;" v-model="formValidate.name" ></Input>
        </FormItem>
        <FormItem label="帳號名稱" prop="emp-account">
            <Input style="width: 400px;" v-model="formValidate.account"></Input>
        </FormItem>
        <FormItem label="密碼" prop="emp-password">
            <Input style="width: 400px;" v-model="formValidate.password"></Input>
        </FormItem>


        <FormItem>
            <Button type="primary" @click="handleSubmit('formValidate')">保存</Button>
            <Button @click="cancel()" style="margin-left: 8px">取消</Button>
        </FormItem>
    </Form>
</template>
<script>
export default {
    data() {
        return {
            formValidate: {
                emp_id: '',
                emp_account: '',
                emp_name: '',
                emp_password: '',
            },
            ruleValidate: {
                // id: [
                //     { required: true, message: '員工名稱不能為空', trigger: 'blur' }
                // ],
                // adminid: [
                //     { required: true, message: '員工名稱不能為空', trigger: 'blur' }
                // ],
                emp_account: [
                    { required: true, message: '帳號不能為空', trigger: 'blur' }
                ],
                // name: [
                //     { required: true, message: '員工名稱不能為空', trigger: 'blur' }
                // ],
                emp_password: [
                    { required: true, message: '密碼不能為空', trigger: 'blur' },
                ],
            },
            title:''
        }
    },
    methods: {
        handleSubmit(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.$Message.success('Success!');
                } else {
                    this.$Message.error('Fail!');
                }
            })
        },
        cancel() {
            const adminInfoBox = document.getElementById('admin-new');
            adminInfoBox.style.display = 'none';
        },
    }
}
</script>

<style lang="scss">
.admin-info-form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 600px;
    height: 470px;
    > h3{
        margin-bottom: 30px;
    }
}
</style>