import request from '@/utils/request'

        /*---------
            公共
        ---------*/
/*
* 查询供应商信息列表
* */
export function querySupplierList(query) {
  return request({
    url: '/vue-element-admin/article/list',
    method: 'get',
    params: query
  })
}
        /*---------
            材料入库
          ---------*/
/*
* 查询材料入库列表
* */
export function queryMaterialEntryList(query) {
  return request({
    url: '/vue-element-admin/article/list',
    method: 'get',
    params: query
  })
}
/*
* 添加材料入库信息
* */
export function createMaterialEntryTask(id) {
  return request({
    url: '/vue-element-admin/article/detail',
    method: 'get',
    params: { id }
  })
}
/*
* 更新材料入库信息
* */
export function updateMaterialEntryTask(pv) {
  return request({
    url: '/vue-element-admin/article/pv',
    method: 'get',
    params: { pv }
  })
}
/*
* 删除材料入库信息
* */
export function deleteMaterialEntryTask(data) {
  return request({
    url: '/vue-element-admin/article/create',
    method: 'post',
    data
  })
}
/*
* 导入材料入库信息
* */
export function importMaterialEntryTask(data) {
  return request({
    url: '/vue-element-admin/article/update',
    method: 'post',
    data
  })
}
/*
* 导出材料入库信息
* */
export function exportMaterialEntryTask(data) {
  return request({
    url: '/vue-element-admin/article/update',
    method: 'post',
    data
  })
}
/*---------
    材料消耗
  ---------*/

/*---------
    材料清单
  ---------*/

/*---------
    消耗系统图
  ---------*/

/*---------
    材料领取
  ---------*/

/*---------
    生产进度
  ---------*/

/*---------
    生产订单
  ---------*/

/*---------
    产品出库
  ---------*/

/*---------
    采购代办流程
  ---------*/

/*---------
    采购流程
  ---------*/

/*------------
    材料领取流程
  ------------*/

/*---------
    库存预警
  ---------*/

/*--------------
    供应商信息维护
  --------------*/

/*--------------
    权限配置
  --------------*/

/*--------------
    操作监测
  --------------*/

/*--------------
    操作员登录检测
  --------------*/
