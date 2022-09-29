<template>
  <view class="bigAreaView">
    <u-notify message="Hi uView" :show="show"></u-notify>
    <common-dialog
      v-if="showDialog"
      title="温馨提示"
      :content="membershipLevelEquity.tipContent"
      :confirmText="membershipLevelEquity.btnName"
      v-on:on-click-dialog="onClickDialog"
    ></common-dialog>
    <!-- 上面icon -->
    <view class="topIcons u-flex u-flex-center u-flex-items-center">
      <view
        class="
          sigleIconview
          u-flex u-flex-column u-flex-center u-flex-items-center
        "
        v-for="(item, index) in topIconsList"
        :key="index"
        @click="handleNav(item)"
      >
        <view class="img u-flex u-flex-center">
          <image :src="item.iconPath" mode="aspectFill"></image>
        </view>
        <view class="text u-flex u-flex-center">
          {{ item.text }}
        </view>
      </view>
    </view>
    <view class="product_container">
      <view class="tabs u-flex u-flex-center u-flex-items-center">
        <view
          class="tab u-flex u-flex-column u-flex-center u-flex-items-center"
          v-for="(item, key) in tapsList"
          :key="key"
          @click="handleTab(key)"
        >
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
            <view
              class="tab u-flex u-flex-column u-flex-center u-flex-items-center"
              v-for="(item, i) in videoTypeList"
              :key="i"
              @click="handlecostTypeTab(i)"
              :class="{ activeTabStyle: costTypeTabIndex === i }"
            >
              <view class="text">
                {{ item.text }}
              </view>
            </view>
          </view>
          <!-- 产品列表 - 内容 -->
          <view class="product_content">
            <view
              class="product_video u-flex u-flex-wrap u-flex-between"
              v-if="productTabIndex === 1"
            >
              <view
                class="single_video"
                v-for="(item, index) in videoList"
                :key="index"
                @click="() => enterProduct('video', item)"
              >
                <view class="video">
                  <view class="img">
                    <image
                      src="/static/icon/small_play.png"
                      mode="aspectFill"
                    ></image>
                  </view>
                  <!-- <video :src="item.video" :show-center-play-btn=aspectFill'false' :show-mute-btn='true'
										:enable-play-gesture='true' :controls="false" object-fit="fill"></video> -->
                  <image :src="item.video" mode="aspectFill"></image>
                </view>
                <view class="desc u-flex u-flex-items-center">
                  <view class="left">珍妮Jenny</view>
                  <view class="right">上海</view>
                </view>
              </view>
            </view>

            <view class="product_mm_content" v-else>
              <view class="photo_content u-flex u-flex-wrap u-flex-between">
                <view
                  class="photoInfo"
                  v-for="(item, index) in sisterList"
                  :key="index"
                  @click="() => enterProduct('photo', item)"
                >
                  <view class="image">
                    <!-- <image src="/static/img/login/p2.jpeg" mode=""></image> -->
                    <image
                      :src="item.index_image_url"
                      mode="aspectFill"
                    ></image>
                  </view>
                  <view class="nicheng">
                    {{ item.name }}
                  </view>
                  <view class="maps u-flex u-flex-items-center">
                    <image src="/static/icon/map.png" mode="aspectFill"></image>
                    <text class="city">{{
                      item.address | formatCityAreat
                    }}</text>
                  </view>
                  <view class="like">
                    <!-- <image src="/static/icon/like.png" mode=""></image> -->
                    <image
                      src="/static/icon/nolike.png"
                      mode="aspectFill"
                    ></image>
                  </view>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>

    
  </view>
</template>

<script>
import { getVideoList } from "@/config/api/product.js";
import { getProductOtherInfos } from "@/config/api/user.js";
import { mapGetters, mapMutations } from "vuex";
export default {
  data() {
    return {
      topIconsList: [
        {
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
      tapsList: [
        {
          // "text": "上门服务",
          text: "hello",
        },
        {
          text: "视频",
        },
      ],
      videoTypeList: [
        {
          text: "免费视频",
        },
        {
          text: "会员视频",
        },
      ],
      productTabIndex: 0,
      costTypeTabIndex: 0,
      videoList: [],
      is_pay: 2, // 1-付费视频 2-免费
      showDialog: false,
      sisterList: [],
      show: true,
    };
  },
  created() {
    this.initData();
    this.sisterList = uni.getStorageSync("home_sister_list_total");
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
    initData() {
      this.getInitVideoList();
    },
    getInitVideoList() {
      getVideoList({
        is_pay: this.is_pay,
      })
        .then((res) => {
          if (res.code === 100000) {
            this.videoList = res?.data.list;
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
        this.getJumpInfos("exchange_group");
        return;
      }

      if (item.engName === "kefu") {
        this.getJumpInfos("exclusive_customer_service");
        return;
      }
    },
    handleTab(val) {
      if (val === this.productTabIndex) return;
      this.productTabIndex = val;
      this.costTypeTabIndex = 0;
    },
    handlecostTypeTab(i) {
      if (i === this.costTypeTabIndex) return;
      if (this.getUserInfos?.status !== 2 || this.getUserInfos?.status !== 3) {
        this.showDialog = true;
        return;
      }
      this.costTypeTabIndex = i;
      this.is_pay = i + 1;
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
          url: `/pages/dataDetail/dataDetail?id=${val}&name=${new Date().getTime()}`,
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
        if (res.code === 10000) {
          uni.navigateTo({
            url: `/pages/webview/webview?urlPath=${encodeURIComponent(
              res?.data?.value?.value || ""
            )}`,
          });
        }
      } catch (e) {
        // error
      }
    },
    close() {
      // this.$emit('on-click-dialog', 'close')
	  this.payModal = false;
      console.log("close");
    },
    confirm() {
      let phone = this.reservePhone.replace(/\s*/g, "");
      // this.$emit('on-click-dialog', 'confirm')
      if (!uni.$u.test.mobile(phone)) {
        console.log("手机号不正确", phone);
        return;
      }
      console.log("confirm", phone);
    },
    cancel() {
      // this.$emit('on-click-dialog', 'cancel')
      console.log("ceancel");
    },
    stopScroll() {
      return false;
    },
    handleTelInput(e) {
      var len = this.reservePhone.length;
      // var {phone} = this.formContent
      var reg = new RegExp("\\s", "g");
      var mobile_ = "";
      this.reservePhone = this.reservePhone.replace(reg, "");
      for (var i = 0; i < len; i++) {
        if (i == 2 || i == 6) {
          // charAt(int index)方法是一个能够用来检索特定索引下的字符的String实例的方法。
          //这里用来检索this.reservePhone 的index为2和6
          mobile_ = mobile_ + this.reservePhone.charAt(i) + " "; //当检索到2和6时，将原本的mobile_值加上新增的this.reservePhone 值再加一个" "后再赋值给mobile_自己
        } else {
          mobile_ += this.reservePhone.charAt(i);
        }
      }
      this.reservePhone = mobile_;
    }
  },
  filters: {
    formatCityAreat(val) {
      let arr = val.split(" ");
      return arr[arr.length - 1];
    },
  },
};
</script>

<style lang="scss" scoped>
.bigAreaView {
  width: 750rpx;
  height: 100%;
  // height: 1000rpx;
  background: #f9f9f9;

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
      height: 1600rpx;
      box-sizing: border-box;

      .img_video_container {
        width: 100%;
        height: 1600rpx;
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
          // height: 1000rpx;
          height: 100%;
          margin-top: 20rpx;

          .product_video {
            .single_video {
              width: 312rpx;
              height: 380rpx;
              margin-bottom: 28rpx;

              .video {
                width: 312rpx;
                height: 312rpx;
                border-radius: 30rpx;
                border: 2rpx solid #eddbc3;
                box-sizing: border-box;
                position: relative;
                z-index: 99;

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
                height: 40rpx;
                font-family: PingFangSC-Medium, PingFang SC;
                margin: 14rpx 0rpx;

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

              .photoInfo::after {
                position: absolute;
                width: 312rpx;
                height: 500rpx;
                background: linear-gradient(
                  360deg,
                  #000000 0%,
                  rgba(0, 0, 0, 0) 100%
                );
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

}
</style>
