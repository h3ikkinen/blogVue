<template>
    <div class="article-page">
        <div class="banner">
            <div class="container" v-if="article">
                <h1>
                    {{ article.title }}
                </h1>
                <div class="article-meta">
                    <router-link
                        :to="{
                            name: 'UserProfile',
                            params: {slug: article.author.username}
                        }"
                    >
                        <img :src="article.author.image" />
                    </router-link>
                    <div class="info">
                        <router-link
                            :to="{
                                name: 'UserProfile',
                                params: {slug: article.author.username}
                            }"
                        >
                            {{article.author.username}}
                        </router-link>
                        <span class="date">{{ article.createdAt }}</span>
                    </div>
                    <span v-if="isAuthor">
                        <router-link 
                            class="btn btn-outline-secondary btn-sm"
                            :to="{
                                name: 'editArticle',
                                params: {
                                    slug: article.slug
                                }    
                            }"
                        >
                            <i class="ion-edit"></i>
                            Edit Article
                        </router-link>
                        <button 
                            class="btn btn-outline-danger btn-sm"
                            @click="deleteArticle"
                        >
                            <i class="ion-trash-a"></i>
                            Delete Article
                        </button>
                    </span>
                </div>
            </div>
        </div>
        <div class="container page">
            <mcv-loader v-if="isLoading"/>
            <mcv-message v-if="errors"/>
            <div class="row" v-if="article">
                <div class="col-xs-12">
                    <div>
                        <p>
                            {{ article.body }}
                        </p>
                    </div>
                    <mcv-tag-list :tags="article.tagList"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// STORE 
import {actionsTypes as ArticleActionsTypes, gettersTypes as ArticleGettersTypes} from '@/store/modules/article'
import {gettersTypes as AuthGetterTypes} from '@/store/modules/auth'
import {mapGetters} from 'vuex';
// COMPONENTS
import McvLoader from '@/components/Loading'
import McvMessage from '@/components/Message'
import McvTagList from '@/components/ArticleTags'
export default {
    name: 'McvArticle',
    mounted() {
        this.$store.dispatch(
            ArticleActionsTypes.getArticle, 
            {
                slug: this.$route.params.slug
            }
        )
    },
    components: {
        McvLoader,
        McvMessage,
        McvTagList
    },
    computed: {
        ...mapGetters({
            // ARTICLE STORE
            isLoading: ArticleGettersTypes.isLoading,
            errors: ArticleGettersTypes.errors,
            article: ArticleGettersTypes.data,
            // AUTH STORE
            currentUser: AuthGetterTypes.currentUser
        }),
        isAuthor() {
            if (!this.currentUser || !this.article) {
                return false
            }
            return this.currentUser.username === this.article.author.username
        }
    },
    methods: {
        deleteArticle() {
            this.$store.dispatch(
                ArticleActionsTypes.deleteArticle, 
                {
                    slug: this.$route.params.slug
                }
        ).then(() => {
            this.$router.push({name: 'globalFeed'})
        })
        }
    }
}
</script>