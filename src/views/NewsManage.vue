<template>
  <section class="news-manage">
    <MenuList />
    <div class="news-content">
      <div class="title-box">
        <h1>最新消息管理</h1>
        <p>使用者:{{ store.$state.currentAccount }}</p>
        <button class="sign-out" @click="memsignout()">登出</button>
      </div>

      <div class="input-box">
        <button class="add-news">+新增</button>
        <Space direction="vertical" size="large"><!-- 搜尋活動 -->
          <Space>
            <Input prefix="ios-search" placeholder="輸入關鍵字" style="width: 200px" />
          </Space>
        </Space>
      </div>

      <Table class="news-table" stripe :columns="columns" :data="data"></Table><!-- 表格 -->
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
          title: '編號',
          key: 'newsid',
          width: '60px'
        },
        {
          title: '消息圖片',
          key: 'newspic',
          width: '60px'
        },
        {
          title: '消息標題',
          key: 'newstitle',
          width: '120px'

        },
        {
          title: '消息分類',
          key: 'newsclass',
          width: '120px'
        },
        {
          title: '消息內容',
          key: 'newscontent',
          width: '120px',
        },
        {
          title: '上傳時間',
          key: 'createdate',
          width: '100px',
        },
        {
          title: '狀態',
          key: 'state',
          width: '100px',
          render: (h, params) => {
            return h(resolveComponent('Switch'), {
              modelValue: params.row.status,
              'onUpdate:modelValue': (value) => {
                this.handleStatusChange(params.row, value);
              }
            });
          }
        },
        {
          title: '管理',
          key: 'manange',
          width: '100px',

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
          newsid: '1',
          newspic: '消息圖片',
          newstitle: '高雄市油紙傘...',
          newsclass: '舉辦活動（工...',
          newscontent: '傳統油紙傘開...',
          createdate: '2023.06.01',
          state: '',
          manage: '',
        },
        {
          newsid: '1',
          newspic: '消息圖片',
          newstitle: '高雄市油紙傘...',
          newsclass: '舉辦活動（工...',
          newscontent: '傳統油紙傘開...',
          createdate: '2023.06.01',
          state: '',
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
.news-manage {
  width: 100%;
  height: 100%;
  display: flex;

  .news-content {
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
      gap: 35%;
      align-items: center;

      .add-news {
        width: 125px;
        height: 50px;
        border-radius: 20px;
        background-color: white;
        border: 1px solid black;
      }
    }

    .news-table {
      width: 781px;
      text-align: center;
      margin: 3% auto 0;
      font-family: "Noto Serif HK", serif;
    }
  }
}
</style>