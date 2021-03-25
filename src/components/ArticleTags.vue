<template>
    <ul class="tag-list">
        <li 
            class="tag-default tag-pill tag-outline"
            v-for="tag in tags" 
            :key="tag"
        >
            {{ tag }}
        </li>
    </ul>
</template>

<script>
export default {
    name: 'McvArticleTags',
    props: {
        tags: {
            required: true,
            type: Array,
        }
    }
}
</script>