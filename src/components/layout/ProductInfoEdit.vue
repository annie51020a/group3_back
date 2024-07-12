<template>
    <Form class="product-info-form" ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
        <h3 class="product-info-title">編輯商品資訊</h3>

        <FormItem label="商品編號" prop="prod_id">
            <Input style="width: 400px;" v-model="formValidate.prod_id" disabled></Input>
        </FormItem>
        <FormItem label="創建時間" prop="startDate">
            <Input style="width: 400px;" v-model="formValidate.endDate" disabled></Input>
        </FormItem>

        <FormItem label="商品分類" prop="prod_category">
            <Input style="width: 400px;" v-model="formValidate.prod_category"></Input>
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
        <FormItem label="商品名稱" prop="prod_name">
            <Input style="width: 400px;" v-model="formValidate.prod_name"></Input>
        </FormItem>
        <FormItem label="費用" prop="prod_price">
            <Input style="width: 400px;" v-model="formValidate.prod_price"></Input>
        </FormItem>
        <FormItem label="商品描述" prop="prod_desc">
            <Input style="width: 400px;" v-model="formValidate.prod_desc"></Input>
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
import {path} from "../../../path.js";

export default {
    props: {
        prod_id: {
            type: String,
            required: true
        },
        fetchData: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            formValidate: {
                prod_id: '',
                startDate: '',
                prod_category: '',
                pictureFile: '',
                productImg: '',
                prod_name: '',
                prod_price: '',
                prod_desc: '',
            },
            productState: false,
            hotState: false,
        }
    },
    methods: {
        fetchMemberInfo() {
            console.log("Fetching data for prod_id:", this.prod_id);
            let url = path + 'prodInfoView.php';
            fetch(url + `?prod_id=${this.prod_id}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log("Received data:", data);
                    if (data.code === 200 && data.data) {
                        this.formValidate = {
                            prod_id: data.data.prod_id || '',
                            prod_category: data.data.prod_category || '',
                            prod_name: data.data.prod_name || '',
                            prod_price: data.data.prod_price || '',
                            prod_desc: data.data.prod_desc || '',
                        };
                    } else {
                        console.error("Error in data:", data.msg);
                    }
                })
                .catch(error => {
                    console.error('Error fetching member info:', error);
                })
                .finally(() => {
                    this.$emit('fetch-complete');
                });
        },
        handleSubmit(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    let url = path + 'prodInfoEdit.php';
                    fetch(url, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(this.formValidate)
                    })
                        .then(response => {
                            if (!response.ok) {
                                throw new Error('Network response was not ok');
                            }
                            return response.json();
                        })
                        .then(data => {
                            if (data.code === 200) {
                                this.$Message.success('保存成功!');
                            } else {
                                this.$Message.error('保存失敗: ' + data.msg);
                            }
                        })
                        .catch(error => {
                            console.error('Error updating member info:', error);
                            this.$Message.error('保存失敗!');
                        });
                } else {
                    this.$Message.error('保存失敗!');
                }
            });
        },
        cancel() {
            const productInfoBox = document.getElementById('product-edit');
            productInfoBox.style.display = 'none';
        },
    },
    watch: {
        prod_id: {
            immediate: true,
            handler(newVal) {
                if (newVal) {
                    this.fetchMemberInfo();
                }
            }
        }
    },
    mounted() {
        if (this.prod_id) {
            this.fetchMemberInfo();
        }
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