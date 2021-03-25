<template>
    <div class="feed-toggle">
        <ul class="nav nav-pills outline-active">
            <li 
                class="nav-item"
                v-if="isLoggetIn"
            >
                <router-link
                    class="nav-link"
                    :to="{
                        name: 'yourFeed'
                    }"
                    :class="{active: routeName === 'yourFeed'}"
                >
                    Your Feed
                </router-link>
            </li>
            <li 
                class="nav-item"
            >
                <router-link
                    class="nav-link"
                    :to="{
                        name: 'globalFeed'
                    }"
                    :class="{active: routeName === 'globalFeed'}"
                >
                    Global Feed
                </router-link>
            </li>
            <li 
                class="nav-item"
                v-if="tagName"
            >
                <router-link
                    class="nav-link"
                    :to="{
                        name: 'GlobalFeed'
                    }"
                    :class="{active: routeName === 'tag'}"
                >
                    <i class="ion-pound"></i>
                    {{tagName}}
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
import {mapGetters} from 'vuex';
import {gettersTypes} from '@/store/modules/auth'
export default {
    name: 'McvFeedToggle',
    props: {
        tagName: {
            type: String,
            required: false,
            default: ''
        }
    } ,
    computed: {
        ...mapGetters({
            isLoggetIn: gettersTypes.isLoggetIn
        }),
        routeName() {
            return this.$route.name
        }
    }
}
</script>