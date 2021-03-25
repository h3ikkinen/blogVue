<template>
    <div>{{ message }}</div>
</template>
<script>
export default {
    name: 'McvMessage',
    props: {
        message: {
            type: String,
            required: false,
            default: 'Somethink went wrong'
        }
    }
}
</script>