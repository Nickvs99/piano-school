<template>

<div id="timer-container" @mousedown="onMouseDown" @mouseup="onMouseUp">
    <div>
        {{timeText}}
    </div>
</div>

</template>

<script>
import { requestScreenLock } from "@/js/screenlock";
import { sleep } from "@/js/sleep";

export default {

    data() {
        return {
            maxTime: 0,
            timeLeft: 0,
            start: 0,
            mousedownTime: 0,
            holdTimeThreshold: 2500, //ms
            screenlock: null,
        }; 
    },

    mounted() {
        this.screenlock = requestScreenLock();
        this.maxTime = this.$route.params.time * 1000;
        this.resetTimer();
        this.run();
    },

    computed: {
        timeText() {

            let time = this.timeLeft / 1000;

            if (time > 10)
                return time.toFixed(0);

            if(time > 3)
                return time.toFixed(1);

            if(time <= 0)
                return 0;

            return time.toFixed(2);
        }
    },

    methods: {  
        async run() {
            for(;;) {
                await sleep(0);
                
                var delta = Date.now() - this.start; // milliseconds elapsed since start

                this.timeLeft = Math.max(this.maxTime - delta, 0);
            }
        },

        resetTimer() {
            this.start = Date.now();
            this.timeLeft = this.maxTime;
        },

        onMouseDown() {
            this.mouseDownTime = Date.now();            
        },

        onMouseUp() {
            let holdTime = Date.now() - this.mouseDownTime;

            if (holdTime > this.holdTimeThreshold) {
                this.resetTimer();
                return;
            }

            if(this.timeLeft <= 0)
                return;

            this.resetTimer();
        }
    }

};
</script>

<style lang="scss" scoped>

#timer-container {
    background-color: lightgrey;
    width: 100vw;
    height: 100vh;
}

</style>
