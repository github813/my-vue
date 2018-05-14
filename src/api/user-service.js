import * as API from './'
export default {
  //
  findMenu: params => {
    return API.GET('/admin/findMenu', params)
  }
}
