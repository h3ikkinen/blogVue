<template>
    <div>
        <div v-if="isLoading">
            Loading...
        </div>
        <div v-if="errors">
            Somethink bad happened
        </div>
        <div v-if="feed">
            <div 
                class="article-preview"
                v-for="(article, index) in feed.articles"  
                :key="index"
            >
                <div class="article-meta">
                    <router-link 
                        :to="{
                                name: 'userProfile', 
                                params: {slug: article.author.username}
                            }"
                    >
                        <img :src="article.author.image"/>
                    </router-link>
                    <div class="info">
                        <router-link 
                            :to="{
                                name: 'userProfile', 
                                params: {slug: article.author.username}
                            }"
                            class="author"
                        >
                            {{ article.author.username }}
                        </router-link>
                        <span class="date">
                            {{ article.createdAt }}
                        </span>
                    </div>
                    <div class="pull-xs-right">
                        ADD TO FAVORITES
                    </div>
                </div>
                <router-link
                    :to="{
                        name: 'article',
                        params: {slug: article.slug}
                    }"
                    class="preview-link"
                >
                    <h1>
                        {{ article.title }}
                    </h1>
                    <p>
                        {{ article.description }}
                    </p>
                    <span>Read more...</span>
                    TAG LIST
                </router-link>
            </div>
            <mcv-pagination 
                :total="feed.articlesCount" 
                :limit="limit"
                :current-page="currentPage"
                :url="baseURL"
            /> 
        </div>
    </div>
</template>

<script>
import {actionsTypes, gettersTypes} from '@/store/modules/feed'
import {mapGetters} from 'vuex'
import McvPagination from '@/components/Pagination'
import {limit} from '@/helpers/variables'
import {stringify, parseUrl} from 'query-string'

export default {

    name: 'McvFeed',
    props: {
        apiUrl: {
            type: String,
            required: true
        }
    },
    components: {
        McvPagination
    },
    data() {
        return {
            limit,
            url: '/'
        }
    },
    mounted() {
        this.fetchFeed()
    },
    watch: {
        currentPage() {
            this.fetchFeed()
        }
    },
    computed: {
        ...mapGetters({
            isLoading: gettersTypes.isLoading,
            feed: gettersTypes.data,
            errors: gettersTypes.errors,
        }),
        currentPage() {
            return Number(this.$route.query.page || '1')
        },
        baseURL() {
            console.log(this.$route.path)
            return this.$route.path
        },
        offset() {
            return this.currentPage * limit - limit
        }
    },
    methods: {
        fetchFeed() {
            const parsedUrl = parseUrl(this.apiUrl);
            const stringifiedParams = stringify({
                limit,
                offset: this.offset,
                ...parsedUrl.query
            })
            const apiUrlWithParams = `${parsedUrl.url}?${stringifiedParams}`
            this.$store.dispatch(actionsTypes.getFeed, {apiUrl: apiUrlWithParams})
        }
    }
}
</script>