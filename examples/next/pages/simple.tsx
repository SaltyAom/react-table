import Table from '@saltyaom/react-table'

const SIMPleTable = () => {
	const header = ['name', 'type', 'value']
	const data = [
		['Okayu', <b>Fox</b>, 10],
		['Korone', <u>Fox</u>, -1],
		['Fubuki', <i>Fox</i>, 50]
	] as const

	return (
        <Table
            dataKey='name'
            header={header}
            data={data}
        />
	)
}

export default SIMPleTable
