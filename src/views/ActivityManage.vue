<template>
    <section class="activity-manage">
        <MenuList />
        <div class="activity-content">
            <div class="title-box">
                <h1>活動管理</h1>
                <p>使用者:{{ store.$state.currentAccount }}</p>
                <button class="sign-out" @click="memsignout()">登出</button>
            </div>

            <div class="input-box">
                <Space direction="vertical" size="large"><!-- 搜尋活動 -->
                    <Space>
                        <Input prefix="ios-search" placeholder="輸入關鍵字" style="width: 200px" />
                    </Space>
                </Space>

                <Space size="large" wrap><!-- 日期 -->
                    <DatePicker type="date" placeholder="請選擇日期" style="width: 200px" />
                </Space>

                <button class="add-activity">+新增</button>
            </div>

            <Table class="activity-table" stripe :columns="columns" :data="data"></Table><!-- 表格 -->
        </div>
    </section>


</template>

<script>

import MenuList from '@/components/home/MenuList.vue';
import { resolveComponent } from 'vue';
import { useAdminStore } from '@/store/adminState.js';


export default {
    components: {
        MenuList,
    },
    data() {
        return {
            columns: [
                {
                    title: '活動名稱',
                    key: 'actname',
                    width: '120px'
                },
                {
                    title: '費用',
                    key: 'actprice',
                    width: '100px'
                },
                {
                    title: '地點',
                    key: 'actloc',
                    width: '120px'

                },
                {
                    title: '活動狀態',
                    key: 'actstate',
                    width: '100px'
                },
                {
                    title: '報名人數',
                    key: 'memnum',
                    width: '100px',
                },
                {
                    title: '名單',
                    key: 'memlist',
                    width: '120px',
                    render: (h, params) => {
                        return h('div', [
                            h(resolveComponent('Button'), {
                                type: 'default',
                                size: 'large',
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        this.show(params.index);// 查看功能寫在這
                                    }
                                }
                            }, '查看'),
                        ]);

                    }
                },
                {
                    title: '管理',
                    key: 'manage',
                    width: '120px',

                    render: (h, params) => {

                        return h('div', [
                            h(resolveComponent('Button'), {
                                type: 'default',
                                size: 'large',
                                style: {
                                    marginRight: '5px'
                                },
                                onClick: () => {
                                    this.show(params.index)//編輯功能寫這
                                }
                            }, '編輯'),
                        ]);
                    }
                }
            ],
            data: [
                {
                    actname: '傳統油紙傘創意體驗',
                    actprice: 'NT$300 / 人',
                    actloc: '高雄市前鎮區中華五路123號5樓',
                    actstate: '進行中',
                    memnum: '1/8',
                    memlist: '',
                    manage: '',
                },
                {
                    actname: '傳統油紙傘創意體驗',
                    actprice: 'NT$300 / 人',
                    actloc: '高雄市前鎮區中華五路123號5樓',
                    actstate: '進行中',
                    memnum: '1/8',
                    memlist: '',
                    manage: '',
                },
                {
                    actname: '傳統油紙傘創意體驗',
                    actprice: 'NT$300 / 人',
                    actloc: '高雄市前鎮區中華五路123號5樓',
                    actstate: '進行中',
                    memnum: '1/8',
                    memlist: '',
                    manage: '',
                },
            ]
        }
    },
    setup() {
        const store = useAdminStore();
        return {
            store,
        }
    },
    mounted() {
        fetch(`${import.meta.env.BASE_URL}public/adminmember.json`)
            .then(res => res.json())
            .then(json => {
                this.mem = json;
            });
    },
    methods: {
        async memsignout() {
            try {
                const store = useAdminStore(); // 獲取 Pinia store

                store.clearCurrentUser(); // 設置當前用戶到 Pinia
                alert("已登出");
                this.$router.push('/');

            } catch (error) {
                console.error('發生錯誤:', error);
                alert('發生錯誤');
            }
        },
    }
}
</script>

<style lang="scss">
.activity-manage {
    width: 100%;
    height: 100%;
    display: flex;

    .activity-content {
        flex-grow: 1;
        display: flex;
        flex-direction: column;

        .title-box {
            display: flex;
            align-items: center;
            justify-content: space-evenly;
            margin-top: 5%;

            >h1 {
                font-size: 65px;
                color: #564A41;
                font-family: "Noto Serif HK", serif;
                font-weight: none;
            }

            .sign-out {
                width: 125px;
                height: 50px;
                border-radius: 20px;
                background-color: white;
                border: 1px solid #B1241A;
                color: #B1241A;
            }
        }

        .input-box {
            display: flex;
            margin-top: 3%;
            justify-content: space-evenly;
            align-items: center;

            .add-activity {
                width: 125px;
                height: 50px;
                border-radius: 20px;
                background-color: white;
                border: 1px solid black;
            }
        }

        .activity-table {
            width: 781px;
            text-align: center;
            margin: 3% auto 0;
            font-family: "Noto Serif HK", serif;
        }
    }

}
</style>