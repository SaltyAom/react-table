# @saltyaom/react-table
Declarative React Table under 1kb.

![Polka Drake](https://user-images.githubusercontent.com/35027979/128559117-6cc3adcb-daf9-4bdd-8778-0abda552d5a1.jpg)
##### Humanity Restored

## Feature
- No dependencies.
- Light, 700 bytes on production.
- Easy to understand, declarative.
- Automatic key management.
- Full control over table.
- Full TypeScript support.

## Size
Should be around 700 bytes, checkout [Bundlephobia](https://bundlephobia.com/package/@saltyaom/react-table) for accurate result.

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
export interface ITable<
	T =
		| (string | number | JSX.Element)[]
		| readonly (string | number | JSX.Element)[]
> {
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
	dataKey?: string | number

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

	/**
	 * Prepend element before table
	 *
	 * @example
	 * <nav>
	 * 	 <input
	 * 	   name="search"
	 * 	   type="text"
	 *     placeholder="Search"
	 *     onChange={handleSearch}
	 *   />
	 * </nav>
	 */
	beforeTable?: JSX.Element
	/**
	 * Append element after table
	 *
	 * @example
	 * <section className="pagination">
	 * 	<button className="prev" onClick={previous}>Previous</button>
	 * 	<button className="next" onClick={next}>Next</button>
	 * </section>
	 */
	afterTable?: JSX.Element

	/**
	 * Add custom props to `<table>` element
	 *
	 * @example
	 * {
	 *   style={
	 *     borderCollapse: 'collapse'
	 *   }
	 * }
	 */
	tableProps?: Omit<
		DetailedHTMLProps<
			TableHTMLAttributes<HTMLTableElement>,
			HTMLTableElement
		>,
		'className'
	>

	/**
	 * Add custom props to `<thead>` element
	 *
	 * @example
	 * {
	 *   onClick: () => console.log("Clicked")
	 * }
	 */
	theadProps?: Omit<
		DetailedHTMLProps<
			HTMLAttributes<HTMLTableSectionElement>,
			HTMLTableSectionElement
		>,
		'className'
	>
	/**
	 * Add custom props to `<th>` element
	 *
	 * @example
	 * (data, index) => {
	 *   if(isOdd(index)) return ({ className: '--odd' })
	 * }
	 */
	thProps?: (
		data: T[keyof T],
		index: number
	) => Omit<
		DetailedHTMLProps<
			ThHTMLAttributes<HTMLTableHeaderCellElement>,
			HTMLTableHeaderCellElement
		>,
		'className'
	> | void
	/**
	 * Add custom props to `<tbody>` element
	 *
	 * @example
	 * {
	 *   onClick: (data, index) => console.log("Clicked")
	 * }
	 */
	tbodyProps?: Omit<
		DetailedHTMLProps<
			HTMLAttributes<HTMLTableSectionElement>,
			HTMLTableSectionElement
		>,
		'className'
	>
	/**
	 * Add custom props to `<tr>` element
	 *
	 * @example
	 * (data, index) => {
	 *   if(isOdd(index)) return ({ className: '--odd' })
	 * }
	 */
	trProps?: (
		row: T,
		index: number
	) => Omit<
		DetailedHTMLProps<
			HTMLAttributes<HTMLTableRowElement>,
			HTMLTableRowElement
		>,
		'className'
	> | void
	/**
	 * Add custom props to `<td>` element
	 *
	 * @example
	 * (data, { column, row }) => ({
	 *   onClick: () => console.log(column, row)
	 * })
	 */
	tdProps?: (
		data: T[keyof T],
		indexes: {
			column: number
			row: number
		}
	) => Omit<
		DetailedHTMLProps<
			TdHTMLAttributes<HTMLTableDataCellElement>,
			HTMLTableDataCellElement
		>,
		'className'
	> | void
}
```

For more information, you can looks directly in the source code as it's very easy to read.
