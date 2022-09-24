<template>
	<view class="test_container">
		<!-- 轮播图 -->
		<swiper class="card-swiper" :class="dotStyle?'square-dot':'round-dot'" :indicator-dots="true" :circular="true"
			:autoplay="true" interval="5000" duration="500" @change="cardSwiper" indicator-color="#8799a3"
			indicator-active-color="#0081ff">
			<swiper-item v-for="(item,index) in swiperList" :key="index" :class="cardCur==index?'cur':''"
				@click="getBanner(item)">
				<view class="swiper-item">
					<image :src="item.url" mode="aspectFill" v-if="item.type=='image'"></image>
					<video :src="item.url" autoplay loop muted :show-play-btn="false" :controls="false"
						objectFit="cover" v-if="item.type=='video'"></video>
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			// 轮播图事件
			cardSwiper(e) {
				this.cardCur = e.detail.current
			},
		}
	}
</script>

<style lang="scss" scoped>
	.test_container {

		/* 轮播图 */
		.swiper-item {
			width: 80%;
			;
			height: 100%;
			margin: 0 auto;
			border-radius: 20upx 20upx 0 0;
		}

		.swiper-img {
			width: 100%;
			height: 100%;
			border-radius: 20upx 20upx 0 0;
		}
	}
</style>
