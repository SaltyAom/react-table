# @saltyaom/react-table
Declarative React Table under 1kb.

## Feature
- No dependencies.
- Small, at lowest at 468 bytes on production.
- Easy to understand, declarative.
- Automatic key management.
- Full control over table.
- Full TypeScript support.

## Size
Should be around 500-600 bytes, checkout [Bundlephobia](https://bundlephobia.com/package/@saltyaom/react-table) for accurate result.

But here's pre-calculated, at the lowest at 445 bytes.

| Type         | File               | Size  | gzip  |
| ------------ | ------------------ | ----- | ----- |
| es2019, cjs  | index.js           | 3,278 | 1,037 |
| es2019, esm  | esm/index.js       | 1,910 | 647   |
| es5, cjs     | es5/index.js       | 3,078 | 899   |
| es2019, cjs  | dist/cjs/index.js  | 1,603 | 741   |
| es2019, esm  | dist/esm/index.js  | 937   | 468   |

## Getting start
```bash
yarn add @saltyaom/react-table

// Or npm
npm install @saltyaom/react-table --save
```

## Example
```jsx
import Table from '@saltyaom/react-table'

const Example = () => {
    return (
        <Table
            header={['name', 'detail']}
			dataKey='name'
            data={[
                ['Fubuki', 'Waifriend'],
                ['Korone', 'Yubi yubi']   
            ]}
        />
    )
}
```

## Why
![Polka Drake](https://user-images.githubusercontent.com/35027979/128559117-6cc3adcb-daf9-4bdd-8778-0abda552d5a1.jpg)
##### Humanity Restored

Compose React table in a simple, elegant way.

Creating table in React is complicate.

Let create a simple table from the following data.

| name   | type | value |
| ------ | ---- | ----- |
| Okayu  | cat  | 1     |
| Korone | dog  | -1    |

Where the requirement is:
- First field on table head is bold.
- Value field must be color by the following:
    - if value >= 0, return green
    - otherwise, return red

Implement on normal React would be like:
```jsx
const VTuberTable = () => {
    const header = ['name', 'description', 'value']
    const data = [
        ['Okayu' , 'cat', 10],
        ['Korone', 'dog', -1]
    ]

    return (
        <table>
            <thead className="head">
                <tr>
                    {header.map((title, index) => {
                        if(index === 0) return <th className="title bold">{title}</th>

                        return (
                            <th className="title">{title}</th>
                        )
                    })}
                </tr>
            </thead>
            <tbody className="body">
                {data.map(row => 
                    <tr key={row[0]}>
                        {row.map((data, index) => {
                            if(data === 2)
                                if(data >= 0)
                                    return (
                                <td 
                                    key={`${row[0]}-${index}-${data}`} 
                                    className="green"
                                >
                                    {data}
                                </td>
                            )
                                else
                                    return (
                                <td 
                                    key={`${row[0]}-${index}-${data}`} 
                                    className="red"
                                >
                                    {data}
                                </td>
                            )

                            return (
                                <td 
                                    key={`${row[0]}-${index}-${data}`} 
                                    className="black"
                                >
                                    {data}
                                </td>
                            )
                        })}
                    </tr>
                )}
            </tbody>
        </table>
    )
}
```

The problem is:
- The code is very long.
- Semantic table require a lot of boilerplate, thead, tr, table.
- Hard to understand, imperative.
- `key` managment is complex.

## Entering @saltyaom/react-table
`@saltyaom/react-table` is a simple, declarative way to compose table in React.

All you need to do is specified your data and key, you can bring your className anywhere, even a custom condition for class.

In the other word, you have full control over the table even in a declarative way.

Let's re-implement previous table in `@saltyaom/react-table`.

```jsx
import Table from '@saltyaom/react-table'

const VTuberTable = () => {
    const header = ['name', 'description', 'value']
    const data = [
        ['Okayu' , 'cat', 10],
        ['Korone', 'dog', -1]
    ]

    return (
        <Table 
            dataKey="name"
            header={header}
            data={data}

            theadClassName="head"
            tbodyClassName="body"

            // Apply 'title' to all <th> element
            allThClassName="title"
            // Apply 'bold' to index 0 <th>
            thClassName={['bold']}

            tdClassName={[
                '',
                '',
                // On index 2, apply custom condition
                (value: number) => value >= 0 ? 'green' : 'red'
            ]}
        />
    )
}
```

That's it, we have a simple happy ending for composing table in React.

## Documentation
Table is the only export and is default export from `@saltyaom/react-table`.

The acceptable props is:
```typescript
export interface ITable<T = (string | number | JSX.Element)[] | readonly (string | number | JSX.Element)[]> {
	/**
	 * Table header to be appear in `<thead>` in order.
	 *
	 * @example
	 * ['name', 'description']
	 */
	header: T

	/**
	 * Data to be appear for each row `<td>` in order.
	 *
	 * @example
	 * [
	 *  ['Korone', 'Dog'],
	 *  ['Okayu', 'Cat']
	 * ]
	 */
	data: T[] | readonly T[]

	/**
	 * Key of data, can be either `string` which match in `header` or number as index.
	 *
	 * @example
	 * 0
	 *
	 * @example
	 * 'name'
	 */
	dataKey: string | number

	/**
	 * className of wrapper of `<table>`
	 * (element: `<section>`)
	 */
	wrapperClassName?: string
	/**
	 * className of `<table>`
	 */
	className?: string
	/**
	 * Width of each cell in order from left to right.
	 *
	 * @example
	 * [80, 160]
	 */
	cellsWidth?: number[]

	/**
	 * className of `<thead>`
	 */
	theadClassName?: string
	/**
	 * className of `<th>`
	 */
	thClassName?: string[]
	/**
	 * className to apply to all `<th>`
	 */
	allThClassName?: string

	/**
	 * className of `<tbody>`
	 */
	tbodyClassName?: string
	/**
	 * className of `<td>`
	 *
	 * Can be either `string` or `function()` which accepts `([valueof data:, index: number])`
	 *
	 * @example
	 * w-8
	 *
	 * @example
    // If nothing is returned, fallback to ''
	 * (rowData, index) => {
	 *  if(rowData.value === 0) return 'bg-blue-50'
	 *  if(rowData.index === 0) return 'bg-red-50'
	 * }
	 */
	trClassName?: string | ((data: readonly T[], index: number) => string)
	/**
	 * className of `<td>`
	 *
	 * Can be either `string[]` or `function()` which accepts `([valueof data:, index: number])`
	 *
	 * @example
	 * ['w-8', 'w-16']
	 *
	 * @example
    // If nothing is returned, fallback to ''
	 * (value, index) => {
	 *  if(value === 0) return 'text-red-500'
	 *  if(index === 0) return 'text-blue-500'
	 * }
	 */
	tdClassName?:
		| (string | ((data: any, index: number) => string))[]
		| ((data: string, index: number) => string)
	/**
	 * className to apply to all `<tbody>`
	 */
	allTdClassName?: string
}
```

For more information, you can looks directly in the source code as it's very easy to read.
