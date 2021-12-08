


import(/* webpackChunkName: "momentjs" */ 'moment')
    .then((moment) => {
        // 懒加载的模块拥有所有的类型，并且能够按期工作
        // 类型检查会工作，代码引用也会工作  :100:
        const time = moment().format('MMMM Do YYYY, h:mm:ss a')
        console.log('TypeScript >= 2.4.0 Dynamic Import Expression:') 
        console.log(time);
    })
    .catch(err => {
        console.log('Failed to load moment', err);
    });
    
    
