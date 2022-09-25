const http = uni.$u.http
// 首页sister列表
export const getSisterList = (params, config = {
	custom: {
		auth: true
	}
}) => http.post('/api/yy/sister/home', params, config)


// 获取详情
export const geSisterDetail = (params, config = {
	custom: {
		auth: true
	}
}) => http.post('/api/yy/sister/detail', params, config)