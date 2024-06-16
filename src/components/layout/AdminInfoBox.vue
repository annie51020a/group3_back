<template>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="150">
        <h2>編輯</h2>
        <FormItem label="編號" prop="id">
            <Input v-model="formValidate.id" disabled></Input>
        </FormItem>
        <FormItem label="員工ID" prop="adminid">
            <Input v-model="formValidate.adminid"></Input>
        </FormItem>
        <FormItem label="員工名稱" prop="name">
            <Input v-model="formValidate.name"></Input>
        </FormItem>
        <FormItem label="帳號名稱" prop="account">
            <Input v-model="formValidate.account"></Input>
        </FormItem>
        <FormItem label="密碼" prop="password">
            <Input v-model="formValidate.password"></Input>
        </FormItem>


        <FormItem>
            <Button type="primary" @click="handleSubmit('formValidate')">Submit</Button>
            <Button @click="handleReset('formValidate')" style="margin-left: 8px">Reset</Button>
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
                adminid: [
                    { required: true, message: '員工名稱不能為空', trigger: 'blur' }
                ],
                account: [
                    { required: true, message: '員工名稱不能為空', trigger: 'blur' }
                ],
                name: [
                    { required: true, message: '員工名稱不能為空', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: 'Mailbox cannot be empty', trigger: 'blur' },
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
        handleReset(name) {
            this.$refs[name].resetFields();
        }
    }
}
</script>

<style lang="scss">
form {
    width: 500px;
    height: 470px;
}
</style>