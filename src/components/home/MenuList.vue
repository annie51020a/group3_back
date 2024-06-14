<template>
    <div class="menu-list">
        <div class="logo">
            <RouterLink to="/"><img src="@/assets/pic/header-logo.png" alt="logo"></RouterLink>
        </div>
        <nav>
            <RouterLink v-for="link in links" :key="link.path" :to="link.path" active-class="active-link">
                {{ link.name }}
            </RouterLink>
        </nav>
        <img src="@/assets/pic/header-bac.png" alt="">
    </div>
</template>

<script>
import { RouterLink } from 'vue-router';

export default {
    components: {
        RouterLink,
    },
    data() {
        return {
            links: [
                { name: '最新消息管理', path: '/newsmanage' },
                { name: '活動管理', path: '/activitymanage' },
                { name: '商品管理', path: '/productmanage' },
                { name: '會員管理', path: '/membermanage' },
                { name: '訂單管理', path: '/ordermanage' },
                { name: '客服管理', path: '/customermanage' },
                { name: '後台人員管理', path: '/adminmanage' },
            ]
        };
    },
    methods: {
    }
}
</script>

<style lang="scss">
.menu-list {
    width: 20vw;
    height: 100vh;
    background-color: #B1241A;
    display: flex;
    flex-direction: column;
    margin-left: 10%;
    overflow: hidden;
    font-family: "Noto Serif HK", serif;
    justify-content: space-between;
    align-items: center;

    .logo {
        margin-top: 10%;
        img{
            width: 90px;
        }
    }

    >nav {
        display: flex;
        flex-direction: column;

        >a {
            text-align: center;
            margin-top: 10%;
            color: white;
            font-size: 24px;
        }
        .active-link{
            width: 180px;
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            color: #B1241A;
            background-color: white;
            font-size: 24px;
            border-radius: 20px;
        }
    }
}
</style>