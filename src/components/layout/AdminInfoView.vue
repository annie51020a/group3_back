<template>
    <Form class="admin-info-form" ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
        <h3 class="admin-info-title">查看後台帳號</h3>
        <FormItem label="編號" prop="emp_id">
            <Input style="width: 400px;" v-model="formValidate.emp_id" disabled></Input>
        </FormItem>
        <FormItem label="員工名稱" prop="emp_name">
            <Input style="width: 400px;" v-model="formValidate.emp_name" disabled></Input>
        </FormItem>
        <FormItem label="帳號名稱" prop="emp_account">
            <Input style="width: 400px;" v-model="formValidate.emp_account" disabled></Input>
        </FormItem>
        <FormItem label="密碼" prop="emp_password">
            <Input style="width: 400px;" v-model="formValidate.emp_password" disabled></Input>
        </FormItem>

        <FormItem>
            <Button @click="cancel()" style="margin-left: 8px">確定</Button>
        </FormItem>
    </Form>
</template>

<script>
export default {
    props: {
        emp_id: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            formValidate: {
                emp_id: '',
                emp_account: '',
                emp_name: '',
                emp_password: '',
            },
            title: '',
        }
    },
    methods: {
        fetchMemberInfo(empId) {
            fetch(`http://localhost/g3_php/adminInfoView.php?emp_id=${empId}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    this.formValidate = data;
                })
                .catch(error => {
                    console.error('Error fetching member info', error);
                });
        },
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
            const adminInfoBox = document.getElementById('admin-view');
            adminInfoBox.style.display = 'none';
        },
    },
    watch: {
        // 监听 emp_id 的变化，更新员工信息
        emp_id(newVal) {
            if (newVal) {
                this.fetchMemberInfo(newVal);
            }
        }
    },
    mounted() {
        // 组件挂载时加载数据
        if (this.emp_id) {
            this.fetchMemberInfo(this.emp_id);
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

    >h3 {
        margin-bottom: 30px;
    }
}
</style>
