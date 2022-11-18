<template>
	<v-container class="login">
		<v-text-field
				v-model="user.username"
				:rules="[rules.required]"
				label="Utilisateur"
		></v-text-field>
		<v-text-field
            v-model="user.password"
            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required]"
            :type="show ? 'text' : 'password'"
            name="input-10-1"
            label="Mot de passe"
            counter
            @click:append="show = !show"
          ></v-text-field>
		<v-btn @click="login()" :disabled="this.user.username == null || this.user.password == null">
			Se connecter
		</v-btn>
	</v-container>
</template>
<script>
	import { mapActions } from "vuex";

    export default {
        name: "LoginView",
        components: {},
        data: () => ({
            user: {
                username: null,
                password: null,
			},
            show: false,
            rules: {
                required: value => !!value || 'Required.',
                min: v => v.length >= 8 || 'Min 8 characters'
            },
        }),
        methods: {
            ...mapActions({
                loginAction: 'security/login'
            }),
            login() {
                this.loginAction(this.user)
            }
        }
    }
</script>
<style>

</style>
