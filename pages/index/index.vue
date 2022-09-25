<template>
	<view class="home_container">
		<!-- <view class="tantan_card"> -->
		<view v-if="actionName!=''"
			style="color:#fff;background: rgba(0,0,0,.3);padding:10px 20px;font-size:24px;position: absolute;z-index:999;left: 50%;top:50%;transform: translate(-50%,-50%);">
			{{actionName}}
		</view>
		<Flycard @onDragMove='onCardDragMove' @onDragStop='onCardDragStop' @onThrowDone='onCardThrowDone'
			:cardWidth="654" :cardHeight="892" :throwTriggerDistance="100" dragDirection="horizontal" :hasShadow="true">
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
		</Flycard>
		<view class="tab">
			<Tabbar currentPage="index"></Tabbar>
		</view>
	</view>
</template>

<script>
	import Flycard from "../../components/flycard/flycard.vue"
	import Tabbar from '../../components/tabbar/Tarbar.vue'
	import commonDialog from '@/components/common-dialog/common-dialog.vue'
	import {
		getSisterList
	} from "@/config/api/sister.js";
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
				],
				sisterList: [],
			}
		},
		created() {
			this.getInitList()
		},
		onLoad() {

		},
		methods: {
			getInitList() {
				getSisterList({}).then((res) => {
					if (res.code === 100000) {
						this.sisterList = res?.data
					}
				}).catch((err) => {
					console.log(err, 'err');
				}).finally(() => {
					this.showOrderFlag = true;
				})
			},
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
	view {
		box-sizing: border-box;
	}

	.home_container {
		width: 750rpx;
		height: calc(100vh - 156rpx);
		box-sizing: border-box;
		overflow: hidden;

		.tantan_card {
			// height: 100%;
			margin-top: 44rpx;
			// height: 892rpx;
			height: 100%;
		}

		.tantanCardLike {
			width: 750rpx;
			margin-top: 32rpx;
			box-sizing: border-box;

			.imgs {
				width: 502rpx;
				height: 100%;

				// width: 120rpx;
				// height: 120rpx;
				image {
					width: 120rpx;
					height: 120rpx;
				}
			}
		}
	}

	.tantanCard {
		width: 100%;
		height: 100%;
	}
</style>
