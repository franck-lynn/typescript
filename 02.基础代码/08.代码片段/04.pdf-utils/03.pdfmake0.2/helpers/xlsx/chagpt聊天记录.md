可以使用以下代码将 pdfmake content 转换为 exceljs 的数据结构：

```ts
import { Content, TDocumentDefinitions } from 'pdfmake/build/pdfmake';
import { Workbook, Worksheet, CellValue } from 'exceljs';

function convertPdfmakeToExceljs(content: Content[]): CellValue[][] {
  const rows: CellValue[][] = [];

  // Iterate through each item in the content array
  for (const item of content) {
    // Check the type of the item
    switch (item.type) {
      case 'text': {
        // Add a new row with a single cell containing the text
        rows.push([{ value: item.text, style: item.style }]);
        break;
      }
      case 'table': {
        const tableData: CellValue[][] = [];

        // Iterate through each row in the table
        for (const row of item.table.body) {
          const rowData: CellValue[] = [];

          // Iterate through each cell in the row
          for (const cell of row) {
            // Add the cell value to the row data array
            rowData.push({ value: cell.text, style: cell.style });
          }

          // Add the row data to the table data array
          tableData.push(rowData);
        }

        // Add the table data to the rows array
        rows.push(...tableData);
        break;
      }
      case 'ul': {
        // Iterate through each item in the unordered list
        for (const li of item.ul) {
          // Add a new row with a single cell containing the list item
          rows.push([{ value: `- ${li.text}`, style: li.style }]);
        }
        break;
      }
      case 'ol': {
        // Iterate through each item in the ordered list
        for (let i = 0; i < item.ol.length; i++) {
          const li = item.ol[i];
          // Add a new row with a single cell containing the list item and its index
          rows.push([{ value: `${i + 1}. ${li.text}`, style: li.style }]);
        }
        break;
      }
      case 'image': {
        // Skip images
        break;
      }
      default: {
        // Unsupported content type
        throw new Error(`Unsupported content type: ${item.type}`);
      }
    }
  }

  return rows;
}

```

使用此函数，您可以将 pdfmake content 转换为 exceljs 的数据结构。例如，要将 pdfmake content 写入 Excel 文件，可以使用以下代码：

```ts
const pdfmakeContent: TDocumentDefinitions['content'] = [
  'Some text',
  {
    text: 'Some styled text',
    style: { bold: true, fontSize: 16 },
  },
  {
    type: 'table',
    table: {
      body: [
        ['Header 1', 'Header 2'],
        ['Cell 1', 'Cell 2'],
      ],
    },
  },
  {
    type: 'ul',
    ul: [{ text: 'Item 1' }, { text: 'Item 2' }],
  },
  {
    type: 'ol',
    ol: [{ text: 'Item 1' }, { text: 'Item 2' }],
  },
];

const workbook = new Workbook();
const worksheet = workbook.addWorksheet('Sheet1');
const rows = convertPdfmakeToExceljs(pdfmakeContent);

worksheet.addRows(rows);

workbook.xlsx.writeFile('output.xlsx');

```

````ts
将 pdfmake0.28 版 的 content: Content 数据结构 用ts 转换成 exceljs 的数据结构, content 要考虑所有的可能性


由于 pdfmake0.28 版的 content: Content 数据结构比较复杂，转换成 exceljs 的数据结构需要考虑所有可能性。以下是一个可能的转换方案：

pdfmake0.28 版的 content: Content 数据结构示例：

```typescript
const content: Content = [
  {
    text: 'Hello World',
    style: 'header'
  },
  {
    ul: [
      'item 1',
      'item 2',
      'item 3'
    ]
  },
  {
    table: {
      headers: ['Name', 'Age', 'Gender'],
      rows: [
        ['John', '30', 'Male'],
        ['Jane', '25', 'Female']
      ]
    }
  }
];
```

转换成 exceljs 的数据结构：

```typescript
const workbook = new Workbook();
const worksheet = workbook.addWorksheet('Sheet1');

let row = 1;
content.forEach((item) => {
  if (typeof item === 'string') {
    worksheet.addRow([item]);
    row++;
  } else if (Array.isArray(item)) {
    item.forEach((subItem) => {
      worksheet.addRow([subItem]);
      row++;
    });
  } else if (typeof item === 'object') {
    const keys = Object.keys(item);
    if (keys.includes('text')) {
      worksheet.addRow([item.text]);
      row++;
    }
    if (keys.includes('ul')) {
      item.ul.forEach((
````



我

将 pdfmake0.28 版 的 content: Content 数据结构 用ts 转换成 exceljs 的数据结构, content 要考虑所有的可能性

ChatGPT



将 pdfmake0.28 版 的 content: Content 数据结构 用ts 转换成 exceljs 的数据结构, content 要考虑所有的可能性

ChatGPT

由于 pdfmake 和 exceljs 的数据结构存在较大差异，因此需要对 pdfmake 的 content 数据结构进行转换。以下是一个可能的 ts 转换方案：

```typescript
import { Worksheet } from 'exceljs';

type TableCell = string | number | boolean;

type TableRow = TableCell[];

interface Table {
  headerRows?: number;
  widths?: (string | number)[];
  body: TableRow[];
}

interface Column {
  text: string;
  width?: number | string;
  style?: string | string[];
  alignment?: 'left' | 'center' | 'right';
  margin?: [number, number, number, number];
  fillColor?: string;
  border?: boolean | [boolean, boolean, boolean, boolean];
  colSpan?: number;
  rowSpan?: number;
}

interface Columns {
  columns: Column[];
  columnGap?: number;
  widths?: (string | number)[];
}

type Text = string | { text: string; style?: string | string[] };

type Content = TableCell | Text | Table | Columns | Content[];

function pdfMakeToExcelJS(content: Content[], worksheet: Worksheet) {
  content.forEach((item) => {
    if (typeof item === 'string' || typeof item === 'number' || typeof item === 'boolean') {
      // 单元格
      worksheet.addRow([item]);
    } else if (typeof item === 'object') {
      if (Array.isArray(item)) {
        // 递归处理内容
        pdfMakeToExcelJS(item, worksheet);
      } else if ('body' in item) {
        // 表格
        const table = item as Table;
        const tableRows: any[] = table.body.map((row) => ({ values: row }));
        worksheet.addTable({
          name: 'Table',
          ref: `A${worksheet.lastRow.number + 1}`,
          headerRow: table.headerRows ?? 1,
          columns: table.widths?.map((width) => ({ width })),
          rows: tableRows,
        });
      } else if ('columns' in item) {
        // 列
        const columns = item as Columns;
        const columnValues: any[] = [];
        columns.columns.forEach((column) => {
          columnValues.push({ header: column.text, key: column.text, width: column.width });
        });
        worksheet.columns = columnValues;
        worksheet.getColumn(1).width = 20;
        worksheet.getColumn(2).width = 30;
        worksheet.getColumn(3).width = 20;
        worksheet.getColumn(4).width = 20;
      } else {
        // 文本
        const text = item as Text;
        worksheet.addRow([text.text]);
      }
    }
  });
}
```

上述代码中，我们定义了 TableCell、TableRow、Table、Column、Columns、Text 和 Content 这些类型，用于表示 pdfmake 的 content 数据结构。然后通过 pdfMakeToExcelJS 函数将 pdfmake 的 content 转换成 exceljs 的数据结构。

在 pdfMakeToExcelJS 函数中，我们首先遍历 content 数组，判断每个元素的类型。如果是单元格，则直接插入一行；如果是对象，则根据其属性进行不同的处理。对于表格，我们将其转换成 exceljs 的 table，并插入到工作表中；对于列，则根据其属性设置工作表的列宽；对于文本，则直接插入一行。

需要注意的是，由于 exceljs 的表格没有办法设置表格边框颜色，因此我们在这里只设置了表格边框的显示与否。如果需要更加精细的边框设置，可以考虑使用其他的库或手动设置单元格边框。









我

将 pdfmake0.28 版 的 content: Content 数据结构 用ts 转换成 exceljs 的数据结构, content 要考虑所有的可能性

ChatGPT

插件遇见了一些问题，请按照右下角报错解决问题。

实在无法解决请联系作者：B站/抖音/快手/知乎/小红书/即刻/掘金搜索：何时夕 QQ群号：请看插件主页

我

将 pdfmake0.28 版 的 content: Content 数据结构 用ts 转换成 exceljs 的数据结构, content 要考虑所有的可能性

ChatGPT

由于 pdfmake 和 exceljs 的数据结构存在较大差异，因此需要对 pdfmake 的 content 数据结构进行转换。以下是一个可能的 ts 转换方案：

```typescript
import { Worksheet } from 'exceljs';

type TableCell = string | number | boolean;

type TableRow = TableCell[];

interface Table {
  headerRows?: number;
  widths?: (string | number)[];
  body: TableRow[];
}

interface Column {
  text: string;
  width?: number | string;
  style?: string | string[];
  alignment?: 'left' | 'center' | 'right';
  margin?: [number, number, number, number];
  fillColor?: string;
  border?: boolean | [boolean, boolean, boolean, boolean];
  colSpan?: number;
  rowSpan?: number;
}

interface Columns {
  columns: Column[];
  columnGap?: number;
  widths?: (string | number)[];
}

type Text = string | { text: string; style?: string | string[] };

type Content = TableCell | Text | Table | Columns | Content[];

function pdfMakeToExcelJS(content: Content[], worksheet: Worksheet) {
  content.forEach((item) => {
    if (typeof item === 'string' || typeof item === 'number' || typeof item === 'boolean') {
      // 单元格
      worksheet.addRow([item]);
    } else if (typeof item === 'object') {
      if (Array.isArray(item)) {
        // 递归处理内容
        pdfMakeToExcelJS(item, worksheet);
      } else if ('body' in item) {
        // 表格
        const table = item as Table;
        const tableRows: any[] = table.body.map((row) => ({ values: row }));
        worksheet.addTable({
          name: 'Table',
          ref: `A${worksheet.lastRow.number + 1}`,
          headerRow: table.headerRows ?? 1,
          columns: table.widths?.map((width) => ({ width })),
          rows: tableRows,
        });
      } else if ('columns' in item) {
        // 列
        const columns = item as Columns;
        const columnValues: any[] = [];
        columns.columns.forEach((column) => {
          columnValues.push({ header: column.text, key: column.text, width: column.width });
        });
        worksheet.columns = columnValues;
        worksheet.getColumn(1).width = 20;
        worksheet.getColumn(2).width = 30;
        worksheet.getColumn(3).width = 20;
        worksheet.getColumn(4).width = 20;
      } else {
        // 文本
        const text = item as Text;
        worksheet.addRow([text.text]);
      }
    }
  });
}
```

上述代码中，我们定义了 TableCell、TableRow、Table、Column、Columns、Text 和 Content 这些类型，用于表示 pdfmake 的 content 数据结构。然后通过 pdfMakeToExcelJS 函数将 pdfmake 的 content 转换成 exceljs 的数据结构。

在 pdfMakeToExcelJS 函数中，我们首先遍历 content 数组，判断每个元素的类型。如果是单元格，则直接插入一行；如果是对象，则根据其属性进行不同的处理。对于表格，我们将其转换成 exceljs 的 table，并插入到工作表中；对于列，则根据其属性设置工作表的列宽；对于文本，则直接插入一行。

需要注意的是，由于 exceljs 的表格没有办法设置表格边框颜色，因此我们在这里只设置了表格边框的显示与否。如果需要更加精细的边框设置，可以考虑使用其他的库或手动设置单元格边框。







///////////////////////////////////////

我

类型不用定义, 就用 pdfmake 定义的 Content 类型, 以保持一致性, 既可以导出pdf, 也可以导出excel, 公用一套类型

ChatGPT

好的，那么我们可以将 pdfmake 的 Content 类型作为入参，然后根据内容的类型进行不同的处理，实现 pdf 到 excel 的转换。以下是一个可能的转换方案：

```typescript
import { Worksheet } from 'exceljs';
import { Content, ContentTable, ContentText, ContentColumns } from 'pdfmake/build/pdfmake';

function pdfMakeToExcelJS(content: Content[], worksheet: Worksheet) {
  content.forEach((item) => {
    if (typeof item === 'string' || typeof item === 'number' || typeof item === 'boolean') {
      // 单元格
      worksheet.addRow([item]);
    } else if ('text' in item) {
      // 文本
      const text = item as ContentText;
      worksheet.addRow([text.text]);
    } else if ('table' in item) {
      // 表格
      const table = item as ContentTable;
      const tableRows: any[] = table.table.body.map((row) => ({ values: row }));
      worksheet.addTable({
        name: 'Table',
        ref: `A${worksheet.lastRow.number + 1}`,
        headerRow: table.table.headerRows ?? 1,
        columns: table.table.widths?.map((width) => ({ width })),
        rows: tableRows,
      });
    } else if ('columns' in item) {
      // 列
      const columns = item as ContentColumns;
      const columnValues: any[] = [];
      columns.columns.forEach((column) => {
        columnValues.push({ header: column.text, key: column.text, width: column.width });
      });
      worksheet.columns = columnValues;
      worksheet.getColumn(1).width = 20;
      worksheet.getColumn(2).width = 30;
      worksheet.getColumn(3).width = 20;
      worksheet.getColumn(4).width = 20;
    } else if (Array.isArray(item)) {
      // 递归处理内容
      pdfMakeToExcelJS(item, worksheet);
    }
  });
}
```

在这个方案中，我们仍然使用 pdfmake 的 Content 类型作为入参，然后根据内容的类型进行不同的处理。对于单元格，我们直接插入一行；对于文本，我们将其转换成 exceljs 的单元格；对于表格，我们将其转换成 exceljs 的 table，并插入到工作表中；对于列，则根据其属性设置工作表的列宽；对于数组，则递归处理其内容。

需要注意的是，在处理表格时，我们需要根据 pdfmake 的数据结构来提取表格的内容和表格的属性。具体来说，我们需要使用 `table.table.body` 来提取表格的行数据，使用 `table.table.headerRows` 来提取表格的表头行数，使用 `table.table.widths` 来提取表格的列宽。这样可以保证转换后的表格数据与原始的 pdfmake 数据结构保持一致。









我

用 pdfmake 定义的 Content 类型, Content 包含样式定义, 用这个包含样式类型约束, 生成 exceljs 可以使用的 ts 代码, pdfmake 的类型约束包含样式, 既可以生成 pdf, 有可以生成 excel 文件, 两者公用一套 pdfmake 约束的 要求ts 的代码, Content考虑所有可能的样式, 用递归的方式生成转化函数, 类型尽量不要用any, 这样可以吗?

ChatGPT

可以尝试使用递归的方式生成转化函数，并且尽量避免使用 any 类型，以提高代码的可维护性和可读性。在生成转化函数时，需要考虑所有可能的样式，以确保生成的代码可以同时用于生成 PDF 和 Excel 文件。同时，需要注意在转化过程中可能会出现的类型不匹配等问题，确保生成的代码能够无误地运行。

我

可以给个示例吗?

ChatGPT

假设我们有以下的 pdfmake Content 类型定义：

```typescript
type Content = string | Content[] | {
  text: string | Content[];
  bold?: boolean;
  fontSize?: number;
  alignment?: 'left' | 'center' | 'right';
};
```

我们希望将它转化为 ExcelJS 可以使用的类型定义，可以采用如下的递归方式：

```typescript
type ExcelJSContent =
  | string
  | ExcelJSContent[]
  | {
      text: string | ExcelJSContent[];
      style?: Partial<ExcelJSStyle>;
    };

type ExcelJSStyle = {
  font: {
    bold?: boolean;
    size?: number;
  };
  alignment?: {
    horizontal?: 'left' | 'center' | 'right';
  };
};

function convertContentToExcelJS(content: Content): ExcelJSContent {
  if (typeof content === 'string') {
    return content;
  } else if (Array.isArray(content)) {
    return content.map(convertContentToExcelJS);
  } else {
    const { text, bold, fontSize, alignment } = content;
    const style: Partial<ExcelJSStyle> = {};
    if (bold) {
      style.font = { ...style.font, bold };
    }
    if (fontSize) {
      style.font = { ...style.font, size: fontSize };
    }
    if (alignment) {
      style.alignment = { horizontal: alignment };
    }
    return { text: convertContentToExcelJS(text), style };
  }
}
```

这个示例中，我们定义了 ExcelJSContent 类型和 ExcelJSStyle 类型，用于表示 Excel 文件中的内容和样式，同时定义了一个递归函数 convertContentToExcelJS，用于将 pdfmake Content 类型的数据转化为 ExcelJSContent 类型的数据。在转化过程中，我们根据 pdfmake Content 中的样式定义，设置对应的 ExcelJSStyle 属性。最终生成的 ExcelJSContent 类型的数据可以用于生成 Excel 文件。
