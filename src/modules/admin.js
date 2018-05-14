import axios from "axios"
import User from '../api/user-service';
const state = {
  menus: [],
  adminleftnavnum:'0-54'
}
const mutations={
  //同步操作、不可使用外部链接

  findMenus(state, comments) {
    state.menus = comments

  }
}
const actions={
  findMenus({ commit }){
    if(!this.menus){
      API.findMenu().then(function (ret) {
        if(ret.code==0){
          let comments= ret.data.filter(menu => {
            if (menu.pid == 1) {//匹配
              if (menu['child'] == null) {//没有初始化过子菜单
                // 组装子菜单
                menu['child'] = ret.data.filter(m => m.pid == menu.id);
              }
              return true;
            }
            return false;
          });
          commit('findMenus',comments)
        }
      })
    }
  }
}

export default {
  state,mutations,actions
}

