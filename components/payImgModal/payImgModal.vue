<template>
  <view class="preImgContainer">
    <u-modal
      :show="showModal"
      :title="title"
      confirmColor="#7f5d2e"
      @confirm="handleCoonfirmModal"
    >
      <view class="slot-content">
        <view class="text u-flex u-flex-center u-flex-items-center">
          {{ tips }}
        </view>
        <image
          :src="payQrcode"
          @longpress="downlaodImage(payQrcode)"
          mode="aspectFill"
        ></image>
      </view>
    </u-modal>
  </view>
</template>
<script>
export default {
  name: "common-dialog",
  props: {
    title: {
      type: String,
      default: "请扫码支付",
    },
    tips: {
      type: String,
      default: "付款后请联系客服获取最新支付状态",
    },
    payQrcode: {
      type: String,
      default: "",
    },
    confirmText: {
      type: String,
      default: "确定",
    },
    cancelText: {
      type: String,
      default: "取消",
    },
    showCancel: {
      type: Boolean,
      default: false,
    },
    showModal: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      // show: false
      payTypeList: [
        {
          icon: "weixin-circle-fill",
          typeStatus: 1,
          typeText: "微信",
        },
        {
          icon: "zhifubao-circle-fill",
          typeStatus: 2,
          typeText: "支付宝",
        },
      ],
    };
  },
  created() {},
  mounted() {},
  methods: {
    closeModal() {},
    stopScroll() {
      return false;
    },
    handlePayMode(val) {
      this.$emit("on-click-pay-mode", "cancel");
    },
    handleCoonfirmModal() {
      this.$emit("on-click-preimgmodal-close", "closePreImgModal");
    },
    downlaodImage(url) {
      uni.downloadFile({
        url,
        success: (res) => {
          // 获取到图片本地地址后再保存图片到相册(因为此方法不支持远程地址)
          uni.saveImageToPhotosAlbum({
            filePath: res.tempFilePath,
            success: () => {
              uni.showToast({
                title: "保存成功！",
              });
            },
            fail: (err) => {
              console.log(err);
            },
          });
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.preImgContainer {
  /deep/ .slot-content {
    height: 800rpx !important;

    .text {
      width: 100%;
      margin: 30rpx 0rpx;
      height: 80rpx;
      font-size: 28rpx;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #7f5d2e;
    }

    image {
      height: 600rpx;
    }

    /deep/ .u-modal__button-group {
      background: linear-gradient(90deg, #efd4af 0%, #c1914b 100%) !important;
      .u-modal__button-group__wrapper {
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, #efd4af 0%, #c1914b 100%) !important;
      }
    }
  }
}
</style>