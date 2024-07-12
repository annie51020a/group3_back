<template>
    <Form class="activity-info-form" ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
        <h3 class="activity-info-title">編輯活動資訊</h3>

        <div class="sign-up-box">
            <FormItem label="報名開始日期" prop="start_date">
                <Input style="width: 140px;" v-model="formValidate.start_date" disabled></Input>
            </FormItem>
            <FormItem label="報名結束日期" prop="end_date">
                <Input style="width: 140px;" v-model="formValidate.end_date" disabled></Input>
            </FormItem>
        </div>

        <FormItem label="活動名稱" prop="act_name">
            <Input style="width: 400px;" v-model="formValidate.act_name"></Input>
        </FormItem>
        <FormItem label="活動分類" prop="act_cate">
            <Input style="width: 400px;" v-model="formValidate.act_cate"></Input>
        </FormItem>
        <FormItem label="圖片檔案" prop="pictureFile">
            <Button>選擇圖片檔案</Button>
            <Input style="width: 285px;" v-model="formValidate.pictureFile"></Input>
        </FormItem>
        <FormItem label="活動圖片" prop="actImg">
            <div class="activity-img-box">
                <div class="activity-img-preview1"></div>
                <div class="activity-img-preview2"></div>
                <div class="activity-img-preview3"></div>
            </div>
        </FormItem>
        <FormItem label="活動日期" prop="act_date" disabled>
            <Input style="width: 400px;" v-model="formValidate.act_date"></Input>
        </FormItem>
        <FormItem label="場次時間" prop="sess_time" disabled>
            <Input style="width: 400px;" v-model="formValidate.sess_time"></Input>
        </FormItem>

        <div class="dropdown-state">
            <span class="dropdown-label">活動狀態</span>
            <Dropdown>
                <a href="javascript:void(0)" disabled>
                    活動狀態
                    <Icon type="ios-arrow-down"></Icon>
                </a>
                <template #list>
                    <DropdownMenu class="state-list">
                        <DropdownItem>驴打滚</DropdownItem>
                        <DropdownItem>炸酱面</DropdownItem>
                        <DropdownItem disabled>豆汁儿</DropdownItem>
                        <DropdownItem>冰糖葫芦</DropdownItem>
                        <DropdownItem divided>北京烤鸭</DropdownItem>
                    </DropdownMenu>
                </template>
            </Dropdown>
        </div>

        <FormItem label="費用" prop="act_price">
            <Input style="width: 400px;" v-model="formValidate.act_price" disabled></Input>
        </FormItem>
        <FormItem label="報名人數" prop="mem_num" disabled>
            <Input style="width: 400px;" v-model="formValidate.mem_num" disabled></Input>
        </FormItem>
        <FormItem label="上限人數" prop="mem_limit">
            <Input style="width: 400px;" v-model="formValidate.mem_limit"></Input>
        </FormItem>

        <FormItem class="activity-button-box">
            <Button type="primary" @click="handleSubmit('formValidate')">保存</Button>
            <Button @click="cancel()" style="margin-left: 8px">取消</Button>
        </FormItem>
    </Form>
</template>
<script>
import {path} from "../../../path.js";

export default {
    props: {
        act_id: {
            type: String,
            required: true
        },
        fetchData: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            formValidate: {
                start_date: '',
                end_date: '',
                act_name: '',
                act_cate: '',
                actImg: '',
                act_date: '',
                sess_time: '',
                pictureFile: '',
                act_price: '',
                mem_num: '',
                mem_limit: '',
            },
        }
    },
    methods: {
        fetchMemberInfo() {
            console.log("Fetching data for act_id:", this.act_id);
            let url = path + 'actInfoView.php';
            fetch(url + `?act_id=${this.act_id}`)
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
                            act_id: data.data.act_id || '',
                            act_cate: data.data.act_cate || '',
                            act_name: data.data.act_name || '',
                            act_price: data.data.act_price || '',
                            start_date: data.data.start_date || '',
                            end_date: data.data.end_date || '',
                            act_date: data.data.act_date || '',
                            mem_num: data.data.mem_num || '',
                            mem_limit: data.data.mem_limit || '',
                            sess_time: data.data.sess_time || '',
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
                    let url = path + 'actInfoEdit.php';
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
            const activityInfoBox = document.getElementById('activity-edit');
            activityInfoBox.style.display = 'none';
        },
    },
    watch: {
        act_id: {
            immediate: true,
            handler(newVal) {
                if (newVal) {
                    this.fetchMemberInfo();
                }
            }
        }
    },
    mounted() {
        if (this.act_id) {
            this.fetchMemberInfo();
        }
    }
}
</script>

<style lang="scss">
.ivu-form-item {
    margin-bottom: 5px;
}

.activity-info-form {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: center;
    align-items: flex-start;
    width: 600px;
    height: 600px;

    >h3 {
        margin-bottom: 30px;
        text-align: center;
        width: 100%;
    }

    .sign-up-box {
        display: flex;
    }

    .activity-button-box {
        .ivu-form-item-content {
            margin-right: 120px;
            display: flex;
            justify-content: center;
        }

        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .dropdown-category {
        display: flex;
        margin-bottom: 5px;

        >span {
            width: 120px;
            text-align: right;
            vertical-align: middle;
            float: left;
            font-size: 14px;
            color: #515a6e;
            line-height: 1;
            padding: 10px 12px 10px 0;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
        }

        .ivu-dropdown-rel {
            display: inline-block;
            width: 400px;
            height: 32px;
            line-height: 1.5;
            padding: 4px 7px;
            font-size: 14px;
            border: 1px solid #dcdee2;
            border-radius: 4px;
            color: #515a6e;
            background-color: #fff;
            background-image: none;
            position: relative;
        }

        .category-list {
            width: 400px;
        }
    }

    .dropdown-state {
        display: flex;
        margin-bottom: 5px;

        >span {
            width: 120px;
            text-align: right;
            vertical-align: middle;
            float: left;
            font-size: 14px;
            color: #515a6e;
            line-height: 1;
            padding: 10px 12px 10px 0;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
        }

        .ivu-dropdown-rel {
            display: inline-block;
            width: 400px;
            height: 32px;
            line-height: 1.5;
            padding: 4px 7px;
            font-size: 14px;
            border: 1px solid #dcdee2;
            border-radius: 4px;
            color: #515a6e;
            background-color: #fff;
            background-image: none;
            position: relative;
        }

        .state-list {
            width: 400px;
            display: none;
        }
    }

    .activity-img-box {
        display: flex;
        gap: 5px;
        .activity-img-preview1 {
            width: 70px;
            height: 70px;
            border-radius: 10px;
            background-color: #fff;
            border: 1px solid #515a6e;
        }

        .activity-img-preview2 {
            width: 70px;
            height: 70px;
            border-radius: 10px;
            background-color: #fff;
            border: 1px solid #515a6e;
        }

        .activity-img-preview3 {
            width: 70px;
            height: 70px;
            border-radius: 10px;
            background-color: #fff;
            border: 1px solid #515a6e;
        }
    }

}
</style>