<template>
    <section class="customer-manage">
        <MenuList />
        <div class="customer-content">
            <div class="title-box">
                <h1>客服管理</h1>
                <p>使用者:{{ store.$state.currentAccount }}</p>
                <button class="sign-out" @click="memsignout()">登出</button>
            </div>

            <div class="input-box">
                <button class="add-activity">+新增</button>
                <Space direction="vertical" size="large"><!-- 搜尋活動 -->
                    <Space>
                        <Input prefix="ios-search" placeholder="輸入關鍵字" style="width: 200px" />
                    </Space>
                </Space>
            </div>
            <Table class="customer-table" stripe :columns="columns" :data="data"></Table><!-- 表格 -->
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
                    title: '回答編號',
                    key: 'csid',
                    width: '120px'
                },
                {
                    title: '回答關鍵字',
                    key: 'cskeywords',
                    width: '120px'
                },
                {
                    title: '回答內容',
                    key: 'cstext',
                    width: '300px'
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
                {
                    title: '刪除',
                    key: 'delete',
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
                            }, '刪除'),
                        ]);

                    }
                },
            ],
            data: [
                {
                    csid: '1',
                    cskeywords: '購買方式',
                    cstext: '您可以在我們的線上商店或實體店鋪購買油紙傘。價格取決於傘的尺寸、設計和材料。歡迎前來參觀或在網站上訂購。',
                    manage: '',
                    delete: '',
                },
                {
                    csid: '2',
                    cskeywords: '購買方式',
                    cstext: '您可以在我們的線上商店或實體店鋪購買油紙傘。價格取決於傘的尺寸、設計和材料。歡迎前來參觀或在網站上訂購。',
                    manage: '',
                    delete: '',
                },
                {
                    csid: '3',
                    cskeywords: '購買方式',
                    cstext: '您可以在我們的線上商店或實體店鋪購買油紙傘。價格取決於傘的尺寸、設計和材料。歡迎前來參觀或在網站上訂購。',
                    manage: '',
                    delete: '',
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
.customer-manage {
    width: 100%;
    height: 100%;
    display: flex;

    .customer-content {
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
            gap: 35%;

            .add-activity {
                width: 125px;
                height: 50px;
                border-radius: 20px;
                background-color: white;
                border: 1px solid black;
            }
        }

        .customer-table {
            width: 781px;
            text-align: center;
            margin: 3% auto 0;
            font-family: "Noto Serif HK", serif;
        }
    }
}
</style>