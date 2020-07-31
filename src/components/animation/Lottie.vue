<template>
    <div class="lottie">
        <div class="box" :style="{'width': width, 'height': height}">
            <div id="lottie"></div>
        </div>
    </div>
</template>

<script>
    import lottie from "lottie-web";

    export default {
        name: "Lottie",
        props: {
            height: String,
            width: String,
            lottieData: String,
        },
        data(){
            return{
                lottie: {},
            }
        },
        mounted() {
            this.lottie = lottie.loadAnimation({
                container: document.getElementById('lottie'),
                renderer: 'canvas',
                loop: true,
                autoplay: true,
                path: this.lottieData
            })
            this.lottie.play()
        }
    }
</script>

<style scoped>
    .lottie{
        height: inherit;
        width: inherit;
    }

    .box{
        position: relative;
        left: 50%;
        top: 50%;
        text-align: center;
        transform: translate(-50%, -70%);
    }

    #lottie {
        width: 100%;
        height: 100%;
    }
</style>