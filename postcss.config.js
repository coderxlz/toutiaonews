module.exports = {
    plugins: {
        // autoprefixer 是一个自动添加浏览器前缀的 PostCss 插件
        // 不用重复配置
    //   autoprefixer: {
    //     browsers: ['Android >= 4.0', 'iOS >= 8'],
    //   },
      'postcss-pxtorem': {
        rootValue: 37.5,
        // 所有属性的px都进行转换
        propList: ['*'],
      },
    },
  };

  //postcss-pxtorem插件配置文件，将css中px单位都转为rem