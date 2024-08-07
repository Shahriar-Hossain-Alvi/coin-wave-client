import PropTypes from 'prop-types';

const UserTransactionTableRow = ({ transaction, index }) => {
    const { receiverName, receiverMobileNumber, sentAmount, transactionId, transactionTime } = transaction;

    return (
        <tr className='hover'>
            <th>{index + 1}</th>
            <td>{receiverName}</td>
            <td>{receiverMobileNumber}</td>
            <td>{transactionId}</td>
            <td>{sentAmount}</td>
            <td>{transactionTime?.slice(0, 10)}</td>
        </tr>
    );
};

UserTransactionTableRow.propTypes = {
    transaction: PropTypes.object,
    index: PropTypes.number
}

export default UserTransactionTableRow;