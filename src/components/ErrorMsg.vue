<template>
    <div class="error-page">
        <div class="error-box container py-4 px-2 p-sm-4 ">
            <div class="text-center mb-2"><img src="./../assets/icon-error.svg" alt="error" class="error-img"></div>
            <div id="msg_con"></div>
            <div class="text-center"><button class="btn btn-primary" style="width: 150px" @click="agreeFun">OK</button></div>
        </div>
    </div>
</template>
<script>
export default {
    name: "ErrorMsg",
    methods:{
        agreeFun(){
            var myerrorBag = document.querySelector(".error-page");
            myerrorBag.style.display="none";
        }
    }
}
</script>
<style scoped>
    .error-page{
        background-color: rgba(0, 0, 0, 0.596);
        height: 100vh;
        width: 100%;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 999;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .error-box{
        background-color: white;
        border-radius: 8px;
        width: 50%;
    }
    .error-img{
        width: 50px;
        height: 50px;
    }
    @media screen and (max-width: 890px){
       .error-box{
        min-width: 80%;
       }
    } 
    @media screen and (max-width: 490px){
       .error-box p{
        font-size: 0.85em;
       }
    }
</style>