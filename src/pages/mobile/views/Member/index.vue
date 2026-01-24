<template>
    <div class="member-page">
        <!-- 头部背景 -->
        <div class="user-header">
            <div class="avatar-area">
                <div class="avatar">U</div>
                <div class="info">
                    <div class="name">Vue开发者</div>
                    <div class="desc">ID: 888888</div>
                </div>
            </div>
        </div>

        <!-- 统计栏 -->
        <div class="stats-bar">
            <div class="stat-item">
                <span class="num">12</span>
                <span class="label">收藏</span>
            </div>
            <div class="stat-item">
                <span class="num">5</span>
                <span class="label">关注</span>
            </div>
            <div class="stat-item">
                <span class="num">108</span>
                <span class="label">积分</span>
            </div>
        </div>

        <!-- 功能菜单列表 -->
        <div class="menu-group">
            <div class="menu-item">
                <span>我的订单</span>
                <span class="arrow">></span>
            </div>
            <div class="menu-item">
                <span>地址管理</span>
                <span class="arrow">></span>
            </div>
            <div class="menu-item">
                <span>联系客服</span>
                <span class="arrow">></span>
            </div>
        </div>

        <div class="menu-group">
            <div class="menu-item">
                <span>设置</span>
                <span class="arrow">></span>
            </div>
        </div>
    </div>
</template>

<style scoped>
.member-page {
    min-height: 100%;
}

.user-header {
    background: #1989fa;
    padding: 40px 20px 30px;
    color: white;
}

.avatar-area {
    display: flex;
    align-items: center;
}

.avatar {
    width: 60px;
    height: 60px;
    background: white;
    border-radius: 50%;
    color: #1989fa;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 24px;
    margin-right: 15px;
}

.info .name {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 5px;
}

.info .desc {
    font-size: 12px;
    opacity: 0.8;
}

/* 统计栏 */
.stats-bar {
    display: flex;
    background: white;
    padding: 15px 0;
    margin-bottom: 12px;
}

.stat-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-right: 1px solid #f0f0f0;
}

.stat-item:last-child {
    border-right: none;
}

.stat-item .num {
    font-weight: bold;
    font-size: 16px;
    color: #333;
}

.stat-item .label {
    font-size: 12px;
    color: #999;
    margin-top: 4px;
}

/* 菜单列表 */
.menu-group {
    background: white;
    margin-bottom: 12px;
    padding: 0 15px;
}

.menu-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 0;
    border-bottom: 1px solid #f5f6f7;
    font-size: 14px;
    color: #333;
}

.menu-item:last-child {
    border-bottom: none;
}

.arrow {
    color: #ccc;
    font-family: monospace;
}
</style>