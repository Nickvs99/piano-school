<template>

<div id="key-generator-view">
    <div ref="key" id="key">
        {{ key }}
    </div>
</div>

</template>

<script>

import {scrollIntoView} from "@/js/scroll.js";
import {sleep} from "@/js/sleep.js";

export default {
    name: "KeyGeneratorView",
    data() {
        return {
            key: "A1",
            wakeLock: null,
        };
    },
    mounted() {
        scrollIntoView("key-generator-view");

        this.requestScreenLock();
        this.Run();
    },

    methods: {
        async Run() {
            for(;;)
            {
                if(this.isUnMounted())
                    return;

                // Creates a flicker effect
                this.$refs.key.style.opacity = 0;
                await sleep(1000);

                this.key = this.GenerateRandomKey();
                if(this.isUnMounted())
                    return;

                this.$refs.key.style.opacity = 1;
                await sleep(2500); 
            }
        },

        GenerateRandomKey()
        {
            let letters = ["A", "B", "C", "D", "E", "F", "G"];
            let letters_with_8_frequencies = ["A", "B", "C"];

            let valid = false;

            while(!valid)
            {
                let number = this.getRandomInt(1, 8);
                let letter = this.choose(letters);
                var key = `${letter}${number}`;

                if (key !== this.key && number < 8 || letters_with_8_frequencies.includes(letter))
                {
                    valid = true;
                }
            }

            return key;
        },

        getRandomInt(min, max) {
            return min + Math.floor(Math.random() * (max + 1 - min));
        },

        choose(choices) {
            var index = Math.floor(Math.random() * choices.length);
            return choices[index];
        },

        async requestScreenLock() {
            try {
                this.wakeLock = await navigator.wakeLock.request("screen");
                this.wakeLock.addEventListener("release", () => {
                    console.log("Wake Lock was released");
                });
                console.log("Wake Lock is active");
            } catch (err) {
                console.error(`${err.name}, ${err.message}`);
            }
        },
        
        isUnMounted(){
            return this.$refs.key == null;
        }
    }
};

</script>

<style lang="scss" scoped>

#key-generator-view {
    width: 100dvw;
    height: 100dvh;

    display: flex;
    justify-content: center;
    align-items: center;

    font-size: 10rem;
}

#key {
    font-size: 10rem;

    transition: opacity 1s ease-in-out;
}

</style>
