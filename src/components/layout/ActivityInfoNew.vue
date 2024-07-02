<template>
    <Form class="activity-info-form" ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
        <h3 class="activity-info-title">新增活動資訊</h3>
        <FormItem label="報名開始日期" prop="startDate">
            <Input style="width: 100px;" v-model="formValidate.startDate" disabled></Input>
        </FormItem>
        <FormItem label="報名結束日期" prop="endDate">
            <Input style="width: 100px;" v-model="formValidate.endDate" disabled></Input>
        </FormItem>
        <FormItem label="活動名稱" prop="actName">
            <Input style="width: 400px;" v-model="formValidate.actName" disabled></Input>
        </FormItem>
        <Dropdown>
            <a href="javascript:void(0)">
                活動分類
                <Icon type="ios-arrow-down"></Icon>
            </a>
            <template #list>
                <DropdownMenu>
                    <DropdownItem>驴打滚</DropdownItem>
                    <DropdownItem>炸酱面</DropdownItem>
                    <DropdownItem disabled>豆汁儿</DropdownItem>
                    <DropdownItem>冰糖葫芦</DropdownItem>
                    <DropdownItem divided>北京烤鸭</DropdownItem>
                </DropdownMenu>
            </template>
        </Dropdown>
        <FormItem label="圖片檔案" prop="pictureFile">
            <Input style="width: 300px;" v-model="formValidate.pictureFile"></Input>
        </FormItem>
        <FormItem label="活動圖片" prop="actImg">
            <Input style="width: 400px;" v-model="formValidate.actImg"></Input>
        </FormItem>
        <FormItem label="活動日期" prop="actDate">
            <Input style="width: 400px;" v-model="formValidate.actDate"></Input>
        </FormItem>
        <FormItem label="場次時間" prop="sessTime">
            <Input style="width: 400px;" v-model="formValidate.sessTime"></Input>
        </FormItem>
        <Dropdown>
            <a href="javascript:void(0)">
                活動狀態
                <Icon type="ios-arrow-down"></Icon>
            </a>
            <template #list>
                <DropdownMenu>
                    <DropdownItem>驴打滚</DropdownItem>
                    <DropdownItem>炸酱面</DropdownItem>
                    <DropdownItem disabled>豆汁儿</DropdownItem>
                    <DropdownItem>冰糖葫芦</DropdownItem>
                    <DropdownItem divided>北京烤鸭</DropdownItem>
                </DropdownMenu>
            </template>
        </Dropdown>
        <FormItem label="費用" prop="actPrice">
            <Input style="width: 400px;" v-model="formValidate.actPrice"></Input>
        </FormItem>
        <FormItem label="報名人數" prop="memNum">
            <Input style="width: 400px;" v-model="formValidate.memNum"></Input>
        </FormItem>
        <FormItem label="上限人數" prop="memLimit">
            <Input style="width: 400px;" v-model="formValidate.memLimit"></Input>
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
.activity-info-form {
    display: flex;
    // flex-direction: column;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    width: 600px;
    height: 470px;

    >h3 {
        margin-bottom: 30px;
    }
}
</style>