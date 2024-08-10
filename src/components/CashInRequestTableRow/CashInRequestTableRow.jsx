import PropTypes from 'prop-types';


const CashInRequestTableRow = ({ index, cashInData, rejectCashInRequest, acceptCashInRequest }) => {
    const { _id, userName, userMobileNumber, cashInAmount } = cashInData;

    return (
        <tr>
            <th>{index + 1}</th>
            <td>{userName}</td>
            <td>{userMobileNumber}</td>
            <td>{cashInAmount}</td>
            <td className="flex justify-center gap-2">
                <button onClick={() => acceptCashInRequest(_id)} className="btn btn-success text-white">Accept</button>
                <button onClick={() => rejectCashInRequest(_id)} className="btn btn-error text-white">Reject</button>
            </td>
        </tr>
    );
};

CashInRequestTableRow.propTypes = {
    index: PropTypes.number,
    cashInData: PropTypes.object,
    rejectCashInRequest: PropTypes.func,
    acceptCashInRequest: PropTypes.func
}

export default CashInRequestTableRow;