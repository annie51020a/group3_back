<template>
    <section class="admin-manage">
        <MenuList />
        <div class="admin-content">
            <div class="title-box">
                <h1>後台人員管理</h1>
                <p>使用者:123</p>
                <button class="sign-out">登出</button>
            </div>
            <button class="add-admin">+新增</button>

            <Table class="admin-table" stripe :columns="columns" :data="data"></Table>


            <!-- 刪除帳號小視窗 -->
            <div class="delete-box">
                <p>確認刪除此帳號?<br>刪除後將無法復原</p>
                <div class="button-box">
                    <button>取消</button>
                    <button>確認</button>
                </div>
            </div>

            <!-- 新增/編輯/查看帳號 -->
            <div class="admin-info-box">
                <AdminInfoBox />
            </div>


        </div>
    </section>
</template>

<script>

import MenuList from '@/components/home/MenuList.vue';
import AdminInfoBox from '@/components/layout/AdminInfoBox.vue';
import { resolveComponent } from 'vue';

export default {
    components: {
        MenuList,
        AdminInfoBox,
    },
    data() {
        return {
            columns: [
                {
                    title: '編號',
                    key: 'id',
                    width: '80px'
                },
                {
                    title: '員工ID',
                    key: 'adminid',
                    width: '120px'
                },
                {
                    title: '帳號名稱',
                    key: 'account',
                    width: '120px'

                },
                {
                    title: '密碼',
                    key: 'password',
                    width: '120px'
                },
                {
                    title: '狀態',
                    key: 'status',
                    width: '120px',

                    render: (h, params) => {

                        if (params.row.status == '刪除') {
                            return h('div', [
                                h(resolveComponent('Button'), {
                                    type: 'default',
                                    size: 'large',
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.show(params.index);// 刪除功能寫在這
                                        }
                                    }
                                }, '刪除'),
                            ]);
                        }
                        else {
                            return null;//如果不是刪除的話就回傳null
                        };
                    }
                },
                {
                    title: '權限',
                    key: 'permission',
                    width: '120px',

                    render: (h, params) => {
                        let buttonText = params.row.permission === '編輯' ? '編輯' : '查看';

                        return h('div', [
                            h(resolveComponent('Button'), {
                                type: 'default',
                                size: 'large',
                                style: {
                                    marginRight: '5px'
                                },
                                onClick: () => {
                                    this.show(params.index)//編輯跟查看判斷式寫這
                                }
                            }, {
                                default() {
                                    return buttonText
                                }
                            }),
                        ]);
                    }
                }
            ],
            data: [
                {
                    id: '1',
                    adminid: 'DKJ2501',
                    account: 'admin01',
                    password: '11111111',
                    status: '',
                    permission: '編輯'
                },
                {
                    id: '2',
                    adminid: 'DKJ2502',
                    account: 'admin02',
                    password: '22222222',
                    status: '刪除',
                    permission: '查看'
                },
                {
                    id: '3',
                    adminid: 'DKJ2503',
                    account: 'admin03',
                    password: '33333333',
                    status: '刪除',
                    permission: '查看'
                },
            ]
        }
    },
    methods: {

    },
}
</script>

<style lang="scss">
.admin-manage {
    width: 100%;
    height: 100%;
    display: flex;

    .admin-content {
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

        .add-admin {
            width: 125px;
            height: 50px;
            border-radius: 20px;
            background-color: white;
            border: 1px solid black;
            margin: 3% 0 3% 10%;
        }

        .admin-table {
            width: 681px;
            text-align: center;
            margin: 0 auto;
            font-size: 24px;
            font-family: "Noto Serif HK", serif;
        }

        .delete-box {
            display: none; //用click display:flex
            flex-direction: column;
            justify-content: space-evenly;
            align-items: center;
            width: 200px;
            height: 170px;
            background-color: #FFF6EA;
            font-size: 24px;
            font-family: "Noto Serif HK", serif;
            margin: auto;
            position: absolute;
            top: 50%;
            left: 55%;
            z-index: 5;

            .button-box {
                display: flex;
                gap: 20px;

                >button {
                    display: flex;
                    justify-content: center;
                    text-align: center;
                    width: 50px;
                    font-size: 16px;
                    background-color: #FFF6EA;
                    border: 1px solid #B1241A;
                    border-radius: 20px;
                }
            }
        }

        .admin-info-box {
            display: none;
            background-color: #FFF6EA;
            position: absolute;
            left: 45%;
            top: 20%;
            border-radius: 20px;
        }
    }
}
</style>