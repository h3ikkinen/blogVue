<template>
    <div class="sidebar">
        <p>POPULAR TAGS</p>
        <mcv-loader  v-if="isLoading"/>
        <mcv-message v-if="errors" />
        <div class="tag-list" v-if="tags && !isLoading">
            <router-link
                class="tag-default tag-pill ng-binding ng-scope"
                v-for="(tag, index) in tags.tags"
                :key='index'
                :to="{
                        name: 'tag', 
                        params: { slug: tag}
                    }"
            >
                {{tag}}
            </router-link>
        </div>
    </div>
</template>

<script>
import {actionsTypes, gettersTypes} from '@/store/modules/tags'
import {mapGetters} from 'vuex'
import McvLoader from '@/components/Loading'
import McvMessage from '@/components/Message'
export default ({
    name: 'McvTags',
    methods: {
        fetchFeed() {
            this.$store.dispatch(actionsTypes.getTags)
        }
    },
    components: {
        McvLoader,
        McvMessage
    },
    computed: {
        ...mapGetters({
            isLoading: gettersTypes.isLoading,
            tags: gettersTypes.tags,
            errors: gettersTypes.errors,
        }),
    },
    mounted() {
        this.fetchFeed()
    }
})
</script>
