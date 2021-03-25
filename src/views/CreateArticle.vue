<template>
    <div>
        <mcv-article-form 
            :initial-values="initialValues"
            :errors="validationErrors"
            :is-submitting="isSubmitting"
            @articleSubmit="onSubmit"
        />
    </div>
</template>

<script>
import {mapState} from 'vuex'
import {actionsTypes} from '@/store/modules/createArticle'
import McvArticleForm from '@/components/ArticleForm'
export default {
    name: 'McvCreateArticle',
    data () {
        return {
            initialValues: {
                title: '',
                descr: '',
                body: '',
                tagList: []
            },
        }
    },
    computed: {
        ...mapState({
            isSubmitting: state => state.createArticle.isSubmitting,
            validationErrors: state => state.createArticle.validationErrors
        })
    },
    components: {
        McvArticleForm,
    },
    methods: {
        onSubmit(articleForm) {
            this.$store.dispatch(actionsTypes.createArticle, {articleForm})
                .then(article => {
                    this.$router.push({
                        name: 'article',
                        params: {
                            slug: article.slug
                        }
                    })
                })
        }
    }
}
</script>