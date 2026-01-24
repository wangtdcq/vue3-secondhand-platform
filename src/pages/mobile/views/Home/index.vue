<template>
    <div class="home-page">
        <!-- 顶部标题 -->
        <header class="nav-bar">首页</header>

        <!-- 模拟轮播图 -->
        <div class="banner">
            <div class="banner-content">Banner Area</div>
        </div>

        <!-- 模拟列表内容 -->
        <div class="section-title">热门推荐</div>
        <div class="list">
            <div class="card" v-for="i in 10" :key="i">
                <div class="card-img"></div>
                <div class="card-info">
                    <h3>移动端适配项目 {{ i }}</h3>
                    <p>这是一个Vue3构建的移动端示例页面。</p>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.home-page {
    padding-top: 44px;
    /* 留出顶部导航高度 */
}

.nav-bar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 44px;
    line-height: 44px;
    text-align: center;
    background: #fff;
    font-weight: bold;
    font-size: 16px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    z-index: 100;
}

.banner {
    margin: 15px;
    height: 150px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    box-shadow: 0 4px 10px rgba(118, 75, 162, 0.3);
}

.section-title {
    padding: 0 15px;
    font-weight: bold;
    font-size: 16px;
    margin-bottom: 10px;
}

.list {
    padding: 0 15px;
}

.card {
    background: #fff;
    border-radius: 8px;
    padding: 10px;
    margin-bottom: 10px;
    display: flex;
    gap: 10px;
}

.card-img {
    width: 80px;
    height: 80px;
    background: #eee;
    border-radius: 4px;
}

.card-info h3 {
    margin: 0 0 5px 0;
    font-size: 14px;
}

.card-info p {
    margin: 0;
    font-size: 12px;
    color: #999;
}
</style>