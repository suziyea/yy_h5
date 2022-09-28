<template>
	<view class="pay_container">
		<u-tabs lineColor="#EDDBC3" :current="topBarIndex" lineWidth="80rpx" :scrollable="false" :list="topBarList"
			itemStyle="width:250rpx; height: 88rpx; padding:0rpx;"
			activeStyle="font-size: 28rpx;font-weight: 500;color: #000000;" @click="click">
		</u-tabs>
		<swiper :current='topBarIndex'  @change="swiperChange">
			<swiper-item v-for="(item,index) in topBarList" :key="index">
				<view class="orderRecord u-flex u-flex-column u-flex-items-center">
					<view class="orderinfo u-flex u-flex-center u-flex-items-center ">
						<view class="name">
							<view class="title">
								升级黄金会员
							</view>
							<view class="date">
								2022-08-08 19:23:33
							</view>
						</view>

						<view class="money">
							999.00
							<!-- 0.02<text class="">元</text> -->
						</view>
						<view class="status errorBgColor">
							未支付
						</view>
					</view>

					<view class="orderinfo u-flex u-flex-center u-flex-items-center ">
						<view class="name">
							<view class="title">
								AM小妹单独消费
							</view>
							<view class="date">
								2022-08-08 19:23:33
							</view>
						</view>

						<view class="money">
							999.00
							<!-- 0.02<text class="">元</text> -->
						</view>
						<view class="status errorBgColor">
							未支付
						</view>
					</view>
					<view class="orderinfo u-flex u-flex-center u-flex-items-center ">
						<view class="name">
							<view class="title">
								AM小妹单独消费
							</view>
							<view class="date">
								2022-08-08 19:23:33
							</view>
						</view>

						<view class="money">
							1999.00
							<!-- 0.02<text class="">元</text> -->
						</view>
						<view class="status successBgColor">
							未支付
						</view>
					</view>
				</view>
			</swiper-item>

		</swiper>
	</view>
</template>

<script>
	import {
		getMyOrderList
	} from "@/config/api/product.js";
	export default {
		data() {
			return {
				emptyText: '暂无订单',
				orderList: [],
				showOrderFlag: false,
				topBarList: [{
					name: '全部',
				}, {
					name: '待支付',
				}, {
					name: '支付成功'
				}, {
					name: '支付失败'
				}],
				topBarIndex: 0
			}
		},
		created() {
			// this.getInitList()
		},
		onLoad() {
			this.loadmore()
		},
		filters: {
			formatOrderType(value) {
				if (value == '1') {
					return '第一笔付款'
				}
				if (value == '2') {
					return '第二笔付款'
				}
				return ''
			},
			formatPayType(value) {
				if (value == 1) {
					return '已支付'
				}
				if (value == 2) {
					return '未支付'
				}
				return '失败'
			},
			formatTagColorType(value) {
				if (value == 1) {
					return 'success'
				}
				if (value == 2) {
					return 'warning'
				}
				return 'error'
			},
			formatGetTime(val) {
				let timestamp = new Date(val).getTime()
				return uni.$u.timeFormat(timestamp, 'yyyy-mm-dd hh:MM:ss');
			}

		},
		methods: {
			click(item) {
				console.log('item', item);
				this.topBarIndex = item.index;
			},
			getInitList() {
				getMyOrderList({}).then((res) => {
					if (res.code === 100000) {
						if (res?.data?.length > 0) {
							this.orderList = res?.data
						}
					}
				}).catch((err) => {
					console.log(err, 'err');
				}).finally(() => {
					this.showOrderFlag = true;
				})
			},
			scrolltolower() {
				this.loadmore()
			},
			loadmore() {
				// 滚动分页
			},
			swiperChange(val) {
				console.log(val,'你好')
				this.topBarIndex = val.target.current;

			}
		},
		computed: {
			addClassName() {
				if (this.emptyStatus) {
					return 'u-flex u-flex-column u-flex-center u-flex-items-center'
				}
				return ''
			},
			emptyStatus() {
				if (this.orderList?.length !== 0) return false
				return true
			}
		}
	}
</script>

<style lang="scss" scoped>
	.pay_container {
		width: 100%;
		min-height: 100vh;
		background: #F6F6F6;

		/deep/ .u-tabs__wrapper {
			width: 750rpx;
			// height: 88rpx;
			height: 100%;
			background: #FFFFFF;
			font-size: 28rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #9C9B98;
			line-height: 40rpx;
		}

		/deep/ .uni-swiper-wrapper {
			height: 1800rpx !important;
		}

		.orderRecord {
			width: 100%;
			margin-top: 12rpx;

			.orderinfo {
				width: 100%;
				height: 146rpx;
				background: #FFFFFF;
				border-radius: 16rpx;
				margin-bottom: 12rpx;
				padding: 0 44rpx;
				box-sizing: border-box;

				.name {
					width: 260rpx;
					font-family: PingFangSC-Medium, PingFang SC;

					.title {
						width: 100%;
						font-size: 28rpx;
						font-weight: 500;
						color: #000000;
						line-height: 40rpx;
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
						-o-text-overflow: ellipsis;
					}

					.date {
						width: 100%;
						font-size: 24rpx;
						font-weight: 400;
						color: #9C9B98;
						line-height: 34rpx;
					}
				}

				.status {
					margin-left: auto;
					border-radius: 24rpx;
					font-size: 28rpx;
					font-weight: 500;
				}

				.orangeBgColor {
					color: #F48A0E;
				}

				.successBgColor {
					color: #6FD028;
				}

				.errorBgColor {
					color: #F16B6F
				}

				.money {
					margin-left: 142rpx;
					font-size: 28rpx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #D2A96F;
					line-height: 40rpx;

					.smallText {
						font-size: 20rpx;
						font-weight: 600;
						color: #B5804F;
						line-height: 28rpx;
					}
				}
			}
		}

		.order_list {
			/deep/ .u-cell__left-icon-wrap {
				width: 100rpx;
				margin-right: 12rpx;
			}
		}
	}
</style>
