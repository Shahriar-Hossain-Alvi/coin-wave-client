import PropTypes from 'prop-types';

const AllTransactionTableRow = ({ singleTransaction, index }) => {

    const { receiverName, senderName, sentAmount, transactionId, transactionTime } = singleTransaction;


    return (
        <tr className='hover'>
            <th>{index + 1}</th>
            <td>{senderName}</td>
            <td>{receiverName}</td>
            <td>{sentAmount}</td>
            <td>{transactionId}</td>
            <td>{transactionTime?.slice(0,10)}</td>
        </tr>
    );
};


AllTransactionTableRow.propTypes = {
    singleTransaction: PropTypes.object,
    index: PropTypes.number
}

export default AllTransactionTableRow;