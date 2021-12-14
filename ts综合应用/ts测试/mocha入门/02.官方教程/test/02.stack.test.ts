import {expect} from 'chai'
import { Stack } from 'src/stack/Stack'

describe('tack.ts 文件测试', () => {
    it('没有参数也可以初始化', () => {
        const s = new Stack<number>()
        expect(s.size()).to.be.equal(0)
    })
})