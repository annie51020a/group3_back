<template>
    <section class="login-page">
        <div class="login-box-admin">
            <div class="bac-img-box">
                <img class="bac-left" src="@/assets/pic/login/background-img-left.png" alt="">
                <img class="bac-right" src="@/assets/pic/login/background-img-right.png" alt="">
            </div>

            <img src="@/assets/pic/login/logo.png" alt="" />
            <div class="memberid-box">
                <img src="@/assets/pic/login/memid-icon.png" alt="" />
                <input class="memberid" name="memId" type="text" placeholder="請輸入帳號" v-model="textData" />
            </div>
            <div class="password-box">
                <img src="@/assets/pic/login/pwd-icon.png" alt="" />
                <input class="password" name="memPsw" type="password" placeholder="請輸入密碼" maxlength="12" minlength="6"
                    v-model="pswData" />
            </div>
            <button>登入</button>
        </div>
    </section>
</template>

<script setup></script>

<style lang="scss">
.login-page {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background-color: #b1241a;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: -2;

    .login-box-admin {
        width: 60%;
        height: 65%;
        background-color: #FFFBF6;
        border-radius: 20px;
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        z-index: 1;

        .bac-img-box {
            width: 100%;
            height: 100%;
            position: absolute;
            z-index: -1;

            >img {
                width: 100%;
            }

            .bac-left {
                position: absolute;
                left: -35%;
                top: -35%;
            }

            .bac-right {
                position: absolute;
                right: -35%;
                bottom: -35%;
            }
        }

        >img {
            width: 25%;
            margin: 6% auto 0 auto;
        }

        .memberid-box {
            display: flex;
            align-items: center;
            margin: 4% auto 1% auto;

            >img {
                width: 40px;
                margin-right: 5%;
            }

            >input {
                border-radius: 10px;
                border: 1px solid #CB2E27;
                width: 300px;
                height: 40px;
                padding-left: 5%;
            }
        }

        .password-box {
            display: flex;
            align-items: center;
            margin: 0 auto 4% auto;

            >img {
                width: 40px;
                margin-right: 5%;
            }

            >input {
                border-radius: 10px;
                border: 1px solid #CB2E27;
                width: 300px;
                height: 40px;
                padding-left: 5%;
            }
        }

        >button {
            width: 125px;
            height: 50px;
            border: 1px solid #b1241a;
            background-color: #b1241a;
            color: white;
            border-radius: 20px;
            margin: 2% auto;

            &:hover {
                background-color: white;
                color: #b1241a;
            }
        }
    }
}
</style>
