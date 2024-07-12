<template>
    <section class="product-manage">
        <MenuList />
        <div class="product-content">
            <div class="title-box">
                <h1>商品管理</h1>
                <p>使用者:{{ store.$state.currentAccount }}</p>
                <button class="sign-out" @click="memsignout()">登出</button>
            </div>

            <div class="input-box">
                <button class="add-product" @click="productNew()">+新增</button>
                <Space direction="vertical" size="large"><!-- 搜尋活動 -->
                    <Space>
                        <Input prefix="ios-search" placeholder="輸入關鍵字" style="width: 200px" />
                    </Space>
                </Space>
            </div>

            <Table class="product-table" stripe height=350 :columns="columns" :data="displayData"></Table><!-- 表格 -->

            <!-- 新增/編輯活動 -->
            <div class="product-info-box" id="product-edit">
                <ProductInfoEdit :prod_id="selectedprodId" :fetchData="shouldFetchData" @fetch-complete="onFetchComplete"/>
            </div>

            <div class="product-info-box" id="product-new">
                <ProductInfoNew />
            </div>

            <div class="product-info-box" id="product-delete">

            </div>

            <!-- 刪除帳號小視窗 -->
            <div class="delete-box">
                <p>確認刪除此帳號?<br>刪除後將無法復原</p>
                <div class="button-box">
                    <button @click="cancelDelete()">取消</button>
                    <button>確認</button>
                </div>
            </div>
        </div>
    </section>
</template>

<script>

import MenuList from '@/components/home/MenuList.vue';
import { resolveComponent } from 'vue';
import { useAdminStore } from '@/store/adminState.js';
import ProductInfoEdit from '@/components/layout/ProductInfoEdit.vue';
import ProductInfoNew from '@/components/layout/ProductInfoNew.vue';
import {path} from '../../path.js';

export default {
    components: {
        MenuList,
        ProductInfoEdit,
        ProductInfoNew,
    },
    data() {
        return {
            columns: [
                {
                    title: '商品編號',
                    key: 'prod_id',
                    width: '80px'
                },
                {
                    title: '商品分類',
                    key: 'prod_category',
                    width: '80px'
                },
                {
                    title: '商品圖片1',
                    key: 'prod_img1',
                    width: '120px'

                },
                {
                    title: '商品名稱',
                    key: 'prod_name',
                    width: '100px'
                },
                {
                    title: '商品價格',
                    key: 'prod_price',
                    width: '90px',
                },
                {
                    title: '商品描述',
                    key: 'prod_desc',
                    width: '400px',
                },
                {
                    title: '商品編輯',
                    key: 'edit',
                    width: '95px',
                    render: (h,params) => {
                        return h('div', [
                            h(resolveComponent('Button'), {
                                type: 'default',
                                size: 'large',
                                style: {
                                    marginRight: '5px'
                                },
                                onclick: () => {
                                    this.selectedprodId = params.row.prod_id;
                                    const productEdit = document.getElementById('product-edit');
                                    productEdit.style.display = "flex";
                                    this.shouldFetchData = true;
                                    console.log(this.selectedprodId);
                                }
                            }, '編輯'),
                        ]);
                    }
                },
                {
                    title: '商品刪除',
                    key: 'delete',
                    width: '95px',

                    render: (h) => {

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
                    }
                }
            ],
            // data: [
            //     {
            //         prodid: '1',
            //         prodcategory: '圖案',
            //         prodimg1: '商品圖片1',
            //         prodname: '數字精緻手工油紙傘',
            //         prodprice: 'NT$699',
            //         proddesc: '手工繪製數字圖案油紙傘，經典設計，適合收藏與實用。',
            //         edit: '編輯',
            //         delete: '刪除',
            //     },
            // ]
            displayData: [],
            selectedprodId: null, // 新增的變量，用來存儲選中的員工 ID
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
        let url = path + 'prod_getData.php';

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
        productNew() {
            const productEdit = document.getElementById('product-edit');
            productEdit.style.display = "flex";
        },
        cancelDelete() {
            const deleteBox = document.querySelector('.delete-box');
            deleteBox.style.display = "none";
        },
        onFetchComplete() {
            this.shouldFetchData = false;
        },
    }
}
</script>

<style lang="scss">
.product-manage {
    width: 100%;
    height: 100%;
    display: flex;

    .product-content {
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

            .add-product {
                width: 125px;
                height: 50px;
                border-radius: 20px;
                background-color: white;
                border: 1px solid black;
                cursor: pointer;
            }
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

        .product-table {
            width: 800px;
            text-align: center;
            margin: 3% auto 0;
            font-family: "Noto Serif HK", serif;
        }
    }

    .product-info-box {
        display: none;
        background-color: #FFF6EA;
        position: absolute;
        left: 40%;
        top: 0%;
        border-radius: 20px;
        z-index: 5;
    }
}
</style>