<template>
    <section class="order-manage">
        <MenuList />
        <div class="order-content">
            <div class="title-box">
                <h1>訂單管理</h1>
                <p>使用者:{{ store.$state.currentAccount }}</p>
                <button class="sign-out" @click="memsignout()">登出</button>
            </div>
            <div class="order-input-box">
                <button class="filter"><img src="@/assets/pic/filter.png" alt="">篩選</button>
                <Space direction="vertical" size="large"><!-- 搜尋活動 -->
                    <Space>
                        <Input prefix="ios-search" placeholder="查詢訂單編號/活動名稱/會員帳號" style="width: 260px" />
                    </Space>
                </Space>
            </div>
            <Tabs class="order-tab" value="order-tab">
                <TabPane label="課程/活動" name="name1">
                    <Table class="order-table" stripe :columns="actcolumns" :data="actdata"></Table>
                </TabPane>
                <TabPane label="周邊商品" name="name2">
                    <Table class="order-table" stripe :columns="productcolumns" :data="productdata"></Table>
                </TabPane>
                <TabPane label="客製化油紙傘" name="name3">
                    <Table class="order-table" stripe :columns="customercolumns" :data="customerdata"></Table>
                </TabPane>
            </Tabs>
        </div>

        <div class="admin-info-box" id="admin-edit">
                <CustomizedOrder :emp_id="selectedEmpId" :fetchData="shouldFetchData" @fetch-complete="onFetchComplete" />
            </div>
    </section>
</template>

<script>
import CustomizedOrder from '@/components/layout/CustomizedOrder.vue';
import MenuList from '@/components/home/MenuList.vue';
import { resolveComponent } from 'vue';
import { useAdminStore } from '@/store/adminState.js';
import { path } from '../../path.js';


export default {
    components: {
        MenuList,
    },
    data() {
        return {
            actcolumns: [
                {
                    title: '編號',
                    key: 'ordernum',
                    width: '60px'
                },
                {
                    title: '訂單編號',
                    key: 'actorderid',
                    width: '80px'
                },
                {
                    title: '會員帳號',
                    key: 'mememail',
                    width: '160px'

                },
                {
                    title: '活動名稱',
                    key: 'actname',
                    width: '140px'
                },
                {
                    title: '創建日期',
                    key: 'createdate',
                    width: '120px',
                },
                {
                    title: '訂單狀態',
                    key: 'actorderstate',
                    width: '100px',
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
                                on: {
                                    click: () => {
                                        this.show(params.index);// 查看功能寫在這
                                    }
                                }
                            }, '編輯'),
                        ]);

                    }
                },
            ],
            actdata: [
                {
                    ordernum: '1',
                    actorderid: '201',
                    mememail: 'abc12345@gmail.com',
                    actname: '油紙傘工作室1',
                    createdate: '2024.05.18',
                    actorderstate: '已完成',
                    manage: ''
                },
                {
                    ordernum: '1',
                    actorderid: '201',
                    mememail: 'abc12345@gmail.com',
                    actname: '油紙傘工作室1',
                    createdate: '2024.05.18',
                    actorderstate: '已完成',
                    manage: ''
                },
                {
                    ordernum: '1',
                    actorderid: '201',
                    mememail: 'abc12345@gmail.com',
                    actname: '油紙傘工作室1',
                    createdate: '2024.05.18',
                    actorderstate: '已完成',
                    manage: ''
                },
            ],
            productcolumns: [
                {
                    title: '編號',
                    key: 'ordernum',
                    width: '60px'
                },
                {
                    title: '訂單編號',
                    key: 'actorderid',
                    width: '80px'
                },
                {
                    title: '會員帳號',
                    key: 'mememail',
                    width: '160px'

                },
                {
                    title: '活動名稱',
                    key: 'actname',
                    width: '140px'
                },
                {
                    title: '創建日期',
                    key: 'createdate',
                    width: '120px',
                },
                {
                    title: '訂單狀態',
                    key: 'actorderstate',
                    width: '100px',
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
                                on: {
                                    click: () => {
                                        this.show(params.index);// 查看功能寫在這
                                    }
                                }
                            }, '編輯'),
                        ]);

                    }
                },
            ],
            productdata: [
                {
                    ordernum: '1',
                    actorderid: '201',
                    mememail: 'abc12345@gmail.com',
                    actname: '油紙傘工作室1',
                    createdate: '2024.05.18',
                    actorderstate: '已完成',
                    manage: ''
                },
                {
                    ordernum: '1',
                    actorderid: '201',
                    mememail: 'abc12345@gmail.com',
                    actname: '油紙傘工作室1',
                    createdate: '2024.05.18',
                    actorderstate: '已完成',
                    manage: ''
                },
                {
                    ordernum: '1',
                    actorderid: '201',
                    mememail: 'abc12345@gmail.com',
                    actname: '油紙傘工作室1',
                    createdate: '2024.05.18',
                    actorderstate: '已完成',
                    manage: ''
                },
            ],
            customercolumns: [
                {
                    title: '編號',
                    key: '_index',
                    width: '60px',
                    render: (h, params) => {
                        return h('span', params.index + 1);  
                    }
                },
                {
                    title: '訂單編號',
                    key: 'actorderid',
                    width: '80px',
                    render: (h, params) => {
                        // 生成隨機數
                        const randomNum = Math.floor(Math.random() * 900) + 100;  
                        return h('span', params.row.actorderid || randomNum.toString());
                    }
                },
                {
                    title: '會員帳號',
                    key: 'ord_mail',
                    width: '160px'

                },
                {
                    title: '訂單狀態',
                    key: 'promo_state',
                    width: '140px',
                    render: (h, params) => {
                        switch (params.row.promo_state) {
                            case 0:
                                return h('span', '未出貨');
                            case 1:
                                return h('span', '已出貨');
                            case 2:
                                return h('span', '已完成');
                            default:
                                return h('span', '消失了');
                        }
                    }
                },
                {
                    title: '創建日期',
                    key: 'ord_date',
                    width: '120px',
                },
                {
                    title: '備註',
                    key: 'ord_note',
                    width: '100px',
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
                                onclick: () => {
                                        this.show(params.index);// 查看功能寫在這
                                    }
                                
                            }, '編輯'),
                        ]);

                    }
                },
            ],
            customerdata: [
                // {
                //     ordernum: '1',
                //     actorderid: '201',
                //     mememail: 'abc12345@gmail.com',
                //     actname: '油紙傘工作室1',
                //     createdate: '2024.05.18',
                //     actorderstate: '已完成',
                //     manage: ''
                // },
                // {
                //     ordernum: '1',
                //     actorderid: '201',
                //     mememail: 'abc12345@gmail.com',
                //     actname: '油紙傘工作室1',
                //     createdate: '2024.05.18',
                //     actorderstate: '已完成',
                //     manage: ''
                // },
                // {
                //     ordernum: '1',
                //     actorderid: '201',
                //     mememail: 'abc12345@gmail.com',
                //     actname: '油紙傘工作室1',
                //     createdate: '2024.05.18',
                //     actorderstate: '已完成',
                //     manage: ''
                // },
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
        fetch(`${import.meta.env.BASE_URL}adminmember.json`)
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

        // 資料庫載入客製化訂單
        customizedOrder(){
            const body = {}; 
            let url = path + 'customized_order.php';
            fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            })
            .then(res => {
                if (!res.ok) {
                    throw new Error('Network response was not ok ' + res.statusText);
                }
                return res.json();
            })
            .then(json => {
                this.customerdata = json["data"]["orders"];
                // console.log(this.customerdata); // 確認有沒有response
            })
            .catch(error => {
                console.error('There has been a problem with your fetch operation:', error);
            });
        },

    },

    mounted() {
        this.customizedOrder();
        
    }
}
</script>

<style lang="scss">
.order-manage {
    width: 100%;
    height: 100%;
    display: flex;

    .order-content {
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
                cursor:pointer;
            }
        }

        .order-input-box {
            display: flex;
            margin-top: 3%;
            justify-content: end;
            margin-right: 60px;
            gap: 2%;
            align-items: center;

            .filter {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 90px;
                height: 40px;
                border-radius: 10px;
                font-family: "Noto Serif HK", serif;
                font-size: 16px;
                background-color: #B1241A;
                color: white;
                border: none;
            }
        }

        .order-tab {
            width: 781px;
            text-align: center;
            margin: 3% auto 0;
            font-family: "Noto Serif HK", serif;
        }
    }
}
</style>