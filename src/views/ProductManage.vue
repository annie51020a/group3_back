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

            <Table class="product-table" stripe :columns="columns" :data="data"></Table><!-- 表格 -->

            <!-- 新增/編輯活動 -->
            <div class="product-info-box" id="product-edit">
                <ProductInfoEdit />
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
                    key: 'prodid',
                    width: '80px'
                },
                {
                    title: '商品分類',
                    key: 'prodcategory',
                    width: '80px'
                },
                {
                    title: '商品圖片1',
                    key: 'prodimg1',
                    width: '120px'

                },
                {
                    title: '商品名稱',
                    key: 'prodname',
                    width: '100px'
                },
                {
                    title: '商品價格',
                    key: 'prodprice',
                    width: '90px',
                },
                {
                    title: '商品描述',
                    key: 'proddesc',
                    width: '120px',
                },
                {
                    title: '商品編輯',
                    key: 'edit',
                    width: '95px',
                    render: (h) => {
                        return h('div', [
                            h(resolveComponent('Button'), {
                                type: 'default',
                                size: 'large',
                                style: {
                                    marginRight: '5px'
                                },
                                onclick: () => {
                                    const productEdit = document.getElementById('product-edit');
                                    productEdit.style.display = "flex";
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
            data: [
                {
                    prodid: '1',
                    prodcategory: '圖案',
                    prodimg1: '商品圖片1',
                    prodname: '數字精緻手工油紙傘',
                    prodprice: 'NT$699',
                    proddesc: '手工繪製數字圖案油紙傘，經典設計，適合收藏與實用。',
                    edit: '編輯',
                    delete: '刪除',
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
        productNew() {
            const productEdit = document.getElementById('product-edit');
            productEdit.style.display = "flex";
        },
        cancelDelete() {
            const deleteBox = document.querySelector('.delete-box');
            deleteBox.style.display = "none";
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
            width: 781px;
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