<template>
    <Form class="product-info-form" ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
        <h3 class="product-info-title">編輯商品資訊</h3>

        <FormItem label="商品編號" prop="productId">
            <Input style="width: 400px;" v-model="formValidate.startDate" disabled></Input>
        </FormItem>
        <FormItem label="創建時間" prop="startDate">
            <Input style="width: 400px;" v-model="formValidate.endDate" disabled></Input>
        </FormItem>

        <FormItem label="商品分類" prop="productCategory">
            <Input style="width: 400px;" v-model="formValidate.actName"></Input>
        </FormItem>
        <FormItem label="圖片檔案" prop="pictureFile">
            <Button>選擇圖片檔案</Button>
            <Input style="width: 285px;" v-model="formValidate.pictureFile"></Input>
        </FormItem>
        <FormItem label="商品圖片" prop="productImg">
            <div class="product-img-box">
                <div class="product-img-preview1"></div>
                <div class="product-img-preview2"></div>
                <div class="product-img-preview3"></div>
            </div>
        </FormItem>
        <FormItem label="商品名稱" prop="productName">
            <Input style="width: 400px;" v-model="formValidate.actDate"></Input>
        </FormItem>
        <FormItem label="費用" prop="productPrice">
            <Input style="width: 400px;" v-model="formValidate.sessTime"></Input>
        </FormItem>
        <FormItem label="商品描述" prop="productComment">
            <Input style="width: 400px;" v-model="formValidate.actPrice"></Input>
        </FormItem>
        <div class="product-state">
            <p>商品狀態</p>
            <Switch v-model="productState" @on-change="changeProductState">
                <template #open>
                    上架
                </template>
                <template #close>
                    下架
                </template>
            </Switch>
        </div>
        <div class="hot-state">
            <p>暢銷狀態</p>
            <Switch v-model="hotState" @on-change="changeHotState">
                <template #open>
                    暢銷
                </template>
                <template #close>
                    一般
                </template>
            </Switch>
        </div>

        <FormItem class="product-button-box">
            <Button type="primary" @click="handleSubmit('formValidate')">保存</Button>
            <Button @click="cancel()" style="margin-left: 8px">取消</Button>
        </FormItem>
    </Form>
</template>
<script>
export default {
    data() {
        return {
            formValidate: {
                productId: '',
                startDate: '',
                productCategory: '',
                pictureFile: '',
                productImg: '',
                productName: '',
                productPrice: '',
                productComment: '',
            },
            productState: false,
            hotState: false,
        }
    },
    methods: {
        handleSubmit(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.$Message.success('Success!');
                } else {
                    this.$Message.error('Fail!');
                }
            })
        },
        cancel() {
            const productInfoBox = document.getElementById('product-edit');
            productInfoBox.style.display = 'none';
        },

    }
}
</script>

<style lang="scss">
.ivu-form-item {
    margin-bottom: 5px;
}

.product-info-form {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: center;
    align-items: flex-start;
    width: 600px;
    height: 600px;

    >h3 {
        margin-bottom: 30px;
        text-align: center;
        width: 100%;
    }

    .sign-up-box {
        display: flex;
    }

    .product-button-box {
        .ivu-form-item-content {
            margin-right: 120px;
            display: flex;
            justify-content: center;
        }

        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .dropdown-category {
        display: flex;
        margin-bottom: 5px;

        >span {
            width: 120px;
            text-align: right;
            vertical-align: middle;
            float: left;
            font-size: 14px;
            color: #515a6e;
            line-height: 1;
            padding: 10px 12px 10px 0;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
        }

        .ivu-dropdown-rel {
            display: inline-block;
            width: 400px;
            height: 32px;
            line-height: 1.5;
            padding: 4px 7px;
            font-size: 14px;
            border: 1px solid #dcdee2;
            border-radius: 4px;
            color: #515a6e;
            background-color: #fff;
            background-image: none;
            position: relative;
        }

        .category-list {
            width: 400px;
        }
    }

    .dropdown-state {
        display: flex;
        margin-bottom: 5px;

        >span {
            width: 120px;
            text-align: right;
            vertical-align: middle;
            float: left;
            font-size: 14px;
            color: #515a6e;
            line-height: 1;
            padding: 10px 12px 10px 0;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
        }

        .ivu-dropdown-rel {
            display: inline-block;
            width: 400px;
            height: 32px;
            line-height: 1.5;
            padding: 4px 7px;
            font-size: 14px;
            border: 1px solid #dcdee2;
            border-radius: 4px;
            color: #515a6e;
            background-color: #fff;
            background-image: none;
            position: relative;
        }

        .state-list {
            width: 400px;
            display: none;
        }
    }

    .product-img-box {
        display: flex;
        gap: 5px;

        .product-img-preview1 {
            width: 70px;
            height: 70px;
            border-radius: 10px;
            background-color: #fff;
            border: 1px solid #515a6e;
        }

        .product-img-preview2 {
            width: 70px;
            height: 70px;
            border-radius: 10px;
            background-color: #fff;
            border: 1px solid #515a6e;
        }

        .product-img-preview3 {
            width: 70px;
            height: 70px;
            border-radius: 10px;
            background-color: #fff;
            border: 1px solid #515a6e;
        }
    }

    .hot-state,
    .product-state {
        display: flex;
        align-items: center;

        >p {
            width: 120px;
            text-align: right;
            vertical-align: middle;
            float: left;
            font-size: 14px;
            color: #515a6e;
            line-height: 1;
            padding: 10px 12px 10px 0;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
        }

        >span {
            width: 60px;
        }

        .ivu-switch-checked:after {
            left: 38px;
        }
    }

}
</style>