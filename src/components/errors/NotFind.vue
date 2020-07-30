<template>
    <div :style="{'height': height+'px'}">
        <div class="box">
            <div id="lottie"></div>
        </div>
    </div>

</template>

<script>
    import lottie from 'lottie-web'
    import {windowHeight} from "../../common/height";

    export default {
        name: "NotFind",
        data(){
            return{
                lottie: {},
                height: windowHeight()
            }
        },
        mounted() {
            this.lottie = lottie.loadAnimation({
                container: document.getElementById('lottie'),
                renderer: 'canvas',
                loop: true,
                autoplay: true,
                path: 'https://assets8.lottiefiles.com/datafiles/OzG1c5GtuAvq10U/data.json'
            })
            this.lottie.play()
        }
    }
</script>

<style scoped>
    .box{
        position: relative;
        left: 50%;
        top: 50%;
        width: 600px;
        height: 400px;
        text-align: center;
        transform: translate(-50%, -70%);
    }

    #lottie {
        width: 100%;
        height: 100%;
    }
</style>