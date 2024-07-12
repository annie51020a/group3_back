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

                <button class="add-activity" @click="viewInfoBoxActivity()">+新增</button>
            </div>

            <Table class="activity-table" stripe height=350 :columns="columns" :data="displayData"></Table><!-- 表格 -->
        </div>

        <!-- 新增/編輯活動 -->
        <div class="activity-info-box" id="activity-edit">
            <ActivityInfoEdit :act_id="selectedactId" :fetchData="shouldFetchData" @fetch-complete="onFetchComplete"/>
        </div>

        <div class="activity-info-box" id="activity-new">
            <ActivityInfoNew />
        </div>

        <div class="activity-info-box" id="activity-member-list">
            <ActivityMemberList />
        </div>

    </section>


</template>

<script>

import MenuList from '@/components/home/MenuList.vue';
import ActivityInfoEdit from '@/components/layout/ActivityInfoEdit.vue';
import ActivityInfoNew from '@/components/layout/ActivityInfoNew.vue';
import ActivityMemberList from '@/components/layout/ActivityMemberList.vue';

import { resolveComponent } from 'vue';
import { useAdminStore } from '@/store/adminState.js';
import {path} from '../../path.js';



export default {
    components: {
        MenuList,
        ActivityInfoEdit,
        ActivityInfoNew,
        ActivityMemberList,
    },
    data() {
        return {
            columns: [
                {
                    title: '活動名稱',
                    key: 'act_name',
                    width: '120px'
                },
                {
                    title: '費用',
                    key: 'act_price',
                    width: '100px'
                },
                {
                    title: '地點',
                    key: 'act_loc',
                    width: '120px'

                },
                {
                    title: '活動狀態',
                    key: 'act_state',
                    width: '100px'
                },
                {
                    title: '報名人數',
                    key: 'mem_num',
                    width: '100px',
                },
                {
                    title: '名單',
                    key: 'mem_list',
                    width: '120px',
                    render: (h) => {
                        return h('div', [
                            h(resolveComponent('Button'), {
                                type: 'default',
                                size: 'large',
                                style: {
                                    marginRight: '5px'
                                },
                                onClick: () => {
                                        const activityMemberList = document.getElementById('activity-member-list');
                                        activityMemberList.style.display = "flex";
                                    }
                            }, '查看'),
                        ]);

                    }
                },
                {
                    title: '管理',
                    key: 'manage',
                    width: '120px',

                    render: (h,params) => {

                        return h('div', [
                            h(resolveComponent('Button'), {
                                type: 'default',
                                size: 'large',
                                style: {
                                    marginRight: '5px'
                                },
                                onClick: () => {
                                    this.selectedactId = params.row.act_id;
                                    const viewInfoBoxActivity = document.getElementById('activity-edit');
                                    viewInfoBoxActivity.style.display = "flex";
                                    this.shouldFetchData = true;
                                    console.log(this.selectedactId);
                                }
                            }, '編輯'),
                        ]);
                    }
                }
            ],
            // data: [
            //     {
            //         actname: '傳統油紙傘創意體驗',
            //         actprice: 'NT$300 / 人',
            //         actloc: '高雄市前鎮區中華五路123號5樓',
            //         actstate: '進行中',
            //         memnum: '1/8',
            //         memlist: '',
            //         manage: '',
            //     },
            //     {
            //         actname: '傳統油紙傘創意體驗',
            //         actprice: 'NT$300 / 人',
            //         actloc: '高雄市前鎮區中華五路123號5樓',
            //         actstate: '進行中',
            //         memnum: '1/8',
            //         memlist: '',
            //         manage: '',
            //     },
            //     {
            //         actname: '傳統油紙傘創意體驗',
            //         actprice: 'NT$300 / 人',
            //         actloc: '高雄市前鎮區中華五路123號5樓',
            //         actstate: '進行中',
            //         memnum: '1/8',
            //         memlist: '',
            //         manage: '',
            //     },
            // ],
            displayData: [],
            selectedactId: null, // 新增的變量，用來存儲選中的員工 ID

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
        let url = path + 'activity_getData.php';

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
        viewInfoBoxActivity(){
            const viewInfoBox = document.getElementById('activity-new');
            viewInfoBox.style.display = "flex";
        },
        onFetchComplete() {
            this.shouldFetchData = false;
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
                cursor: pointer;

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
                cursor: pointer;
            }
        }

        .activity-table {
            width: 800px;
            text-align: center;
            margin: 3% auto 0;
            font-family: "Noto Serif HK", serif;
        }
    }

    .activity-info-box {
        display: none;
        background-color: #FFF6EA;
        position: absolute;
        left: 40%;
        top: 0%;
        border-radius: 20px;
        z-index: 5;
    }
    #activity-member-list{
        top: 20%;
    }
}
</style>