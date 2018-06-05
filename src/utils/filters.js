
export class Dictionary {
    // shoppingCard=JSON.parse(sessionStorage.getItem('shoppingCard'));
    industry = [
      {"key":"1","value":"星星加油卡"},
      {"key":"2","value":"月月加油卡"},
      {"key":"3","value":"超级宇宙无敌加油卡"},
      {"key":"4","value":"超级宇宙爆炸无敌加油卡"},
      {"key":"5","value":"超级宇宙爆炸无敌加油还送妹子卡"},
      {"key":"6","value":"超级宇宙爆炸无敌加油还送漂亮妹子卡"}
    ];
}

export const code2player = function(type, args) {
  let dictionary=new Dictionary();
  if(args&&dictionary[args]){
    var pipe =dictionary[args]
    let player = pipe.filter(m=>m.key==type)
    if(player.length>0){
      return player[0].value
    }else{
      return type;
    }
  }else{
    return type;
  }


}
