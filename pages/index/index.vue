<template>
	<view class="home_container">
		<!-- <flipcard ref="stack" :pages="stackList" @click="handleStackClicked"></flipcard> -->
		<view class="home_content u-flex  u-flex-column  u-flex-items-center">
			<view class="mm_card_container">
				<Flycard @onDragMove='onCardDragMove' @onDragStop='onCardDragStop' @onThrowDone='onCardThrowDone'
					:cardWidth="654" :cardHeight="892" :throwTriggerDistance="100" dragDirection="horizontal"
					:hasShadow="true">
					<view slot="firstCard" style="width:100%;height:100%;">
						<view v-if="cards[0]" class="tantanCard" @click="clickCard">
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
			</view>
			
			<!-- <view class="actionBar u-flex  u-flex-center u-flex-items-center">
				<view class="action_container u-flex u-flex-items-center u-flex-between">
					<view class="next_view action_img u-flex  u-flex-center u-flex-items-center">
						<image src="/static/img/home_next.png" mode="aspectFill"></image>
					</view>
					<view class="like_view action_img u-flex  u-flex-center u-flex-items-center">
						<image src="/static/img/home_like.png" mode="aspectFill"></image>
					</view>
				</view>
			</view> -->

		</view>
		<view class="tab">
			<!-- <Tabbar currentPage="index"></Tabbar> -->
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
				// cards: [{
				// 		image: "/static/img/login/p1.jpeg"
				// 	},
				// 	{
				// 		image: "/static/img/login/p2.jpeg"
				// 	},
				// 	{
				// 		image: "/static/img/login/p3.jpeg"
				// 	},
				// 	{
				// 		image: "/static/img/login/p4.jpeg"
				// 	},
				// 	{
				// 		image: "/static/img/login/p5.jpeg"
				// 	},
				// 	{
				// 		image: "/static/img/login/p8.jpeg"
				// 	}
				// ],
				cards: [{
					image: 'https://t7.baidu.com/it/u=2788258239,1192178650&fm=193&f=GIF'
				}, {
					image: 'https://t7.baidu.com/it/u=2295973985,242574375&fm=193&f=GIF'
				}, {
					image: 'https://t7.baidu.com/it/u=1522757721,1408622889&fm=193&f=GIF'
				}, {
					image: 'https://t7.baidu.com/it/u=192600061,2605776202&fm=193&f=GIF'
				}, {
					image: 'https://t7.baidu.com/it/u=1385589637,1465073693&fm=193&f=GIF'
				}, {
					image: 'https://t7.baidu.com/it/u=27018761,936335273&fm=193&f=GIF'
				}],
				sisterList: [],
			}
		},
		created() {
			// this.getInitList()
		},
		onLoad() {

		},
		methods: {
			clickCard() {
				console.log('点击了噢---')
			},
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
				console.log('122')
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

		.home_content {
			width: 100%;
			height: 100%;

			.mm_card_container {
				width: 100%;
				height: 940rpx;
				padding: 0 48rpx;
				box-sizing: border-box;
				border: 2px solid red;
			}
			.actionBar {
				width: 100%;
				height: 240rpx;
				border: 1px solid green;
				.action_container {
					width: 100%;
					height: 100%;
					padding: 0 100rpx;
					box-sizing: border-box;
					// border: 2px solid hotpink;
					.next_view {
						
					}
					.like_view {
						
					}
					.action_img {
						image {
							width: 120rpx;
							height: 120rpx;
						}
					}
				}
			}
		}

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
