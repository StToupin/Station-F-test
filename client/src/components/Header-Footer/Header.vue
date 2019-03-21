<template>
	<header>
		<div class="header_container">
			<div class="logo">
				<router-link to="/">Réservation</router-link>
			</div>
			<div class="button">
				<v-btn color="red lighten-1">
					<router-link to="/annuler">Annuler ma reservation</router-link>
				</v-btn>
			</div>
		</div>
	</header>
</template>

<script>
	export default {}
</script>

<style scoped>
	.logo {
		padding: 20px;
	}

	.v-btn {
		text-decoration: none;
	}

	a {
		text-decoration: none;
		color: white;
	}
</style>
