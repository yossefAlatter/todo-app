<template>
    <div id="app-bg">

        <!-- top image -->
        <!-- start -->
        <div class="top-img-bg"></div>
        <!-- end -->

    </div>
</template>

<script>
export default {
    name: 'AppBg',
}
</script>

<style lang="scss" scoped>

//== app-bg style ==//
//== start ==//
#app-bg{
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    height: 821px;
    background-color: var(--color3);
    .top-img-bg{
        width: 100%;
        height: 300px;
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
    }
}
//== end ==//

//== media of bg-app ==//
//== start ==//
@media screen and (min-width: 630px){
    #app-bg{
        .top-img-bg{
            background-image: var(--desktopBg);
        }
    }
}
@media screen and (max-width: 630px){
    #app-bg{
        max-height: 888px;
        min-height: 888px;
        .top-img-bg{
            background-image: var(--mobileBg);
        }
    }
}
@media screen and (max-width: 375px) {
   #app-bg{
        max-height: 910px;
        min-height: 910px;
    }
}
@media screen and (max-width: 320px) {
   #app-bg{
        max-height: 910px;
        min-height: 910px;
    }
}
@media screen and (min-height: 910px) {
   #app-bg{
        max-height: 950px;
        min-height: 950px;
    }
}
//== end ==//

</style>