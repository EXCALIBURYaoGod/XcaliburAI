<template>
    <div  class="welcome-message-container">
        
    </div>
</template>

<script>
export default {
    methods: {
        sendPrompt(message) {
            this.$emit('sendPrompt', message);
        }
    },
};

</script>


<style scoped>

</style>