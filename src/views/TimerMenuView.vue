<template>

    <form @submit.prevent="submit">
        <input v-model="time" type="number">
        <button>Start</button>  
    </form>


</template>

<script>

export default {
    data() {
        return {
            time: 0,
        };
    },
    methods: {
        submit() {
            this.$router.push({
                name: "timer", 
                params: { time: this.time }
            });
        }
    }  
};

</script>

<style lang="scss" scoped>

</style>
