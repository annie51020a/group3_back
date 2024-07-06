<template>
    <div class="activity-member-list">
        <h3>報名人數清單</h3>
        <Table stripe :columns="columns" :data="data"></Table>
        <div class="activity-member-button-box">
            <Button @click="cancel()" style="margin-left: 8px">確定</Button>
        </div>
    </div>

</template>
<script>
export default {
    data() {
        return {
            columns: [
                {
                    title: '編號',
                    key: 'id'
                },
                {
                    title: '姓名',
                    key: 'name'
                },
                {
                    title: '電話',
                    key: 'tel'
                },
                {
                    title: '備註',
                    key: 'comment'
                }
            ],
            data: [
                {
                    id: '1',
                    name: '王曉明',
                    tel: '0912345678',
                    comment: ''
                },
                {
                    id: '1',
                    name: '王曉明',
                    tel: '0912345678',
                    comment: ''
                },
                {
                    id: '1',
                    name: '王曉明',
                    tel: '0912345678',
                    comment: ''
                },
                {
                    id: '1',
                    name: '王曉明',
                    tel: '0912345678',
                    comment: ''
                }
            ]
        }
    },
    methods: {
        cancel() {
            const activityInfoBox = document.getElementById('activity-member-list');
            activityInfoBox.style.display = 'none';
        },
    }
}
</script>

<style lang="scss">
.activity-member-list {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 600px;
    height: 400px;

    h3 {
        width: 100%;
        text-align: center;
        line-height: 1.5;
        margin: 10px 0 30px 0;
    }
    .ivu-table{
        width: 550px;
    }
    .activity-member-button-box{
        margin: 10px 0 10px 0;
    }
}
</style>