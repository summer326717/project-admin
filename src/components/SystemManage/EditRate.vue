<template>
    <div class="manage-detail">
        <div class="item">
            <span class="left-span">生效时间</span>
            <span class="ipt-normal">2017-11-11</span>
        </div>
        <div class="item">
            <span class="left-span">*结算时间</span>
            <input class="ipt-normal" type="datetime">
        </div>
        <div class="item">
            <span class="left-span">*汇率</span>
            <input class="ipt-normal" type="text">
        </div>
        <div class="item">
            <p>兑换规格：零钱 = 金币 * 汇率 / 1000</p>
            <div>
                <input type="text">
                <span>金币</span>
                <span>=></span>
                <span>零钱（元）</span>
                <button>转换</button>
            </div>
            <div><button class="save-btn">保存</button></div>
        </div>
    </div>
</template>
