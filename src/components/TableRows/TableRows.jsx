import PropTypes from 'prop-types';

const TableRows = ({ singleUser, index }) => {
    const { name, email, role, status } = singleUser;

    return (
        <tr className='hover font-medium'>
            <th>{index + 1}</th>
            <td>{name}</td>
            <td>{email}</td>
            <td>{role}</td>
            <td>
                <select className={`select ${status==='pending' ? 'bg-cwOrange text-white' : 'bg-success text-white'} w-full`}>
                    <option className=''>{status}</option>
                    <option>
                        {
                            status === 'pending' ? 'approve' : 'pending'
                        }
                    </option>
                </select>
            </td>
        </tr>
    );
};

TableRows.propTypes = {
    singleUser: PropTypes.object,
    index: PropTypes.number
}

export default TableRows;