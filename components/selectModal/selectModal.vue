<template>
  <view class="selectPayContainer">
    <u-popup
      :show="showBottomPopup"
      mode="bottom"
      :round="10"
      @close="closePopup"
    >
      <view class="popup_container">
        <view class="title_view u-flex u-flex-center u-flex-items-center">
          请选择
          <view class="close_popup" @click.stop="closePopup">
            <image src="/static/icon/close_icon.png" mode="aspectFill"></image>
          </view>
        </view>
        <view
          class="pay_view u-flex u-flex-items-center"
          v-for="(item, index) in payTypeList"
          :key="index"
          @click="handlePayMode(item)"
        >
          <!-- 2 -->
          <view class="icon_pay u-flex u-flex-center u-flex-items-center">
            <u-icon :name="item.icon" size="28"></u-icon>
          </view>
          <view class="pay_type u-flex u-flex-items-center">
            {{ item.typeText }}支付
          </view>
          <view class="rightIcon">
            <image src="/static/icon/mine_jump.png" mode="aspectFill"></image>
          </view>
        </view>
      </view>
    </u-popup>
  </view>
</template>
<script>
export default {
  name: "common-dialog",
  props: {
    title: {
      type: String,
      default: "",
    },
    content: {
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
    showBottomPopup: {
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
    closePopup() {
      this.$emit("on-click-modal-close", "close");
    },
    confirm() {
      this.$emit("on-click-dialog", "confirm");
    },
    cancel() {
      this.$emit("on-click-dialog", "cancel");
    },
    stopScroll() {
      return false;
    },
    handlePayMode(val) {
      this.$emit("on-click-pay-mode", val);
    },
  },
};
</script>

<style lang="scss" scoped>
.selectPayContainer {
  /deep/ .u-popup {
    // background: rgb(245, 245, 245) !important;
    .popup_container {
      width: 100%;
      padding: 0 32rpx !important;
      // border: 1px solid green;
      box-sizing: border-box;
      background: #f5f5f5;
      border-radius: 20rpx !important;

      .title_view {
        width: 100%;
        font-size: 28rpx;
        height: 60rpx;
        font-weight: 500;
        // border: 1px solid orange;
        margin-top: 24rpx;
        position: relative;

        .close_popup {
          position: absolute;
          left: -8rpx;
          top: 14rpx;
          width: 30rpx;
          height: 31rpx;

          image {
            width: 100%;
            height: 100%;
          }
        }
      }

      .pay_view {
        width: 100%;
        height: 140rpx;
        // border: 1px solid hotpink;
        margin: 24rpx 0;
        border-radius: 30rpx;
        background: #fff;

        .icon_pay {
          width: 120rpx;
          height: 120rpx;
          // border:1px solid skyblue;
        }

        .pay_type {
          width: 300rpx;
          // border: 1px solid gold;
        }

        .rightIcon {
          margin-left: auto;
          margin-right: 32rpx;

          image {
            width: 28rpx;
            height: 28rpx;
          }
        }
      }
    }
  }
}
</style>