# 打印 excel 合同流程图

1. 准备好资料, 由 useContractTemplate  负责输出一个 workbook
2. useContractTemplate   调用 setupContract 设置一个模板
3. setupContract 调用 content 来设置模板的
4. content 是关键
5. content 里有固定数据和动态数据, 动态数据是 test-useContractTemplate  里传的

​        固定数据直接导入进来或者在 contractContent 里定义.



```mermaid
graph BT
调用打印准备数据返回一个workbook --> test-useContractTemplate --> contractInfo(合同信息 contractInfo) & buyerBillingInfo(buyerBillingInfo 需方开票资料) & buyerContact(buyerContact 需方联系人) & contractBody(contractBody 合同明细) --> setupContract(setupContract 设置合同模板) --> useContractTemplate(useContractTemplate 也即 setupContract, 设置合同) --> convertContentToTemplate(convertContentToTemplate, content worksheet1 两个参数  ) --> content(content 调用 createContractContent 得到)


```

6. 样式文件也需要导入到 content



 

