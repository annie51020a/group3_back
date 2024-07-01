<template>
    <Form class="admin-info-form" ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
        <h3>編輯後台帳號</h3>
        <FormItem label="編號" prop="id">
            <Input style="width: 400px;" v-model="formValidate.id" disabled></Input>
        </FormItem>
        <FormItem label="員工ID" prop="adminid">
            <Input style="width: 400px;" v-model="formValidate.adminid" disabled></Input>
        </FormItem>
        <FormItem label="員工名稱" prop="name">
            <Input style="width: 400px;" v-model="formValidate.name" disabled></Input>
        </FormItem>
        <FormItem label="帳號名稱" prop="account">
            <Input style="width: 400px;" v-model="formValidate.account"></Input>
        </FormItem>
        <FormItem label="密碼" prop="password">
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
                id: '',
                adminid: '',
                account: '',
                name: '',
                password: '',
            },
            ruleValidate: {
                // id: [
                //     { required: true, message: '員工名稱不能為空', trigger: 'blur' }
                // ],
                // adminid: [
                //     { required: true, message: '員工名稱不能為空', trigger: 'blur' }
                // ],
                account: [
                    { required: true, message: '帳號不能為空', trigger: 'blur' }
                ],
                // name: [
                //     { required: true, message: '員工名稱不能為空', trigger: 'blur' }
                // ],
                password: [
                    { required: true, message: '密碼不能為空', trigger: 'blur' },
                ],
            }
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
            const adminInfoBox = document.querySelector('.admin-info-box');
            adminInfoBox.style.display = 'none';
        }
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