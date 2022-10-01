<template>
  <view class="pay_container" v-if="showOrderFlag">
    <!-- <u-sticky> -->
    <u-tabs
      lineColor="#EDDBC3"
      :current="topBarIndex"
      lineWidth="80rpx"
      :scrollable="false"
      :list="topBarList"
      itemStyle="width:250rpx; height: 88rpx; padding:0rpx;"
      activeStyle="font-size: 28rpx;font-weight: 500;color: #000000;"
      @click="click"
    >
    </u-tabs>
    <!-- </u-sticky> -->
    <view class="recordList">
       <view class="orderRecord u-flex u-flex-column u-flex-items-center" v-if="orderFilterList.length>0">
          <view
            class="orderinfo u-flex u-flex-center u-flex-items-center"
            v-for="(item, index) in orderFilterList"
            :key="index"
            @click="lookSisterDetail(item)"
          >
            <view class="name">
              <view class="title">
                {{ item.remark }}
              </view>
              <view class="date">
                {{ item.create_at | formatGetTime }}
              </view>
            </view>

            <view class="money">
              {{ item.order_amount }}
            </view>
            <view
              class="status"
              :class="{
                errorBgColor: item.is_paid === 3,
                successBgColor: item.is_paid === 1,
                orangeBgColor: item.is_paid === 2,
              }"
            >
              {{ item.is_paid | formatPayType }}
            </view>
          </view>
        </view>
        <view class="empty" v-else>
			<u-empty mode="order" :text="emptyText" icon="http://cdn.uviewui.com/uview/empty/order.png">
			</u-empty>
		</view>
    </view>
    <!-- <swiper
      :current="topBarIndex"
      @change="swiperChange"
      v-if="orderFilterList.length > 0"
    >
      <swiper-item v-for="(item, index) in topBarList" :key="index">
        <view class="orderRecord u-flex u-flex-column u-flex-items-center">
          <view
            class="orderinfo u-flex u-flex-center u-flex-items-center"
            v-for="(item, index) in orderFilterList"
            :key="index"
            @click="lookSisterDetail(item)"
          >
            <view class="name">
              <view class="title">
                {{ item.remark }}
              </view>
              <view class="date">
                {{ item.create_at | formatGetTime }}
              </view>
            </view>

            <view class="money">
              {{ item.order_amount }}
            </view>
            <view
              class="status"
              :class="{
                errorBgColor: item.is_paid === 3,
                successBgColor: item.is_paid === 1,
                orangeBgColor: item.is_paid === 2,
              }"
            >
              {{ item.is_paid | formatPayType }}
            </view>
          </view>
        </view>
      </swiper-item>
    </swiper> -->
   
  </view>
</template>

<script>
import { getExpensesRecord } from "@/config/api/sister.js";
export default {
  data() {
    return {
      emptyText: "暂无订单",
      orderList: [],
      showOrderFlag: false,
      topBarList: [
        {
          name: "全部",
        },
        {
          name: "待支付",
        },
        {
          name: "支付成功",
        },
        {
          name: "支付失败",
        },
      ],
      emptyText: "暂无消费记录",
      topBarIndex: 0,
    };
  },
  created() {
    this.getInitList();
  },
  onLoad() {
    this.loadmore();
  },
  filters: {
    formatPayType(value) {
      if (value === 1) {
        return "已支付";
      }
      if (value === 2) {
        return "未支付";
      }
      return "失败";
    },
    formatTagColorType(value) {
      if (value == 1) {
        return "success";
      }
      if (value == 2) {
        return "warning";
      }
      return "error";
    },
    formatGetTime(val) {
      let timestamp = new Date(val).getTime();
      return uni.$u.timeFormat(timestamp, "yyyy-mm-dd hh:MM:ss");
    },
  },
  methods: {
    click(item) {
      this.topBarIndex = item.index;
    },
    getInitList() {
      getExpensesRecord({})
        .then((res) => {
          if (res.code === 100000) {
            if (res?.data?.length > 0) {
              this.orderList = res?.data;
            }
          }
        })
        .catch((err) => {
          console.log(err, "err");
        })
        .finally(() => {
          this.showOrderFlag = true;
        });
    },
    scrolltolower() {
      this.loadmore();
    },
    loadmore() {
      // 滚动分页
    },
    swiperChange(val) {
      this.topBarIndex = val.target.current;
    },
    lookSisterDetail(val) {
      if (val.is_paid === 1) return;
      // 1-小妹预约订单 2-普通会员订单 3-高级会员订单
      let url = "";
      if (val.order_type === 1) {
        url = `/pages/dataDetail/dataDetail?id=${
          val.id
        }&s=${new Date().getTime()}`;
      }
      if (val.order_type === 2 && val.is_paid !== 1) {
        url = `/pages/mine/equity/equity?id=0&timer=${new Date().getTime()}`;
      }
      if (val.order_type === 3 && val.is_paid !== 1) {
        url = `/pages/mine/equity/equity?id=1&timer=${new Date().getTime()}`;
      }
      uni.navigateTo({
        url: url,
      });
    },
  },
  computed: {
    addClassName() {
      if (this.emptyStatus) {
        return "u-flex u-flex-column u-flex-center u-flex-items-center";
      }
      return "";
    },
    emptyStatus() {
      if (this.orderList?.length !== 0) return false;
      return true;
    },
    orderFilterList() {
      let arr = [];
      if (this.topBarIndex === 0) {
        arr = this.orderList;
      }
      if (this.topBarIndex === 1) {
        arr = this.orderList.filter((item) => item.is_paid === 2);
      }
      if (this.topBarIndex === 2) {
        arr = this.orderList.filter((item) => item.is_paid === 1);
      }
      if (this.topBarIndex === 3) {
        arr = this.orderList.filter((item) => item.is_paid === 3);
      }
      return arr;
    },
  },
};
</script>

<style lang="scss" scoped>
.pay_container {
  width: 100%;
  min-height: 100vh;
  background: #f6f6f6;

  /deep/ .u-tabs__wrapper {
    width: 750rpx;
    height: 100%;
    background: #ffffff;
    font-size: 28rpx;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #9c9b98;
    line-height: 40rpx;
  }

  /deep/ .uni-swiper-wrapper {
    height: 1800rpx !important;
  }
  .recordList {
      min-height: calc(100vh -88rpx);
      .empty {
        margin: 90rpx 0;
      }
  }

  .orderRecord {
    width: 100%;
    height: 100%;
    margin-top: 12rpx;

    .orderinfo {
      width: 100%;
      height: 146rpx;
      background: #ffffff;
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
          color: #9c9b98;
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
        color: #f48a0e;
      }

      .successBgColor {
        color: #6fd028;
      }

      .errorBgColor {
        color: #f16b6f;
      }

      .money {
        margin-left: 142rpx;
        font-size: 28rpx;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #d2a96f;
        line-height: 40rpx;

        .smallText {
          font-size: 20rpx;
          font-weight: 600;
          color: #b5804f;
          line-height: 28rpx;
        }
      }
      &:last-child {
        margin-bottom: 50rpx;
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
