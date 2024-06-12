<template>
    <header>
        <div class="header-nav">
            <div class="logo">
                <RouterLink to="/"><img src="../../assets/pic/logo.png" alt="logo"></RouterLink>
            </div>
            <nav>
                <RouterLink v-for="link in links" :key="link.path" :to="link.path">
                    {{ link.name }}
                </RouterLink>
            </nav>
        </div>
    </header>
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
                { name: '後台人員管理', path: '/adminmanage' }
            ]
        };
    },
    methods: {
    }
}
</script>