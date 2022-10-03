const http = uni.$u.http
// 首页sister列表
export const getSisterList = (params, config = {
	custom: {
		auth: true
	}
}) => {
	return http.post('/api/yy/sister/home', params, config)
}


// 获取详情
export const getSisterDetail = (params, config = {
	custom: {
		auth: true
	}
}) => http.post('/api/yy/sister/detail', params, config)


// 获取喜欢列表
export const getCollectSisterList = (params, config = {
	custom: {
		auth: true
	}
}) => http.post('/api/yy/collect-sister/list', params, config)
//获取更多联系方式
export const getMoreSisterContact = (params, config = {
	custom: {
		auth: true
	}
}) => http.post('/api/yy/sister/more-contranct', params, config)


//预约发起支付订单
export const amOrder = (params, config = {
	custom: {
		auth: true
	}
}) => http.post('/api/yy/am-order/init', params, config)



//喜欢Sister
export const likeSisterApi = (params, config = {
	custom: {
		auth: true
	}
}) => http.post('/api/yy/collect-sister/create', params, config)


//取消喜欢Sister
export const cancelLikeSisterApi = (params, config = {
	custom: {
		auth: true
	}
}) => http.post('/api/yy/collect-sister/delete', params, config)


//消费记录
export const getExpensesRecord = (params, config = {
	custom: {
		auth: true
	}
}) => http.post('/api/yy/expenses-record/get', params, config)

//成为会员发起支付订单
export const becomeMemberOrder = (params, config = {
	custom: {
		auth: true
	}
}) => http.post('/api/yy/member-order/init', params, config)


// 获取支付码
export const getPayQrcode = (params, config = {
	custom: {
		auth: true
	}
}) => http.post('/api/yy/pay-qrcode/get', params, config)


// 用户预约前添加联系方式
export const savePhoneApi = (params, config = {
	custom: {
		auth: true
	}
}) => http.post('/api/yy/user-contract/create', params, config)


// 获取用户最新的信息（会员状态）
export const getUserStatusApi = (params, config = {
	custom: {
		auth: true
	}
}) => http.post('/api/yy/user/get', params, config)
