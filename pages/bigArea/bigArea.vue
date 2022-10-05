<template>
	<view class="bigAreaView">
		<common-dialog v-if="showDialog" title="温馨提示" :content="membershipLevelEquity.tipContent"
			:confirmText="membershipLevelEquity.btnName" v-on:on-click-dialog="onClickDialog"></common-dialog>
		<!-- 上面icon -->
		<!-- <u-sticky> -->
		<view class="topIcons u-flex u-flex-center u-flex-items-center">
			<view class="
          sigleIconview
          u-flex u-flex-column u-flex-center u-flex-items-center
        " v-for="(item, index) in topIconsList" :key="index" @click="handleNav(item)">
				<view class="img u-flex u-flex-center">
					<image :src="item.iconPath" mode="aspectFill"></image>
				</view>
				<view class="text u-flex u-flex-center">
					{{ item.text }}
				</view>
			</view>
		</view>
		<!-- </u-sticky> -->
		<view class="product_container">
			<view class="tabs u-flex u-flex-center u-flex-items-center">
				<view class="tab u-flex u-flex-column u-flex-center u-flex-items-center" v-for="(item, key) in tapsList"
					:key="key" @click="handleTab(key)">
					<view class="text" :class="{ activeStyle: productTabIndex === key }">
						{{ item.text }}
					</view>
					<view v-if="key === productTabIndex" class="line"></view>
				</view>
			</view>

			<view class="product_list">
				<view class="img_video_container u-flex u-flex-column">
					<!-- 费用类型 -->
					<view class="producnt_type u-flex" v-if="productTabIndex === 1">
						<view class="tab u-flex u-flex-column u-flex-center u-flex-items-center"
							v-for="(item, i) in videoTypeList" :key="i" @click="handlecostTypeTab(item, i)"
							:class="{ activeTabStyle: costTypeTabIndex === i }">
							<view class="text">
								{{ item.text }}
							</view>
						</view>
					</view>
					<!-- 产品列表 - 内容 -->
					<view class="product_content">
						<view class="product_video u-flex u-flex-wrap u-flex-between" v-if="productTabIndex === 1">
							<template v-if="videoList.length > 0">
								<view class="single_video" v-for="(item, index) in videoList" :key="index"
									@click="() => enterProduct('video', item)">
									<view class="video">
										<view class="img">
											<image src="/static/icon/small_play.png" mode="aspectFill"></image>
										</view>
										<!-- <video :src="item.video" :show-center-play-btn=aspectFill'false' :show-mute-btn='true'
										:enable-play-gesture='true' :controls="false" object-fit="fill"></video> -->
										<image :src="item.image || videoCoverImg" mode="aspectFill"></image>
									</view>
									<view class="desc u-flex u-flex-items-center">
										<!-- <view class="left ellipsis">{{ item.title }}</view>
                    <view class="right u-flex u-flex-items-center"
                      ><u-icon name="eye" size="16"></u-icon
                      >{{ item.score }}</view
                    > -->
										{{ item.title }}
									</view>
								</view>
							</template>
							<view class="empty" v-else>
								<u-empty mode="order" :text="emptyText"
									icon="http://cdn.uviewui.com/uview/empty/order.png">
								</u-empty>
							</view>
						</view>

						<view class="product_mm_content" v-else>
							<view class="photo_content u-flex u-flex-wrap u-flex-between">
								<view class="photoInfo" v-for="(item, index) in sisterList" :key="index"
									@click="() => enterProduct('photo', item)">
									<view class="image">
										<!-- <image src="/static/img/login/p2.jpeg" mode=""></image> -->
										<image :src="item.index_image_url" mode="aspectFill"></image>
									</view>
									<view class="nicheng ellipsis">
										{{ item.name }}
									</view>
									<view class="maps u-flex u-flex-items-center">
										<image src="/static/icon/map.png" mode="aspectFill"></image>
										<text class="city">{{
                      item.address | formatCityAreat
                    }}</text>
									</view>
									<view class="like" @click.stop="handleUnlike(item, index)">
										<image :src="`/static/icon/${
                        item.is_like ? 'like' : 'nolike'
                      }.png`" mode="aspectFill"></image>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="grace_loading" v-if="videoList.length > 0">
					<u-loadmore :status="status" :loading-text="loadingText" :loadmore-text="loadmoreText"
						:nomore-text="nomoreText" />
				</view>
			</view>
		</view>
		<u-back-top :scroll-top="scrollTop" top="600" :iconStyle="iconStyle"></u-back-top>
		<!-- 登录 -->
		<common-dialog v-if="showLoginDialog" title="温馨提示" :showCancelIcon="false" content="请完成登录!" confirmText="去登录"
			v-on:on-click-dialog="goLogin"></common-dialog>
	</view>
</template>

<script>
	import {
		getVideoList
	} from "@/config/api/product.js";
	import {
		getProductOtherInfos
	} from "@/config/api/user.js";
	import {
		likeSisterApi,
		cancelLikeSisterApi,
		getUserStatusApi,
	} from "@/config/api/sister.js";
	import {
		mapGetters,
		mapMutations
	} from "vuex";
	export default {
		data() {
			return {
				topIconsList: [{
						path: "/pages/index/index",
						text: "福利APP",
						engName: "app",
						iconPath: "/static/icon/bigArea01.png",
					},
					{
						path: "/pages/mine/mine",
						text: "交流群",
						engName: "group",
						iconPath: "/static/icon/bigArea02.png",
					},
					{
						path: "/pages/bigArea/welfareAddress/welfareAddress",
						text: "福利地址",
						engName: "addr",
						iconPath: "/static/icon/bigArea03.png",
					},
					{
						path: "/pages/mine/mine",
						text: "专属客服",
						engName: "kefu",
						iconPath: "/static/icon/bigArea04.png",
					},
				],
				tapsList: [{
						text: "上门服务",
					},
					{
						text: "视频",
					},
				],
				videoTypeList: [{
						text: "免费视频",
						type: "free",
					},
					{
						text: "会员视频",
						type: "pay",
					},
				],
				productTabIndex: 0,
				costTypeTabIndex: 0,
				videoList: [],
				is_pay: 2, // 1-付费视频 2-免费
				showDialog: false,
				sisterList: [],
				showLoginDialog: false,
				videoCoverImg: "/static/img/login/p2.jpeg",
				emptyText: "暂无视频",
				pageNum: 1,
				pageSize: 16,
				totalPages: 1, // 总页数
				status: "loadmore",
				loadingText: "努力加载中,先喝杯茶",
				loadmoreText: "轻轻上拉",
				nomoreText: "小主,更新已经在路上了",
				scrollTop: 0,
				iconStyle: {
					fontSize: "32rpx",
					color: "#2979ff",
				},
			};
		},
		onShow: () => {
			// console.log("App Show");
		},
		onPullDownRefresh() {
			// console.log("refresh");
			setTimeout(() => {
				this.videoList = [];
				this.sisterList = [];
				this.productTabIndex = 0;
				this.costTypeTabIndex = 0;
				this.initData();
				this.sisterList = uni.getStorageSync("home_sister_list_total");
				uni.stopPullDownRefresh();
			}, 600);
		},

		created() {
			if (!this.isLogin) {
				this.showLoginDialog = true;
				return;
			}
			this.initData();
			this.sisterList = uni.getStorageSync("home_sister_list_total");
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},
		// uni-app页面滚动到底部的事件，常用于上滑加载下一页数据
		onReachBottom() {
			// 判断当前页是否大于等于总页数
			if (this.productTabIndex === 1) {
				if (this.totalPages <= this.pageNum) {
					this.status = "nomore";
				} else {
					this.pageNum++;
					this.status = "loading";
					// console.log('加载中')
					this.getInitVideoList(); // 每次滑动请求接口，实现上拉加载更多数据
				}
			}
		},

		computed: {
			...mapGetters(["isLogin", "getUserInfos"]),
			membershipLevelEquity() {
				/**	membershipLevel
				 * @param
				 *
				 * 1-普通用户
				 * 2-普通会员
				 * 3-高级会员
				 */
				let obj = {
					btnName: "开通会员",
					tipContent: "成为我们的会员之后才能享受此项权益哦！",
					levelStatus: "ordinary",
				};
				if (this.getUserInfos?.status === 2) {
					(obj.btnName = "高级会员"),
					(obj.tipContent = "成为高级会员之后才能享受此项权益哦！"),
					(obj.levelStatus = "silver");
					return obj;
				}

				return obj;
			},
		},
		methods: {
			...mapMutations(["SET_USERINFO"]),
			goLogin() {
				uni.reLaunch({
					url: "/pages/login/login",
				});
				this.showLoginDialog = false;
			},
			initData() {
				this.getMemberStatus();
			},
			getInitVideoList() {
				getVideoList({
						is_pay: this.is_pay,
						limit: this.pageSize + "",
						page: this.pageNum + "",
					})
					.then((res) => {
						if (res.code === 100000) {
							this.totalPages = parseInt(
								(Number(res.data.total_row * 1) + this.pageSize - 1) /
								this.pageSize
							);
							// console.log(this.totalPages, '总页数', res.data.total_row)
							// this.videoList = res.data.list;
							this.videoList = [...this.videoList, ...res.data.list];
						}
					})
					.catch((err) => {
						console.log(err, "err");
					})
					.finally(() => {
						this.showOrderFlag = true;
					});
			},
			handleNav(item) {
				if (this.getUserInfos?.status === 1) {
					this.showDialog = true;
					return;
				}
				if (item.engName === "addr") {
					uni.navigateTo({
						url: `${item.path}`,
					});
					return;
				}

				if (item.engName === "app") {
					this.getJumpInfos("boon_app_url");
					return;
				}

				if (item.engName === "group") {
					if (this.getUserInfos?.status === 2) {
						this.showDialog = true;
						return;
					}
					this.getJumpInfos("exchange_group");
					return;
				}

				if (item.engName === "kefu") {
					if (this.getUserInfos?.status === 2) {
						this.showDialog = true;
						return;
					}
					this.getJumpInfos("exclusive_customer_service");
					return;
				}
			},
			handleTab(val) {
				if (val === this.productTabIndex) return;
				if (val === 1) {
					this.getInitVideoList();
					this.pageNum = 1;
				}
				if (val === 0) {
					this.sisterList = uni.getStorageSync("home_sister_list_total");
				}
				this.productTabIndex = val;
				this.costTypeTabIndex = 0;
			},
			handlecostTypeTab(val, i) {
				if (i === this.costTypeTabIndex) return;
				this.pageNum = 1;
				if (this.getUserInfos?.status === 1) {
					this.showDialog = true;
					return;
				}
				this.videoList = [];
				this.costTypeTabIndex = i;
				this.is_pay = val.type === "pay" ? 1 : 2;
				this.getInitVideoList();
			},

			enterProduct(type, val) {
				if (type === "video") {
					try {
						uni.setStorageSync("about_video_info", val);
						uni.navigateTo({
							url: `/pages/playVideo/playVideo?id=${
              val.id
            }&s=${new Date().getTime()}`,
						});
					} catch (e) {
						// error
					}

					return;
				}
				if (type === "photo") {
					uni.navigateTo({
						url: `/pages/dataDetail/dataDetail?id=${
            val.id
          }&name=${new Date().getTime()}`,
					});
					return;
				}
			},
			confirm() {
				this.showModal = false;
				if (!store.state.user.token) {
					uni.$u.route("/pages/login/login");
					return;
				}
			},
			onClickDialog(event) {
				if (event == "confirm") {
					uni.navigateTo({
						url: `/pages/mine/equity/equity`,
					});
					return;
				}
				this.showDialog = false;
			},
			async getJumpInfos(code) {
				try {
					let res = await getProductOtherInfos({
						code,
					});
					if (res.code === 100000) {
						// #ifdef APP-PLUS
						plus.runtime.openURL(res?.data?.value?.value);
						// #endif
						// #ifdef H5
						location.href = res?.data?.value?.value;
						// #endif
					}
				} catch (e) {
					// error
				}
			},
			stopScroll() {
				return false;
			},
			async handleUnlike(item, key) {
				this.$set(this.sisterList, key, {
					...item,
					is_like: item.is_like ? false : true,
				});
				let noSeeList = [];
				if (
					uni.getStorageSync("home_sister_list_total") &&
					uni.getStorageSync("home_sister_list_total").length >= 1
				) {
					noSeeList = uni.getStorageSync("home_sister_list_total");
					let index = noSeeList.findIndex(
						(noseeitem) => noseeitem.id === item.id
					);
					if (index > -1) {
						noSeeList.splice(index, 1, {
							...noSeeList[index],
							is_like: item.is_like ? false : true,
						});
						uni.setStorageSync("home_sister_list_total", noSeeList);
					}
				}
				let method = likeSisterApi;
				if (item.is_like) {
					method = cancelLikeSisterApi;
				}
				await method({
					sister_id: item.id,
				});
			},
			// 获取用户信息
			async getMemberStatus() {
				let res = await getUserStatusApi({});
				if (res.code === 100000) {
					this.SET_USERINFO(res.data.status);
				}
			},
		},
		filters: {
			formatCityAreat(val) {
				if (val) {
					let arr = val.split(" ");
					return arr[arr.length - 1];
				}
				return "";
			},
		},
	};
</script>

<style lang="scss" scoped>
	.bigAreaView {
		width: 750rpx;
		height: 100%;
		background: #f9f9f9;

		.grace_loading {
			width: 100%;
			padding: 30rpx 0rpx;
		}

		.topIcons {
			width: 750rpx;
			height: 222rpx;
			box-sizing: border-box;
			padding: 0 32rpx;
			background: #ffffff;

			.sigleIconview {
				width: 164rpx;
				height: 176rpx;

				.img {
					image {
						width: 100rpx;
						height: 100rpx;
					}
				}

				.text {
					font-size: 14px;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #444444;
					line-height: 20px;
				}
			}
		}

		.product_container {
			width: 750rpx;
			// height: 16rpx;
			height: 100%;
			margin-top: 16rpx;

			.tabs {
				width: 100%;
				height: 88rpx;
				background: #ffffff;

				.tab {
					width: 375rpx;
					height: 88rpx;
					font-size: 28rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #9c9b98;
					line-height: 40rpx;
					position: relative;

					.line {
						width: 80rpx;
						height: 6rpx;
						background: #d2a96f;
						border-radius: 4rpx;
						position: absolute;
						bottom: 0rpx;
					}

					.activeStyle {
						font-size: 28rpx;
						font-family: PingFangSC-Medium, PingFang SC;
						font-weight: 500;
						color: #000000;
						line-height: 40rpx;
					}
				}
			}

			.product_list {
				width: 100%;
				// height: 1600rpx;
				height: 100%;
				box-sizing: border-box;

				.img_video_container {
					width: 100%;
					// height: 1600rpx;
					height: 100%;

					padding: 0 48rpx;
					box-sizing: border-box;

					.producnt_type {
						width: 750rpx;
						width: 100%;
						height: 48rpx;
						margin-top: 20rpx;

						.tab {
							width: 140rpx;
							height: 48rpx;
							font-size: 24rpx;
							border-radius: 8rpx;
							margin-right: 24rpx;
							color: #9c9b98;
							background: rgba(156, 155, 152, 0.21);
						}

						.activeTabStyle {
							background: #f6ede1;
							font-family: PingFangSC-Medium, PingFang SC;
							font-weight: 500;
							color: #d2a96f;
						}
					}

					.product_content {
						width: 100%;
						height: 100%;
						margin-top: 20rpx;

						.product_video {
							.single_video {
								width: 312rpx;
								margin-bottom: 28rpx;

								.video {
									width: 312rpx;
									height: 312rpx;
									border-radius: 30rpx;
									border: 2rpx solid #eddbc3;
									box-sizing: border-box;
									position: relative;
									// z-index: 99;
									z-index: 9;


									video {
										width: 100%;
										height: 100%;
										border-radius: 30rpx;
									}

									image {
										width: 100%;
										height: 100%;
										border-radius: 30rpx;
									}

									.img {
										position: absolute;
										right: 20rpx;
										bottom: 20rpx;
										width: 36rpx;
										height: 36rpx;
										z-index: 3;

										image {
											width: 100%;
											height: 100%;
										}
									}
								}

								.desc {
									width: 100%;
									min-height: 40rpx;
									font-family: PingFangSC-Medium, PingFang SC;
									margin: 14rpx 0rpx;
									font-size: 24rpx;
									overflow: hidden;
									text-overflow: ellipsis;
									display: -webkit-box;
									-webkit-line-clamp: 2;
									-webkit-box-orient: vertical;

									.left {
										width: 150rpx;
										font-size: 24rpx;
										font-weight: 500;
										color: #444444;
									}

									.right {
										margin-left: auto;
										font-size: 20rpx;
										color: #666666;
									}
								}
							}

							.single_video:last-child {
								margin-bottom: 80rpx;
							}
						}

						.product_mm_content {
							.photo_content {
								.photoInfo {
									width: 312rpx;
									height: 500rpx;
									border-radius: 30rpx;
									margin-bottom: 32rpx;
									position: relative;
									font-family: PingFangSC-Regular, PingFang SC;

									image {
										width: 312rpx;
										height: 500rpx;
										border-radius: 30rpx;
									}

									.nicheng {
										position: absolute;
										width: 180rpx;
										bottom: 68rpx;
										left: 24rpx;
										font-size: 28rpx;
										font-weight: 500;
										color: #ffffff;
										line-height: 48rpx;
										z-index: 2;
										overflow: hidden;
										white-space: nowrap;
										text-overflow: ellipsis;
										-o-text-overflow: ellipsis;
									}

									.maps {
										position: absolute;
										bottom: 16rpx;
										left: 16rpx;
										width: 180rpx;
										z-index: 2;

										.city {
											width: 100rpx;
											overflow: hidden;
											white-space: nowrap;
											text-overflow: ellipsis;
											-o-text-overflow: ellipsis;
										}

										image {
											width: 48rpx;
											height: 48rpx;
										}

										.city {
											font-size: 24rpx;
											font-weight: 400;
											color: #ffffff;
											line-height: 40rpx;
										}
									}

									.like {
										position: absolute;
										bottom: 42rpx;
										right: 16rpx;
										z-index: 2;

										image {
											width: 40rpx;
											height: 40rpx;
										}
									}
								}

								.photoInfo:last-child {
									margin-bottom: 80rpx;
								}

								.photoInfo::after {
									position: absolute;
									width: 312rpx;
									height: 500rpx;
									// background: linear-gradient(360deg,
									// 		#000000 0%,
									// 		rgba(0, 0, 0, 0) 100%);
									background: linear-gradient(360deg,
											#000000 0%,
											rgba(102, 102, 102, 0) 22%);
									border-radius: 30rpx;
									content: "";
									top: 0;
									left: 0;
								}
							}
						}
					}
				}
			}
		}

		.empty {
			width: 100%;
			height: calc(100vh - 300rpx);
			margin: 90rpx 0;
		}
	}
</style>
