<template>
  <view class="container_detail" v-if="showFlag">
    <u-toast class="toastTop" ref="uToast"></u-toast>
    <!-- 详情图片 -->
    <view class="sisterImg">
      <u-swiper
        :list="mm_sisterInfo.image_url"
        indicator
        indicatorMode="dot"
        height="416"
        indicatorStyle="bottom: 90px"
        indicatorActiveColor="#BD9762"
        circular
      ></u-swiper>
    </view>
    <!-- 资料卡 -->
    <view class="data_card">
      <!-- 昵称 -->
      <view class="address_info u-flex u-flex-center u-flex-items-center">
        <view class="petusename">
          <view class="info_name ellipsis">
            {{ mm_sisterInfo.name || "" }}
          </view>
          <view class="base u-flex u-flex-center u-flex-items-center">
            <image src="/static/icon/detail_map.png" mode=""></image>
            <view class="text ellipsis">{{ mm_sisterInfo.address }}</view>
          </view>
        </view>
        <view class="age"> {{ mm_sisterInfo.age }} 岁 </view>
      </view>

      <!-- 基本资料 -->
      <view class="baseInfoTips">
        <view class="base_title"> 基本资料 </view>
        <view class="tips_container u-flex u-flex-wrap">
          <view
            class="tip ml_12 u-flex u-flex-center u-flex-items-center"
            v-for="(item, index) in mm_sisterInfo.base_data"
            :key="index"
          >
            {{ item }}
          </view>
        </view>
      </view>

      <!-- 更多联系方式 -->
      <view class="baseInfoTips">
        <view class="base_title"> 更多联系方式 </view>
        <view class="tips_container u-flex u-flex-wrap u-flex-between">
          <view class="tip u-flex u-flex-center u-flex-items-center">
            <!-- 空闲时间段：晚上8-凌晨6点 -->
            {{ mm_sisterInfo.free_time }}
          </view>
          <view
            class="view_contact u-flex u-flex-center u-flex-items-center"
            @click="lookContact"
          >
            查看联系方式
          </view>
        </view>
      </view>

      <!-- 自我描述 -->
      <view class="baseInfoTips">
        <view class="base_title"> 自我描述 </view>
        <view class="tips_container u-flex u-flex-wrap u-flex-between">
          <view class="tip u-flex u-flex-center u-flex-items-center">
            {{ mm_sisterInfo.remark }}
          </view>
        </view>
      </view>

      <!-- 预约细则 -->
      <view class="baseInfoTips">
        <view class="base_title"> 预约细则 </view>
        <view class="tips_container u-flex u-flex-wrap u-flex-between">
          <view class="tip u-flex u-flex-center u-flex-items-center">
            {{
              sister_rules ||
              "本站价格是小妹的服务价格，来回路费需要哥哥承担哦，空降费用联系上小妹自行商议（本站价格可抵扣）"
            }}
          </view>
        </view>
      </view>
    </view>
    <view class="bottomTabbar u-flex u-flex-center u-flex-items-center">
      <view class="subscribe_view u-flex u-flex-items-center">
        <view class="price">
          <view class="money">{{ mm_sisterInfo.price }}</view>
          <view class="text">元/次</view>
        </view>
        <view
          class="subscribeBtn u-flex u-flex-center u-flex-items-center"
          @click="beforeSubscribe"
        >
          <view class="text">立即预约</view>
        </view>
      </view>
    </view>
    <!-- 选择支付 -->
    <view v-if="showSelectPayPopup">
      <selectModal
        :showBottomPopup="showSelectPayPopup"
        @on-click-pay-mode="handlePayMode"
        @on-click-modal-close="closeSelectModal"
      ></selectModal>
    </view>

    <!-- 展示图片 -->
    <view v-if="showPreImgModalVisible">
      <payImgModal
        :showModal="showPreImgModalVisible"
        :payQrcode="paySrcImg"
        @on-click-preimgmodal-cancel="closePreimgmodalOverlay"
        @on-click-preimgmodal-close="closePreImgModal"
      ></payImgModal>
    </view>

    <!-- 输入手机号 -->
    <view v-if="phoneModalStatus">
      <phoneModal
        @confirmSubmit="handleUserSavePhone"
        @closePhoneModal="closePhoneModal"
      ></phoneModal>
    </view>

    <u-modal :show="showContractModal" title="联系方式" confirmColor='#7f5d2e' @confirm='handleCoonfirmModal'>
			<view class="slot-content">
				<u-tooltip v-if="moreContactInfo.length >= 1 " :text="moreContactInfo[0]"></u-tooltip>
				<u-tooltip v-if="moreContactInfo.length >= 2" :text="moreContactInfo[1]"></u-tooltip>
			</view>
		</u-modal>
  </view>
</template>

<script>
import {
  getSisterDetail,
  getMoreSisterContact,
  amOrder,
  getPayQrcode,
  savePhoneApi,
} from "@/config/api/sister.js";
import { getProductOtherInfos } from "@/config/api/user.js";
import selectModal from "@/components/selectModal/selectModal.vue";
import payImgModal from "@/components/payImgModal/payImgModal.vue";
import phoneModal from "@/components/phoneModal/phoneModal.vue";
export default {
  components: {
    selectModal,
    payImgModal,
    phoneModal,
  },
  data() {
    return {
      list3: [
        "https://t7.baidu.com/it/u=2788258239,1192178650&fm=193&f=GIF",
        "https://t7.baidu.com/it/u=2295973985,242574375&fm=193&f=GIF",
      ],
      // swiperList:
      detailImgs: [
        {
          image: "https://t7.baidu.com/it/u=2788258239,1192178650&fm=193&f=GIF",
        },
        {
          image: "https://t7.baidu.com/it/u=2295973985,242574375&fm=193&f=GIF",
        },
        {
          image: "https://t7.baidu.com/it/u=1522757721,1408622889&fm=193&f=GIF",
        },
        {
          image: "https://t7.baidu.com/it/u=192600061,2605776202&fm=193&f=GIF",
        },
        {
          image: "https://t7.baidu.com/it/u=1385589637,1465073693&fm=193&f=GIF",
        },
        {
          image: "https://t7.baidu.com/it/u=27018761,936335273&fm=193&f=GIF",
        },
      ],
      mm_sisterInfo: {
        name: "",
      },
      moreContactInfo: [],
      order_no: "",
      sisterId: "",
      showFlag: false,
      sister_rules: "", // 预约细则
      showSelectPayPopup: false, // 选择支付 弹窗状态
      showPreImgModalVisible: false, // 展示 图片组件 弹窗状态
      phoneModalStatus: false, // 展示 输入手机号组件 弹窗状态
      paySrcImg: "",
      showContractModal: false, // 展示 查看更多联系方式 弹窗状态
    };
  },
  onLoad(options) {
    this.sisterId = options.id || "1";
  },
  created() {
    this.storageUserInfo = uni.getStorageSync("userInfo");
    this.initData();
    this.getJumpInfos("reservation_detail");
  },
  methods: {
    initData() {
      this.getDetails();
    },
    getDetails() {
      getSisterDetail({
        id: this.sisterId,
      })
        .then((res) => {
          if (res.code === 100000) {
            this.mm_sisterInfo = res?.data || {};
            this.mm_sisterInfo.image_url = [res.data.index_image_url,...res.data.image_url]
          }
        })
        .catch((err) => {
          console.log(err, "err");
        })
        .finally(() => {
          this.showFlag = true;
        });
    },
    lookContact() {
      getMoreSisterContact({
        id: this.sisterId,
      })
        .then((res) => {
          if (res.code === 100000) {
            this.moreContactInfo = res?.data?.more_contract || [];
            this.showContractModal = true;
          }
        })
        .catch((err) => {
          console.log(err, "err");
        });
    },
    // 立即预约前操作
    beforeSubscribe() {
      this.phoneModalStatus = true;
    },
    clicksubscribe() {
      amOrder({
        sister_id: this.sisterId,
      })
        .then((res) => {
          if (res.code === 100000) {
            this.order_no = res?.data?.order_no || "";
          }
        })
        .catch((err) => {
          console.log(err, "err");
        });
    },
    async getJumpInfos(code) {
      try {
        let res = await getProductOtherInfos({
          code,
        });
        if (res.code === 100000) {
          this.sister_rules = res.data.remark || "";
        }
      } catch (e) {
        // error
      }
    },
    // 选择支付方式
    async handlePayMode(item) {
      let res = await getPayQrcode({});
      if (res.code === 100000) {
        this.paySrcImg = "";
        if (item.typeStatus === 1) {
          this.paySrcImg = res.data.wx;
        }
        if (item.typeStatus === 2) {
          this.paySrcImg = res.data.zfb;
        }
      }
      this.showSelectPayPopup = false;
      this.showPreImgModalVisible = true;
    },

    // 关闭选择支付方式弹窗
    closeSelectModal() {
      this.showSelectPayPopup = false;
    },

    // 允许点击遮罩关闭Modal
    closePreimgmodalOverlay(val) {
      if (val == 'cancel') {
					this.showPreImgModalVisible = false;
				}
    },

    // 关闭展示支付图片
    closePreImgModal() {
      this.showPreImgModalVisible = false;
      this.clicksubscribe();
    },
    // 关闭 输入手机号弹窗
    closePhoneModal() {
      this.phoneModalStatus = false;
    },
    // 输入手机号弹窗 点击确定
    handleUserSavePhone(phone) {
      let phoneNum = phone.replace(/\s*/g, "");
      if (!uni.$u.test.mobile(phoneNum)) {
        console.log(phone, "手机号输入有误哦哦");
        // let params = {
        //   type: "error",
        //   icon: false,
        //   title: "失败主题",
        //   message: "一弦一柱思华年",
        //   iconUrl: "https://cdn.uviewui.com/uview/demo/toast/error.png",
        // };
        // this.showToast(params);
        this.showSelectPayPopup = true;
        this.phoneModalStatus = false;
        return;
      }
      this.savePhone(phoneNum);
    },
    // 保存手机号
    async savePhone(phone) {
      try {
        let res = await savePhoneApi({
          phone,
        });
        if (res.code === 100000) {
          this.showSelectPayPopup = true;
          this.phoneModalStatus = false;
        }
      } catch (e) {
        // error
      }
    },
    stopScroll() {
      return false;
    },
    showToast(params) {
      this.$refs.uToast.show({
        ...params,

        complete() {
          params.url &&
            uni.navigateTo({
              url: params.url,
            });
        },
      });
    },
    handleCoonfirmModal() {
				this.showContractModal = false
			},
  },
};
</script>

<style lang="scss" scoped>
.container_detail {
  width: 750rpx;
  height: 100%;
  position: relative;
  .toastTop {
    position: relative;
  }

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
    height: 100%;
    box-sizing: border-box;
    position: relative;
    padding: 50rpx 48rpx;
    z-index: 23;
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
          font-size: 48rpx;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
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
          color: #d2a96f;
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
          border: 2rpx solid #d2a96f;
          margin-top: 20rpx;
          color: #d2a96f;
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
    background: #ffffff;
    padding: 0 32rpx;
    position: fixed;
    left: 0;
    bottom: 0;
    box-shadow: 0rpx -12rpx 32px 0rpx rgba(0, 0, 0, 0.05);
    box-sizing: border-box;
    z-index: 108;

    .subscribe_view {
      width: 100%;

      .price {
        margin-right: auto;

        .money {
          font-size: 32rpx;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          color: #f72b2b;
          line-height: 44rpx;
        }

        .text {
          font-size: 24rpx;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #17204d;
          line-height: 34rpx;
        }
      }

      .subscribeBtn {
        width: 548rpx;
        height: 96rpx;
        background: linear-gradient(90deg, #efd4af 0%, #c1914b 100%);
        border-radius: 48rpx;
        font-size: 32rpx;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #7f5d2e;
        line-height: 40rpx;
      }
    }
  }

  .sisterImg::after {
    position: absolute;
    width: 750rpx;
    height: 832rpx;
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0.5) 100%
    );
    content: "";
    top: 0;
    left: 0;
  }

  /deep/ .u-swiper {
    position: relative;
    z-index: 21;
  }

  /deep/ .uni-input-placeholder {
    color: #7f5d2e;
    font-size: 28rpx;
  }
}
</style>
