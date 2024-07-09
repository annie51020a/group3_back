<template>
    <section class="admin-manage">
        <MenuList />
        <div class="admin-content">
            <div class="title-box">
                <h1>後台人員管理</h1>
                <p>使用者:{{ store.$state.currentAccount }}</p>
                <button @click="memsignout()" class="sign-out">登出</button>
            </div>
            <button class="add-admin" @click="viewInfoBox()">+新增</button>

            <Table class="admin-table" stripe :columns="columns" :data="displayData"></Table>

            <!-- 刪除帳號小視窗 -->
            <div class="delete-box">
                <p>確認刪除此帳號?<br>刪除後將無法復原</p>
                <div class="button-box">
                    <button @click="cancelDelete()">取消</button>
                    <button>確認</button>
                </div>
            </div>

            <!-- 新增/編輯/查看帳號 -->
            <div class="admin-info-box" id="admin-new">
                <AdminInfoNew :emp_id="latestEmpId" :fetchData="shouldFetchData" @fetch-complete="onFetchComplete" />
            </div>
            <div class="admin-info-box" id="admin-edit">
                <AdminInfoEdit :emp_id="selectedEmpId" :fetchData="shouldFetchData" @fetch-complete="onFetchComplete" />
            </div>
            <div class="admin-info-box" id="admin-view">
                <AdminInfoView :emp_id="selectedEmpId" :fetchData="shouldFetchData" @fetch-complete="onFetchComplete" />
            </div>
        </div>
    </section>
</template>

<script>
import {path} from "../../../path.js";
import MenuList from '@/components/home/MenuList.vue';
import AdminInfoEdit from '@/components/layout/AdminInfoEdit.vue';
import AdminInfoView from '@/components/layout/AdminInfoView.vue';
import AdminInfoNew from '@/components/layout/AdminInfoNew.vue';
import { resolveComponent } from 'vue';
import { useAdminStore } from '@/store/adminState.js';

export default {
    components: {
        MenuList,
        AdminInfoEdit,
        AdminInfoView,
        AdminInfoNew,
    },
    data() {
        return {
            columns: [
                {
                    title: '編號',
                    key: 'emp_id',
                    width: '136px'
                },
                {
                    title: '帳號名稱',
                    key: 'emp_account',
                    width: '136px'
                },
                {
                    title: '密碼',
                    key: 'emp_password',
                    width: '136px'
                },
                {
                    title: '狀態',
                    key: 'emp_status',
                    width: '136px',
                    render: (h, params) => {
                        if (params.row.emp_status == '0') {
                            return h('div', [
                                h(resolveComponent('Button'), {
                                    type: 'default',
                                    size: 'large',
                                    style: {
                                        marginRight: '5px'
                                    },
                                    onClick: () => {
                                        const deleteBox = document.querySelector('.delete-box');
                                        deleteBox.style.display = "flex";
                                    }
                                }, '刪除'),
                            ]);
                        } else {
                            return null;//如果不是刪除的話就回傳null
                        }
                    }
                },
                {
                    title: '權限',
                    key: 'emp_authority',
                    width: '136px',
                    render: (h, params) => {
                        let authority = params.row.emp_authority === '1' ? '1' : '0';
                        let buttonText = '查看';
                        return h('div', [
                            h(resolveComponent('Button'), {
                                type: 'default',
                                size: 'large',
                                style: {
                                    marginRight: '5px'
                                },
                                onClick: () => {//編輯跟查看判斷式寫這
                                    if (authority === '1') {
                                        this.selectedEmpId = params.row.emp_id;
                                        const adminInfoBox = document.getElementById('admin-edit');
                                        adminInfoBox.style.display = "flex";
                                        buttonText = '編輯';
                                        this.shouldFetchData = true;
                                        console.log(this.selectedEmpId);
                                    } else {
                                        this.selectedEmpId = params.row.emp_id;
                                        const adminInfoBox = document.getElementById('admin-view');
                                        adminInfoBox.style.display = "flex";
                                        this.shouldFetchData = true;
                                        console.log(this.selectedEmpId);
                                    }
                                }
                            }, {
                                default() {
                                    if (authority === '1') {
                                        buttonText = '編輯';
                                        return buttonText;
                                    } else {
                                        return buttonText;
                                    }
                                }
                            }),
                        ]);
                    }
                }
            ],
            displayData: [],
            selectedEmpId: null, // 新增的變量，用來存儲選中的員工 ID
            latestEmpId: '',
        }
    },
    setup() {
        const store = useAdminStore();
        return {
            store
        }
    },
    mounted() {
        const body = {};
        let url = path + 'admin_getData.php';

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
        async memLogin() {
            try {
                const store = useAdminStore(); // 獲取 Pinia store

                // 構建 body
                const body = {
                    account: this.textData,
                    password: this.pswData
                };

                let url = path + 'loginData.php';

                const response = await fetch(url, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(body)
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }

                const users = await response.json();

                const loggedInUser = users.find(u => u.emp_account === this.textData && u.emp_password === this.pswData);
                if (loggedInUser) {
                    store.setCurrentUser(loggedInUser); // 設置當前用戶到 Pinia
                    alert("登入成功!");
                    this.textData = '';
                    this.pswData = '';
                    this.$router.push('/newsmanage');
                } else {
                    alert("帳號或密碼錯誤!");
                    this.textData = '';
                    this.pswData = '';
                }
            } catch (error) {
                console.error('登入失敗:', error);
                alert('登入失敗');
            }
        },
        async memsignout() {
            try {
                const store = useAdminStore(); // 獲取 Pinia store

                store.clearCurrentUser(); // 清除當前用戶
                alert("已登出");
                this.$router.push('/');

            } catch (error) {
                console.error('發生錯誤:', error);
                alert('發生錯誤');
            }
        },
        cancelDelete() {
            const deleteBox = document.querySelector('.delete-box');
            deleteBox.style.display = "none";
        },
        async viewInfoBox() {
            try {
                // 发起获取最新员工 ID 的请求
                let url = path + 'getLatestID.php';
                
                const response = await fetch(url);
                const data = await response.json();

                if (data.code === 200 && data.data && data.data.latest_id) {
                    const latestEmpId = data.data.latest_id + 1; // 获取最新 ID 并加一
                    this.latestEmpId = latestEmpId; // 将最新 ID 设置到当前组件的 latestEmpId

                    // 显示新增帐号信息框
                    this.showAdminNew = true;
                    this.shouldFetchData = true; // 标记需要重新获取数据
                    const adminInfoBox = document.getElementById('admin-new');
                    adminInfoBox.style.display = "flex";
                } else {
                    console.error('Failed to fetch latest ID or no data found:', data.msg);
                }
            } catch (error) {
                console.error('Error in viewInfoBox:', error);
            }
        },

        onFetchComplete() {
            this.shouldFetchData = false;
        },
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
                cursor: pointer;
            }
        }

        .add-admin {
            width: 125px;
            height: 50px;
            border-radius: 20px;
            background-color: white;
            border: 1px solid black;
            margin: 3% 0 3% 10%;
            cursor: pointer;
        }

        .admin-table {
            width: 681px;
            // height: 200px;
            text-align: center;
            margin: 0 auto;
            font-size: 24px;
            font-family: "Noto Serif HK", serif;
        }

        .delete-box {
            display: none;
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
            left: 40%;
            top: 20%;
            border-radius: 20px;
            z-index: 5;
        }
    }
}
</style>