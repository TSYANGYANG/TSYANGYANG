/**
 * 一、浅拷贝基本概念
 * 浅拷贝出现的前提：对引用类型的数据复制，并进行修改(对象、数组)
 * 对这类数据修改，其本质上修改的并不是被赋值对象本身的值，而修改的是赋值对象的值
 * 
 * 如下，答应结果是
 * objectShallowCopy_1 { child: 1 }
 * objectShallowCopy_2 { child: 1 }
 * 
 * 这里可以就说到关于计算机数据堆栈的概念了
 * objectShallowCopy_1是赋值对象, objectShallowCopy_2是被赋值对象, 当把objectShallowCopy_1赋值给
   到objectShallowCopy_2时，其实我们赋的并不是值，而是objectShallowCopy_1中键值所处堆栈的访问地址，因
   此我们修改objectShallowCopy_2时，其实前后都在对同一个堆栈进行操作，这就是浅拷贝(shallow copy)
* 
*/

const objectShallowCopy_1 = { child1: 0, child2: ['a','b','c'] }
const objectShallowCopy_2 = objectShallowCopy_1

objectShallowCopy_2.child1 = 1

console.log('objectShallowCopy_1', objectShallowCopy_1)
console.log('objectShallowCopy_2', objectShallowCopy_2)

/**
 * 二、对象浅拷贝的解决方案
 * 
 * 1、JSON.parse(JSON.stringify( xx ))
 *  缺点: 当数据类型为function或者数据类型为undefined的情况下无法复制
 * 2、通过Object.assgin() 
 *  缺点: 只能对一级的键值进行深拷贝，倘若到了某一子集，依然会被浅拷贝
 *  (如: obj={ a: 0, b:[2,4,6,8] }, obj.b是个引用类型被浅拷贝)
 * 3、扩展运算符
 *  缺点：只能对一级的键值进行深拷贝、到了某一子集依然是被浅拷贝的
 * 4、递归
 *  暂无缺点
 */

/**
 * 三、数组浅拷贝解决方案
 * 
 *  同上，皆为引用类型的数据
 * 
 */


// 我们这里简单实现一下 ‘递归’

const CloneDeep = (data) => {
    let deepData = Array.isArray(data) ? [] : {};
    Object.keys(data).forEach(key => {
        if(data[key] && typeof data[key] === 'object'){
            deepData[key] = CloneDeep(data[key])
        }else{
            deepData[key] = data[key]
        }
    })
    return deepData
}

const objectCloneCopy = CloneDeep(objectShallowCopy_1)

objectCloneCopy.child1 = 100

objectCloneCopy.child2[0] = 'A'

console.log('objectShallowCopy_1', objectShallowCopy_1)
console.log('objectCloneCopy', objectCloneCopy)

