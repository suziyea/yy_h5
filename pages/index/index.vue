<template>
	<view class="container u-flex u-flex-column ">
		<view class="swiperview u-flex u-flex-center ">
			<!-- <view class="islike" v-if="actionName!=''"
				style="color:#fff;background: rgba(0,0,0,.3);padding:10px 20px;font-size:24px;position: absolute;z-index:999;left: 50%;top:50%;transform: translate(-50%,-50%);">
				{{actionName}}
			</view> -->
			<view class="islike u-flex u-flex-center u-flex-items-center">
				<!-- {{actionName}} -->
				已喜欢
			</view>
			<!-- <Flycard @onDragMove='onCardDragMove' @onDragStop='onCardDragStop' @onThrowDone='onCardThrowDone'
				:cardWidth="654" :cardHeight="1048" :throwTriggerDistance="100" dragDirection="horizontal"
				:hasShadow="true">
				<view slot="firstCard" style="width:100%;height:100%;">
					<view v-if="cards[0]" class="tantanCard">
						<image :src="cards[0].image" style="width: 100%;height: 100%;" mode="aspectFill"></image>
					</view>
				</view>
				<view slot="secondCard" style="width:100%;height:100%;">
					<view v-if="cards[1]" class="tantanCard">
						<image :src="cards[1].image" style="width: 100%;height: 100%;" mode="aspectFill"></image>
					</view>
				</view>
				<view slot="thirdCard" style="width:100%;height:100%;">
					<view v-if="cards[2]" class="tantanCard">
						<image :src="cards[2].image" style="width: 100%;height: 100%;" mode="aspectFill"></image>
					</view>
				</view>
			</Flycard> -->
			
			<view class="box">
				
			</view>


		</view>
		<!-- <view class="likeTab u-flex ">
			<view class="like">
				<image src="/static/icon/home_unlike.png" mode="aspectFill"></image>
			</view>
			<view class="like">
				<image src="/static/icon/home_like.png" mode="aspectFill"></image>
			</view>
		</view> -->
		<view class="tab">
			<Tabbar currentPage="home"></Tabbar>
		</view>
		<common-dialog v-if="false" title="温馨提示" content="请您保证余额在300元以上，否则会误判您还款能力导致下款失败！" :showCancel="false"
			confirmText="重新绑卡" cancelText="原卡重试" v-on:on-click-dialog="onClickDialog"></common-dialog>
	</view>
</template>

<script>
	import Flycard from "../../components/flycard/flycard.vue"
	import Tabbar from '../../components/tabbar/Tarbar.vue'
	import commonDialog from '@/components/common-dialog/common-dialog.vue'

	export default {
		components: {
			Flycard,
			Tabbar,
			commonDialog
		},
		data() {
			return {
				title: 'Hello',
				actionName: "",
				cards: [{
						image: "/static/img/login/p1.jpeg"
					},
					{
						image: "/static/img/login/p2.jpeg"
					},
					{
						image: "/static/img/login/p3.jpeg"
					},
					{
						image: "/static/img/login/p4.jpeg"
					},
					{
						image: "/static/img/login/p5.jpeg"
					},
					{
						image: "/static/img/login/p8.jpeg"
					}
				]
			}
		},
		onLoad() {

		},
		methods: {
			onCardDragMove(obj) {
				console.log(obj);

				if (obj.left < -10) {
					this.actionName = "不喜欢";
				} else if (obj.left > 10) {
					this.actionName = "喜欢";
				} else {
					this.actionName = "";
				}
			},
			onCardDragStop(obj) {
				this.actionName = "";
			},
			onCardThrowDone(obj) {
				this.cards.splice(0, 1);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		width: 750rpx;
		box-sizing: border-box;
		// height: 100vh;
		background: #FFFFFF;

		.swiperview {
			margin-top: 40rpx;
			width: 100%;
			// height: 100%;
			height: 1048rpx;
			border: 1px solid hotpink;
			box-sizing: border-box;
			position: relative;
			// border: 1px solid chocolate;

			// .islike {
			// 	width: 160rpx;
			// 	height: 72rpx;
			// 	background: rgba(255, 255, 255, .5);
			// 	border-radius: 48rpx;
			// 	backdrop-filter: blur(5.886075019836426px);
			// 	font-size: 28rpx;
			// 	font-family: PingFangSC-Medium, PingFang SC;
			// 	font-weight: 500;
			// 	color: #FFFFFF;
			// 	line-height: 40rpx;
			// 	position: absolute;
			// 	top: 10rpx;
			// 	right: 84rpx;
			// 	z-index: 120;
			// }


		}

		.likeTab {
			width: 100%;
			height: 120rpx;
			border: 1px solid red;

			.like {
				image {
					width: 120rpx;
					height: 120rpx;
				}
			}
		}

		.tantanCard {
			width: 100%;
			height: 100%;
		}
	}
</style>
