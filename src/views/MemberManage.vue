<template>
    <section class="member-manage">
        <MenuList />
        <div class="member-content">
            <div class="title-box">
                <h1>會員管理</h1>
                <p>使用者:{{ store.$state.currentAccount }}</p>
                <button class="sign-out" @click="memsignout()">登出</button>
            </div>
            <div class="member-input-box">
                <Space direction="vertical" size="large"><!-- 搜尋活動 -->
                    <Space>
                        <Input prefix="ios-search" placeholder="輸入關鍵字" style="width: 200px" />
                    </Space>
                </Space>
            </div>

            <Table class="member-table" stripe :columns="columns" :data="data"></Table><!-- 表格 -->
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
                    title: '會員編號',
                    key: 'memid',
                    width: '120px'
                },
                {
                    title: '帳號/信箱',
                    key: 'mememail',
                    width: '170px'
                },
                {
                    title: '姓名',
                    key: 'memname',
                    width: '120px'

                },
                {
                    title: '連絡電話',
                    key: 'memtel',
                    width: '130px'
                },
                {
                    title: '創建日期',
                    key: 'memcreate',
                    width: '120px',
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
                            }, '查看'),
                        ]);

                    }
                },
            ],
            data: [
                {
                    memid: '1',
                    mememail: 'asd@gmail.com',
                    memname: '雄問安',
                    memtel: '0912345678',
                    memcreate: '2024.01.01',
                    manage: '',
                },
                {
                    memid: '1',
                    mememail: 'asd@gmail.com',
                    memname: '雄問安',
                    memtel: '0912345678',
                    memcreate: '2024.01.01',
                    manage: '',
                },
                {
                    memid: '1',
                    mememail: 'asd@gmail.com',
                    memname: '雄問安',
                    memtel: '0912345678',
                    memcreate: '2024.01.01',
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
    }
}
</script>

<style lang="scss">
.member-manage {
    width: 100%;
    height: 100%;
    display: flex;

    .member-content {
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

        .member-input-box {
            display: flex;
            margin-top: 3%;
            justify-content: end;
            margin-right: 70px;
            gap: 35%;
            align-items: center;
        }

        .member-table {
            width: 781px;
            text-align: center;
            margin: 3% auto 0;
            font-family: "Noto Serif HK", serif;
        }
    }
}
</style>