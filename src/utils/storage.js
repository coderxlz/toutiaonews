//用于封装所有对localStorage的操作，包括存储数据以及读取数据

//存储数据
export const saveData = (name, value) => {
  //在try catch中对数据进行存储，防止格式错误等原因存储失败
  try {
    localStorage.setItem(String(name), String(value))
  } catch (e) {
    //存储失败，返回错误对象
    return data
  }
}

//清空登录令牌
export const clean = () => {
  console.log('令牌清空')
  localStorage.removeItem('token')
  localStorage.removeItem('refresh_token')
}

// 往本地频道中添加频道
// 由于localStorage中数据是只读的，所以只能先删除，修改后再存储
export const addChannel = channel => {
  const defaultChannels = JSON.parse(localStorage.getItem('defaultChannels'))
  defaultChannels.push(channel)
  // 删除原先频道列表，再存储
  localStorage.removeItem('defaultChannels')
  localStorage.setItem('defaultChannels', JSON.stringify(defaultChannels))
}

// 删除本地频道中的频道
export const removeChannel = channel => {
  const defaultChannels = JSON.parse(localStorage.getItem('defaultChannels'))
  const index = defaultChannels.findIndex(val => {
    return val.id === channel.id
  })
  defaultChannels.splice(index,1)
  // 删除原先频道列表，再存储
  localStorage.removeItem('defaultChannels')
  localStorage.setItem('defaultChannels', JSON.stringify(defaultChannels))
}