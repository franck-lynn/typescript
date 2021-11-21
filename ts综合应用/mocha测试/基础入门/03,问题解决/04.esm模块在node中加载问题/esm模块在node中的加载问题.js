// https://www.npmjs.com/package/node-fetch#loading-and-configuring-the-module

// node-fetch 是 esm 模块, 如何才能在 node 中加载呢?
// 官方文档提到一个方法

import fetch from 'node-fetch' 

const response = await fetch('https://httpbin.org/stream/3');

try {
	for await (const chunk of response.body) {
		console.dir(JSON.parse(chunk.toString()));
	}
} catch (err) {
	console.error(err);
}
