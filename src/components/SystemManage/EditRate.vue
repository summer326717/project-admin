<template>
    <div>
        <div>
            <span>生效时间</span>
            <span>2017-11-11</span>
        </div>
        <div>
            <span>*结算时间</span>
            <input type="datetime">
        </div>
        <div>
            <span>*汇率</span>
            <input type="text">
        </div>
        <div>
            <p>兑换规格：零钱 = 金币 * 汇率 / 1000</p>
            <div>
                <input type="text">
                <span>金币</span>
                <span>=></span>
                <span>零钱（元）</span>
                <button>转换</button>
            </div>
            <div><button>保存</button></div>
        </div>
    </div>
</template>
