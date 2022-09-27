<template>
	<view class="container_detail">
		<!-- 详情图片 -->
		<view class="sisterImg">
			<!-- <img src="/static/img/login/p1.jpeg" alt=""> -->
			<!-- <image src="/static/img/login/p1.jpeg" mode=""></image> -->
			<u-swiper :list="list3" indicator indicatorMode="dot" height="416" indicatorStyle='bottom: 90px'
				indicatorActiveColor="#BD9762" circular></u-swiper>
		</view>
		<!-- 资料卡 -->
		<view class="data_card">
			<!-- 昵称 -->
			<view class="address_info u-flex u-flex-center u-flex-items-center">
				<view class="petusename">
					<view class="info_name ellipsis">
						{{mm_sisterInfo.name}}
					</view>
					<view class="base  u-flex u-flex-center u-flex-items-center">
						<image src="/static/icon/detail_map.png" mode=""></image>
						<view class="text ellipsis">{{mm_sisterInfo.address}}</view>
					</view>
				</view>
				<view class="age">
					{{mm_sisterInfo.age}}
				</view>
			</view>

			<!-- 基本资料 -->
			<view class="baseInfoTips">
				<view class="base_title">
					基本资料
				</view>
				<view class="tips_container u-flex u-flex-wrap ">
					<view class="tip ml_12 u-flex u-flex-center u-flex-items-center" v-for="(item,index) in mm_sisterInfo.base_data" :key="index">
						{{item}}
					</view>
				</view>
			</view>

			<!-- 更多联系方式 -->
			<view class="baseInfoTips">
				<view class="base_title">
					更多联系方式
				</view>
				<view class="tips_container u-flex u-flex-wrap u-flex-between">
					<view class="tip u-flex u-flex-center u-flex-items-center">
						<!-- 空闲时间段：晚上8-凌晨6点 -->
						{{mm_sisterInfo.free_time}}
					</view>
					<view class="view_contact u-flex u-flex-center u-flex-items-center" @click="lookContact">
						查看联系方式
					</view>
				</view>
			</view>

			<!-- 自我描述 -->
			<view class="baseInfoTips">
				<view class="base_title">
					自我描述
				</view>
				<view class="tips_container u-flex u-flex-wrap u-flex-between">
					<view class="tip u-flex u-flex-center u-flex-items-center">
						{{mm_sisterInfo.remark}}
					</view>
				</view>
			</view>

			<!-- 预约细则 -->
			<view class="baseInfoTips">
				<view class="base_title">
					预约细则
				</view>
				<view class="tips_container u-flex u-flex-wrap u-flex-between">
					<view class="tip u-flex u-flex-center u-flex-items-center">
						本站价格是小妹的服务价格，来回路费需要哥哥承担哦，空降费用联系上小妹自行商议（本站价格可抵扣）
					</view>
				</view>
			</view>
		</view>
		<view class="bottomTabbar u-flex u-flex-center u-flex-items-center">
			<view class="subscribe_view u-flex  u-flex-items-center">
				<view class="price">
					<view class="money">{{mm_sisterInfo.price}}</view>
					<view class="text">元/次</view>
				</view>
				<view class="subscribeBtn u-flex u-flex-center u-flex-items-center">
					<view class="text" @click="clicksubscribe">立即预约</view>

				</view>
			</view>

		</view>
	</view>
</template>

<script>
	import {
		getSisterDetail,
		getMoreSisterContact,
		amOrder
	} from "@/config/api/sister.js";
	export default {
		data() {
			return {
				list3: [
					// '/static/img/login/p1.jpeg',
					// '/static/img/login/p2.jpeg',
					// '/static/img/login/p3.jpeg',
					'https://t7.baidu.com/it/u=2788258239,1192178650&fm=193&f=GIF',
					'https://t7.baidu.com/it/u=2295973985,242574375&fm=193&f=GIF'


				],
				indicatorStyle: {
					bottom: 66
				},
				// detailImgs: [{
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
				detailImgs: [{
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
				mm_sisterInfo: null,
				moreContactInfo: [],
				order_no: ''
			}
		},
		created() {
			this.storageUserInfo = uni.getStorageSync('userInfo');
			this.initData()
		},
		methods: {
			initData() {
				this.getDetails()
			},
			getDetails() {
				getSisterDetail({
					id: 1,
				}).then((res) => {
					if (res.code === 100000) {
						this.mm_sisterInfo = res?.data || {}
					}
				}).catch((err) => {
					console.log(err, 'err');
				})
			},
			lookContact() {
				getMoreSisterContact({id: 1}).then((res) => {
					if (res.code === 100000) {
						this.moreContactInfo = res?.data?.more_contract || []
					}
				}).catch((err) => {
					console.log(err, 'err');
				})
			},
			clicksubscribe() {
				amOrder({sister_id: 1}).then((res) => {
					if (res.code === 100000) {
						this.order_no = res?.data?.order_no || ''
					}
				}).catch((err) => {
					console.log(err, 'err');
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container_detail {
		width: 750rpx;
		height: 100%;
		position: relative;

		.sisterImg {
			width: 750rpx;
			height: 832rpx;
			box-sizing: border-box;

			image {
				width: 750rpx;
				height: 832rpx;
			}
		}

		.data_card {
			margin-top: -120rpx;
			width: 750rpx;
			// height: 1800rpx;
			height: 100%;
			box-sizing: border-box;
			position: relative;
			padding: 50rpx 48rpx;
			// z-index: 2;
			border-radius: 40px 40px 0px 0px;
			background: #fff;

			.address_info {
				width: 100%;
				height: 130rpx;
				box-sizing: border-box;
				margin-bottom: 8rpx;

				.petusename {
					height: 130rpx;
					box-sizing: border-box;

					.info_name {
						width: 308rpx;
						// height: 76rpx;
						font-size: 48rpx;
						font-family: PingFangSC-Medium, PingFang SC;
						font-weight: 500;
						// color: #FFFFFF;
						line-height: 76rpx;
					}

					.base {
						image {
							width: 48rpx;
							height: 48rpx;
						}

						.text {
							width: 276rpx;
							font-size: 28rpx;
							font-family: PingFangSC-Regular, PingFang SC;
							font-weight: 400;
							line-height: 40rpx;
						}
					}
				}

				.age {
					margin-left: auto;
					font-size: 32rpx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #444444;
					line-height: 44rpx;

				}
			}

			.baseInfoTips {
				width: 100%;
				margin-top: 72rpx;

				.base_title {
					width: 100%;
					height: 44rpx;
					font-size: 32rpx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #000000;
					line-height: 44rpx;
					margin-bottom: 20rpx;
				}

				.tips_container {
					font-size: 28rpx;

					.tip {
						background: rgba(210, 169, 111, 0.14);
						border-radius: 8rpx;
						margin-bottom: 20rpx;
						font-family: PingFangSC-Medium, PingFang SC;
						font-weight: 500;
						color: #D2A96F;
						line-height: 40rpx;
						padding: 20rpx 20rpx;
						box-sizing: border-box;
					}

					.ml_12 {
						margin-left: 12rpx;
					}

					.view_contact {
						width: 100%;
						height: 80rpx;
						border-radius: 12rpx;
						border: 2rpx solid #D2A96F;
						margin-top: 20rpx;
						color: #D2A96F;
					}
				}
			}

			.baseInfoTips:last-child {
				margin-bottom: 128rpx;
			}

		}

		.bottomTabbar {
			width: 750rpx;
			height: 128rpx;
			background: #FFFFFF;
			padding: 0 32rpx;
			position: fixed;
			left: 0;
			bottom: 0;
			box-shadow: 0rpx -12rpx 32px 0rpx rgba(0, 0, 0, 0.05);
			box-sizing: border-box;

			.subscribe_view {
				width: 100%;

				.price {
					margin-right: auto;

					.money {
						font-size: 32rpx;
						font-family: PingFangSC-Semibold, PingFang SC;
						font-weight: 600;
						color: #F72B2B;
						line-height: 44rpx;
					}

					.text {
						font-size: 24rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #17204D;
						line-height: 34rpx;
					}
				}

				.subscribeBtn {
					width: 548rpx;
					height: 96rpx;
					background: linear-gradient(90deg, #EFD4AF 0%, #C1914B 100%);
					border-radius: 48rpx;
					font-size: 32rpx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #7F5D2E;
					line-height: 40rpx;
				}
			}


		}

		.sisterImg::after {
			position: absolute;
			width: 750rpx;
			height: 832rpx;
			background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.5) 100%);
			content: "";
			top: 0;
			left: 0;
		}
	}
</style>
