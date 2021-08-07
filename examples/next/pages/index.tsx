import Table from '@saltyaom/react-table'

const VTuberTable = () => {
	const header = ['name', 'type', 'value']
	const size = [100, 96, 60]
	const data = [
		['Okayu', <b>Fox</b>, 10],
		['Korone', <u>Fox</u>, -1],
		['Fubuki', <i>Fox</i>, 50]
	] as const

	return (
		<>
			<style
				dangerouslySetInnerHTML={{
					__html: `
                        .wrapper {
                            overflow: scroll;
                            border-radius: 4px;
                            border: 1px solid #efeff4;
                            box-shadow: 0 4px 16px rgba(0,0,0,.1);
                        }
                        
                        .table {
                            border-collapse: collapse;
                        }

                        .title {
                            font-size: 18px;
                            text-transform: capitalize;
                            font-weight: 400;
                            text-align: left;
                            border: unset !important;
                            color: #666;
                        }

                        .text-blue {
                            color: #007aff;
                        }

                        .text-green {
                            color: green;
                        }

                        .text-red {
                            color: red;
                        }

                        .row {
                            height: 36px;
                            border-top: 1px solid #ceced2;
                            padding: 12px;
                        }

                        .hover-effect {
                            transition: background-color .16s ease-out;
                        }

                        .hover-effect:hover {
                            background-color: rgba(0,0,0,.0375);
                        }

                        #table-root {
                            display: flex;
                            flex-direction: column;
                            justify-content: center;
                            align-items: center;
                            width: 100%;
                            min-height: 100vh;
                        }

                        #github {
                            color: #007aff;
                            text-decoration: none;
                            margin: 24px 0 0 0;
                            font-weight: 300;
                            padding: 4px 8px;
                            border-radius: 4px;
                            transition: background-color .16s ease-out;
                        }

                        #github:hover,
                        #github:focus {
                            background-color: rgba(0, 123, 255, .0875);
                        }
                    `
				}}
			/>
			<div id="table-root">
				<Table
					dataKey="name"
					header={header}
					data={data}
					wrapperClassName="wrapper"
					className="table"
					cellsWidth={size}
					allThClassName="title row"
					allTdClassName="row"
					trClassName="hover-effect"
					thClassName={['text-blue']}
					tdClassName={[
						'',
						'',
						// On index 2, apply custom condition
						(value: number) =>
							value >= 0 ? 'text-green' : 'text-red'
					]}
				/>
				<a
					id="github"
					role="heading"
					aria-level={1}
					href="https://github.com/saltyaom/react-table"
					target="_blank"
					title="View on Github"
				>
					@saltyaom/react-table
				</a>
			</div>
		</>
	)
}

export default VTuberTable
