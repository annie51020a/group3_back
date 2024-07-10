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

      <Table class="news-table" stripe height=350 :columns="columns" :data="displayData"></Table><!-- 表格 -->
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
          title: '編號',
          key: 'news_id',
          width: '60px'
        },
        {
          title: '消息圖片',
          key: 'news_pic',
          width: '60px'
        },
        {
          title: '消息標題',
          key: 'news_title',
          width: '120px'

        },
        {
          title: '消息分類',
          key: 'news_class',
          width: '120px'
        },
        {
          title: '消息內容',
          key: 'news_content',
          width: '400px',
        },
        {
          title: '上傳時間',
          key: 'news_date',
          width: '100px',
        },
        {
          title: '狀態',
          key: 'news_state',
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
      // data: [
      //   {
      //     newsid: '1',
      //     newspic: '消息圖片',
      //     newstitle: '高雄市油紙傘...',
      //     newsclass: '舉辦活動（工...',
      //     newscontent: '傳統油紙傘開...',
      //     createdate: '2023.06.01',
      //     state: '',
      //     manage: '',
      //   },
      //   {
      //     newsid: '1',
      //     newspic: '消息圖片',
      //     newstitle: '高雄市油紙傘...',
      //     newsclass: '舉辦活動（工...',
      //     newscontent: '傳統油紙傘開...',
      //     createdate: '2023.06.01',
      //     state: '',
      //     manage: '',
      //   },
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
    let url = path + 'news_getData.php';

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
        cursor: pointer;

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
        cursor: pointer;
      }
    }

    .news-table {
      width: 800px;
      text-align: center;
      margin: 3% auto 0;
      font-family: "Noto Serif HK", serif;
    }
  }
}
</style>