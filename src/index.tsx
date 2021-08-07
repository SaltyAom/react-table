import React from 'react'

import type {
	FunctionComponent,
	DetailedHTMLProps,
	TableHTMLAttributes,
	HTMLAttributes,
	ThHTMLAttributes,
	TdHTMLAttributes
} from 'react'

const is = (
	something: unknown,
	type: 'string' | 'number' | 'function' | 'object' | 'undefined'
) => typeof something == type

const undef = undefined
const undefString = 'undefined'

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

const Table: FunctionComponent<ITable> = ({
	header = [],
	data = [],
	dataKey = 0,

	wrapperClassName = undefined,
	className = undefined,
	cellsWidth = [],

	theadClassName = undefined,
	thClassName = [],
	allThClassName = undefined,

	tbodyClassName = undefined,
	trClassName = undefined,
	tdClassName = [],
	allTdClassName = undefined,

	beforeTable = null,
	afterTable = null,

	tableProps = {},
	theadProps = {},
	tbodyProps = {},
	thProps = () => ({}),
	trProps = () => ({}),
	tdProps = () => ({})
}) => {
	let keyIndex = is(dataKey, 'string')
		? header.indexOf(dataKey as string)
		: (dataKey as number)

	return (
		<section className={wrapperClassName}>
			{beforeTable}
			<table className={className} {...tableProps}>
				<thead className={theadClassName} {...theadProps}>
					<tr>
						{header.map((head, index) => {
							let className = `${thClassName[index] || ''} ${
								allThClassName ?? ''
							}` || ' '

							return (
								<th
									key={
										is(head, 'string')
											? (head as string)
											: index
									}
									className={
										className != ' ' ? className : undef
									}
									style={
										cellsWidth[index]
											? {
													minWidth: `${cellsWidth[index]}px`
											  }
											: {}
									}
									{...(thProps(head, index) || {})}
								>
									{head}
								</th>
							)
						})}
					</tr>
				</thead>
				<tbody className={tbodyClassName} {...tbodyProps}>
					{data.map((row, rowIndex) => {
						let className = is(trClassName, 'string')
							? trClassName
							: is(trClassName, undefString)
							? trClassName
							: (trClassName as Function)(row, rowIndex) || undef

						let currentKey = row[keyIndex]

						return (
							<tr
								className={className}
								key={
									is(currentKey, 'string')
										? (currentKey as string)
										: rowIndex
								}
								{...(trProps(row, rowIndex) || {})}
							>
								{row.map((rowData, index) => {
									let className = is(tdClassName, 'object')
										? (
												tdClassName as (
													| string
													| ((
															data: string,
															index: number
													  ) => string)
												)[]
										  )[index] || undef
										: is(tdClassName, undefString)
										? ''
										: (tdClassName as Function)(
												rowData,
												index
										  ) || undef

									if (is(className, 'function'))
										className =
											className(rowData, index) || undef

									let _className = `${className ?? ''} ${allTdClassName ?? ''}`

									return (
										<td
											key={`${header[index]}-${rowData}`}
											className={
												_className != ' '
													? _className
													: undef
											}
											{...(tdProps(rowData, {
												column: index,
												row: rowIndex
											}) || {})}
										>
											{rowData}
										</td>
									)
								})}
							</tr>
						)
					})}
				</tbody>
			</table>
			{afterTable}
		</section>
	)
}

export default Table
