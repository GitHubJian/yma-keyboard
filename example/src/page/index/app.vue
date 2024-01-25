<template>
    <div>
        <div ref="container" class="container">
            <div class="inner">我绑定了键盘事件</div>
        </div>
        <div class="container">我没有绑定键盘事件</div>
    </div>
</template>

<script>
import addKeyboardEvent from '../../../../src';

export default {
    data() {
        return {};
    },
    mounted() {
        const el = this.$refs.container;

        addKeyboardEvent(el, function (e) {
            console.log(e);
        });
    },
};
</script>

<style lang="scss">
.container {
    height: 100px;
    width: 100px;
    border: 1px solid red;
}

.inner {
    border: 1px solid blue;
}
</style>
