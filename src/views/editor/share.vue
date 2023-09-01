<template>
    <div>
        <div v-if="sharedContent">
            <h1>{{ sharedContent.title }}</h1>
            <p>{{ sharedContent.description }}</p>
        </div>
        <div v-else>
            <p>无法找到共享内容。</p>
        </div>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter,useRoute } from 'vue-router';

export default {
    setup() {
        const router = useRouter();
        const sharedContent = ref(null);

        onMounted(async () => {
            // 获取共享链接中的标识信息，这里假设通过路由参数传递
           const route = useRoute();
            const sharedId = ref(route.params.sharedId);
            console.log(sharedId)
        });

        const fetchSharedContent = async (sharedId) => {
            // 这里模拟从数据库获取共享内容的过程
            return {
                title: '共享内容标题',
                description: '这是一个通过共享链接访问的内容。',
            };
        };

        return {
            sharedContent,
        };
    },
};
</script>