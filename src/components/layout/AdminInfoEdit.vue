<template>
    <Form class="admin-info-form" ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
        <h3 class="admin-info-title">編輯後台帳號</h3>
        <FormItem label="編號" prop="emp_id">
            <Input style="width: 400px;" v-model="formValidate.emp_id" disabled></Input>
        </FormItem>
        <FormItem label="員工名稱" prop="emp_name">
            <Input style="width: 400px;" v-model="formValidate.emp_name" disabled></Input>
        </FormItem>
        <FormItem label="帳號名稱" prop="emp_account">
            <Input style="width: 400px;" v-model="formValidate.emp_account"></Input>
        </FormItem>
        <FormItem label="密碼" prop="emp_password">
            <Input style="width: 400px;" v-model="formValidate.emp_password"></Input>
        </FormItem>
        <FormItem>
            <Button type="primary" @click="handleSubmit('formValidate')">保存</Button>
            <Button @click="cancel()" style="margin-left: 8px">取消</Button>
        </FormItem>
    </Form>
</template>

<script>
import {path} from "../../../path.js";

export default {
    props: {
        emp_id: {
            type: String,
            required: true
        },
        fetchData: {
            type: Boolean,
            default: false
        }
    },
    data() {
        // const asw = import.meta.env.path;

        return {
            // asw,
            formValidate: {
                emp_id: '',
                emp_account: '',
                emp_name: '',
                emp_password: '',
            },
            ruleValidate: {
                emp_account: [
                    { required: true, message: '帳號不能為空', trigger: 'blur' }
                ],
                emp_password: [
                    { required: true, message: '密碼不能為空', trigger: 'blur' },
                ],
            },
            title: ''
        }
    },
    methods: {
        fetchMemberInfo() {
            console.log("Fetching data for emp_id:", this.emp_id);
            let url = path + 'adminInfoView.php';
            fetch(url + `?emp_id=${this.emp_id}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log("Received data:", data);
                    if (data.code === 200 && data.data) {
                        this.formValidate = {
                            emp_id: data.data.emp_id || '',
                            emp_account: data.data.emp_account || '',
                            emp_name: data.data.emp_name || '',
                            emp_password: data.data.emp_password || '',
                        };
                    } else {
                        console.error("Error in data:", data.msg);
                    }
                })
                .catch(error => {
                    console.error('Error fetching member info:', error);
                })
                .finally(() => {
                    this.$emit('fetch-complete');
                });
        },
        handleSubmit(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    let url = path + 'adminInfoEdit.php';
                    fetch(url, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(this.formValidate)
                    })
                        .then(response => {
                            if (!response.ok) {
                                throw new Error('Network response was not ok');
                            }
                            return response.json();
                        })
                        .then(data => {
                            if (data.code === 200) {
                                this.$Message.success('保存成功!');
                            } else {
                                this.$Message.error('保存失敗: ' + data.msg);
                            }
                        })
                        .catch(error => {
                            console.error('Error updating member info:', error);
                            this.$Message.error('保存失敗!');
                        });
                } else {
                    this.$Message.error('保存失敗!');
                }
            });
        },
        cancel() {
            // 清除所有資料
            this.formValidate = {
                emp_id: '',
                emp_account: '',
                emp_name: '',
                emp_password: '',
            };

            // 隱藏視窗
            const adminInfoBox = document.getElementById('admin-edit');
            adminInfoBox.style.display = 'none';
        },
    },
    watch: {
        emp_id: {
            immediate: true,
            handler(newVal) {
                if (newVal) {
                    this.fetchMemberInfo();
                }
            }
        }
    },
    mounted() {
        if (this.emp_id) {
            this.fetchMemberInfo();
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
