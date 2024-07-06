<template>
    <Form class="activity-info-form" ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
        <h3 class="activity-info-title">編輯活動資訊</h3>

        <div class="sign-up-box">
            <FormItem label="報名開始日期" prop="startDate">
                <Input style="width: 140px;" v-model="formValidate.startDate" disabled></Input>
            </FormItem>
            <FormItem label="報名結束日期" prop="endDate">
                <Input style="width: 140px;" v-model="formValidate.endDate" disabled></Input>
            </FormItem>
        </div>

        <FormItem label="活動名稱" prop="actName">
            <Input style="width: 400px;" v-model="formValidate.actName"></Input>
        </FormItem>
        <div class="dropdown-category">
            <span class="dropdown-label">活動分類</span>
            <Dropdown>
                <a href="javascript:void(0)">
                    活動分類
                    <Icon type="ios-arrow-down"></Icon>
                </a>
                <template #list>
                    <DropdownMenu class="category-list">
                        <DropdownItem>驴打滚</DropdownItem>
                        <DropdownItem>炸酱面</DropdownItem>
                        <DropdownItem disabled>豆汁儿</DropdownItem>
                        <DropdownItem>冰糖葫芦</DropdownItem>
                        <DropdownItem divided>北京烤鸭</DropdownItem>
                    </DropdownMenu>
                </template>
            </Dropdown>
        </div>
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
        <FormItem label="活動日期" prop="actDate" disabled>
            <Input style="width: 400px;" v-model="formValidate.actDate"></Input>
        </FormItem>
        <FormItem label="場次時間" prop="sessTime" disabled>
            <Input style="width: 400px;" v-model="formValidate.sessTime"></Input>
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

        <FormItem label="費用" prop="actPrice">
            <Input style="width: 400px;" v-model="formValidate.actPrice" disabled></Input>
        </FormItem>
        <FormItem label="報名人數" prop="memNum" disabled>
            <Input style="width: 400px;" v-model="formValidate.memNum" disabled></Input>
        </FormItem>
        <FormItem label="上限人數" prop="memLimit">
            <Input style="width: 400px;" v-model="formValidate.memLimit"></Input>
        </FormItem>

        <FormItem class="activity-button-box">
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
                startDate: '',
                endDate: '',
                actName: '',
                actImg: '',
                actDate: '',
                sessTime: '',
                pictureFile: '',
                actPrice: '',
                memNum: '',
                memLimit: '',
            },
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
            const activityInfoBox = document.getElementById('activity-edit');
            activityInfoBox.style.display = 'none';
        },
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