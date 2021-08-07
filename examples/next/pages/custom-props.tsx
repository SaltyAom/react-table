import Table from '@saltyaom/react-table'

const CustomProps = () => {
	return (
		<Table
			header={['Name', 'Type']}
			data={[
				['Okayu', 'Cat'],
				['Korone', 'Dog']
			]}
            tableProps={{
                title: "VTuber Table"
            }}
			tdProps={(data, i) => {                
                return {
                    onClick: () => console.log(data, i)
                }
			}}
		/>
	)
}

export default CustomProps
