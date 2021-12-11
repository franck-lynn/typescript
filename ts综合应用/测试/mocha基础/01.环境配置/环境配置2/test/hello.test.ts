import hello from '../src/hello'
import {expect} from 'chai'

describe('hello 函数', () => {
    it('should return "hello world!"', () => {
        const result = hello()
        expect(result).to.be.equal("hello world!")
    })
})

