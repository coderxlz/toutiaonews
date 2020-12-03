//用于封装所有对localStorage的操作，包括存储数据以及读取数据

//存储数据
export const saveData = (name,value) => {
  //在try catch中对数据进行存储，防止格式错误等原因存储失败
  try {
    localStorage.setItem(String(name),String(value))
  } catch(e) {
    //存储失败，返回错误对象
    return data
  }
}

//读取数据
export const readData = (name) => {
  return localStorage.getItem(String(name))
}

//清空localStorage
export const clearToken = () => {
  console.log('令牌清空')
  localStorage.clear()
}