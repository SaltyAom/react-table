import React from 'react'

import type { FunctionComponent } from 'react'

const is = (
	something: unknown,
	type: 'string' | 'number' | 'function' | 'object'
) => typeof something == type

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

const Table: FunctionComponent<ITable> = ({
	header = [],
	data = [],
	dataKey = 0,

	wrapperClassName = '',
	className = '',
	cellsWidth = [],

	theadClassName = '',
	thClassName = [],
	allThClassName = '',

	tbodyClassName = '',
	trClassName = '',
	tdClassName = [],
	allTdClassName = ''
}) => {
	let keyIndex = is(dataKey, 'string')
		? header.indexOf(dataKey as string)
		: (dataKey as number)

	return (
		<section className={wrapperClassName}>
			<table className={className}>
				<thead className={theadClassName}>
					<tr>
						{header.map((head, index) => (
							<th
								key={
									is(head, 'string')
										? (head as string)
										: index
								}
								className={`${thClassName[index]} ${allThClassName}`}
								style={{
									minWidth: `${cellsWidth[index]}px`
								}}
							>
								{head}
							</th>
						))}
					</tr>
				</thead>
				<tbody className={tbodyClassName}>
					{data.map((row, index) => {
						let className = is(trClassName, 'string')
							? trClassName
							: (trClassName as Function)(row, index) || ''

						let currentKey = row[keyIndex]

						return (
							<tr
								className={className}
								key={
									is(currentKey, 'string')
										? (currentKey as string)
										: index
								}
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
										  )[index]
										: (tdClassName as Function)(
												rowData,
												index
										  ) || ''

									if (is(className, 'function'))
										className =
											className(rowData, index) || ''

									return (
										<td
											key={`${header[index]}-${rowData}`}
											className={`${className} ${allTdClassName}`}
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
		</section>
	)
}

export default Table
