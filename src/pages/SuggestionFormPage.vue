<script>
import axios from 'axios';
import AppAlert from '../components/AppAlert.vue';
const endpoint = 'http://127.0.0.1:8000/api/contact-message';
const emptyForm = { email: '', subject: '', message: '', subscription: false };

export default {
    name: 'SuggestionFormPage',
    components: { AppAlert },
    data: () => ({
        form: emptyForm,
        isLoading: false,
        errors: {},
        alertMessage: null


    }),
    methods: {
        validateForm() {
            this.errors = {};
            const errors = {};

            if (!this.form.email) {
                errors.email = 'La email è obbligatoria!'
            }
            if (!this.form.subject) {
                errors.subject = "L'oggetto della mail è obbligatorio"
            }
            if (!this.form.message) {
                errors.message = 'Il messaggio è obbligatorio'
            }
            this.errors = errors;
        },

        sendForm() {
            this.validateForm();
            if (!this.hasErrors) {
                this.isLoading = true;
                axios.post(endpoint, this.form)
                    .then(() => {
                        this.form = { email: '', subject: '', message: '', subscription: false };
                        this.alertMessage = 'Suggerimento del gioco inviato con successo!'
                    })
                    .catch(err => {
                        if (err.response.status === 400) {
                            const { errors } = err.response.data;
                            const errorMessages = {};
                            for (let key in errors) errorMessages[key] = errors[key][0];
                            this.errors = errorMessages;
                        } else {
                            this.errors = { network: 'Si è verificato un errore' };

                        }
                    })
                    .then(() => { this.isLoading = false })
            }
        }

    },
    computed: {
        hasErrors() {
            return Object.keys(this.errors).length;
        }
    }
}

</script>



<template>
    <section class="suggestion-form">
        <div class="container">
            <h3 class="my-4">Suggerisci un gioco</h3>
            <AppLoader v-if="isLoading" />

            <div v-else>
                <AppAlert :isOpen="hasErrors || alertMessage" :type="hasErrors ? 'danger' : 'success'">
                    <div v-if="alertMessage">{{ alertMessage }}</div>
                    <ul v-if="hasErrors" class="pb-0 mb-0">
                        <li v-for="(error, key) in errors" :key="key">{{ error }}</li>
                    </ul>
                </AppAlert>
                <form novalidate @submit.prevent="sendForm">
                    <div class="row">
                        <!-- EMAIL -->
                        <div class="col-12">
                            <div class="mb-3">
                                <label for="email" class="form-label">Email</label>
                                <input type="email" class="form-control" id="email" placeholder="nome@mail.com" name="email"
                                    v-model.trim="form.email" required>
                            </div>
                        </div>

                        <!-- OGGETTO -->
                        <div class="col-12">
                            <div class="mb-3">
                                <label for="subject" class="form-label">Oggetto</label>
                                <input type="text" class="form-control" id="subject" placeholder="" name="subject"
                                    v-model.trim="form.subject" required>
                            </div>
                        </div>


                        <!-- CONTENUTO MESSAGGIO -->
                        <div class="col-12">
                            <div class="mb-3">
                                <label for="message" class="form-label">Contenuto del messaggio</label>
                                <textarea class="form-control" id="message" rows="3" name="message"
                                    v-model.trim="form.message" required></textarea>
                            </div>
                        </div>




                        <!-- Iscrizione Newsletter -->
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="checkbox" id="subscription" value="1"
                                v-model="form.subscription">
                            <label class="form-check-label" for="subscription">Iscrivimi alla NewsLetter</label>
                        </div>

                        <!-- Bottoni -->
                        <div class="mb-3 d-flex justify-content-end">
                            <button class="btn btn-primary" type="submit">Suggerisci</button>
                        </div>


                    </div>
                </form>
            </div>
        </div>

    </section>
</template>

<style scoped lang="scss"></style>