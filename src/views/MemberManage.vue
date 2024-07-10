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

            <Table class="member-table" stripe height=350 :columns="columns" :data="displayData"></Table><!-- 表格 -->
        </div>
    </section>
</template>

<script>

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
            columns: [
                {
                    title: '會員編號',
                    key: 'mem_id',
                    width: '120px'
                },
                {
                    title: '帳號/信箱',
                    key: 'mem_email',
                    width: '170px'
                },
                {
                    title: '姓名',
                    key: 'mem_name',
                    width: '120px'

                },
                {
                    title: '連絡電話',
                    key: 'mem_tel',
                    width: '130px'
                },
                {
                    title: '創建日期',
                    key: 'mem_create',
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
            // data: [
            //     {
            //         memid: '1',
            //         mememail: 'asd@gmail.com',
            //         memname: '雄問安',
            //         memtel: '0912345678',
            //         memcreate: '2024.01.01',
            //         manage: '',
            //     },
            //     {
            //         memid: '1',
            //         mememail: 'asd@gmail.com',
            //         memname: '雄問安',
            //         memtel: '0912345678',
            //         memcreate: '2024.01.01',
            //         manage: '',
            //     },
            //     {
            //         memid: '1',
            //         mememail: 'asd@gmail.com',
            //         memname: '雄問安',
            //         memtel: '0912345678',
            //         memcreate: '2024.01.01',
            //         manage: '',
            //     },
            // ]
            displayData: [],

        }
    },
    setup() {
        const store = useAdminStore();
        return {
            store,
        }
    },
    mounted() {
        const body = {};
        let url = path + 'member_getData.php';

        fetch(url, {
            method: "POST",
            body: JSON.stringify(body)
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error('Network response was not ok ' + res.statusText);
                }
                return res.json();
            })
            .then(json => {
                // 確認有沒有response
                console.log(json);
                // 備份還原用
                this.responseData = json["data"]["list"];
                // 顯示用
                this.displayData = json["data"]["list"];
            })
            .catch(error => {
                console.error('There has been a problem with your fetch operation:', error);
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
                cursor: pointer;
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
            width: 800px;
            text-align: center;
            margin: 3% auto 0;
            font-family: "Noto Serif HK", serif;
        }
    }
}
</style>