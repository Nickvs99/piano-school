<template>

<div id="key-generator-view">
    <div class="key">
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
            key: "A1"
        };
    },
    mounted() {
        scrollIntoView("key-generator-view");

        this.Run();
    },

    methods: {
        async Run() {
            for(;;)
            {
                this.key = this.GenerateRandomKey();
                await sleep(1000);
            }
        },

        GenerateRandomKey()
        {
            let letters = ["A", "B", "C", "D", "E", "F", "G"];
            let letters_with_8_frequencies = ["A", "B", "C"];

            let valid = false;
            let number = null;
            let letter = null;

            while(!valid)
            {
                number = this.getRandomInt(1, 8);
                letter = this.choose(letters);

                if (number < 8 || letters_with_8_frequencies.includes(letter))
                {
                    valid = true;
                }
            }

            return `${letter}${number}`;
        },

        getRandomInt(min, max) {
            return min + Math.floor(Math.random() * (max + 1 - min));
        },

        choose(choices) {
            var index = Math.floor(Math.random() * choices.length);
            return choices[index];
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

.key {
    font-size: 10rem;
}

</style>
