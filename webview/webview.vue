<template>
	<view>
		<web-view :src="url"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url: '',
			}
		},
		methods: {
			
		},
		onLoad(options) {
			this.url = options.url;
		}
	}
</script>

<style>

</style>
