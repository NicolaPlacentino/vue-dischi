<script>
import axios from 'axios';
const apiBaseUrl = 'http://127.0.0.1:8000/api/';
export default {
    name: 'ShowPage',
    data() {
        return {
            game: {}
        }
    },
    methods: {
        getGame() {
            axios.get(apiBaseUrl + 'videogames/' + this.$route.params.id).then(res => { this.game = res.data })
        }
    },
    created() {
        this.getGame();
    }
}
</script>



<template>
    <h1 class="mb-3">BoolGaming</h1>
    <div class="card-section d-flex justify-content-center">
        <div class="card mt-3">
            <div class="row g-0">
                <div class="col-4">
                    <img :src="game.image_url" class="w-100 h-100 rounded-start" :alt="game.title">
                </div>
                <div class="col-8">
                    <div class="card-body p-4">
                        <h3 class="card-title">{{ game.title }}</h3>
                        <p class="card-text">
                            {{ game.description }}
                        </p>
                        <p class="card-text"><strong>Publisher:</strong> {{ game.publisher }}</p>
                        <p class="card-text"><strong>Piattaforma:</strong> {{ game.platform }}</p>

                        <p class="card-text m-0"><strong>Generi:</strong>{{ game.genre }}</p>
                        <p class="card-text p-0"><small class="text-muted">Data di rilascio: {{
                            game.release_date }}</small>
                        </p>
                        <p class="card-text"><small class="text-muted"><strong></strong>Peso:{{ game.weight }} GB</small>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="text-center mt-4">
        <router-link to="/" class="btn btn-secondary">Torna alla home</router-link>
    </div>
</template>

<style scoped lang="scss">
.card-section {
    border-top: 1px solid gray;
}
</style>