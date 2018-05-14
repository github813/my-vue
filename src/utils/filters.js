export const code2player = function(type) {
  var map = new Map([
    {"key":"6","value":"星星加油卡"},
    {"key":"7","value":"月月加油卡"},
    {"key":"8","value":"超级宇宙无敌加油卡"},
    {"key":"9","value":"超级宇宙爆炸无敌加油卡"},
    {"key":"10","value":"超级宇宙爆炸无敌加油还送妹子卡"},
    {"key":"11","value":"超级宇宙爆炸无敌加油还送漂亮妹子卡"}
    ])
  let player = map.filter(m=>m.key==type)
  return player
}
