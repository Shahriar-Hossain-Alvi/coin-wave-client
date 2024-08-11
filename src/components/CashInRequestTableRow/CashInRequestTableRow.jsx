import PropTypes from 'prop-types';


const CashInRequestTableRow = ({ index, cashInData, rejectCashInRequest, acceptCashInRequest }) => {
    const { _id, userName, userEmail,userMobileNumber, cashInAmount, agentEmail } = cashInData;
    

    return (
        <tr>
            <th>{index + 1}</th>
            <td>{userName}</td>
            <td>{userMobileNumber}</td>
            <td>{cashInAmount}</td>
            {
                !cashInData?.cashInRequestStatus &&
                <td className="flex justify-center gap-2">
                    <button onClick={() => acceptCashInRequest(_id, userEmail, agentEmail, cashInAmount)} className="btn btn-success text-white">Accept</button>
                    <button onClick={() => rejectCashInRequest(_id)} className="btn btn-error text-white">Reject</button>
                </td>
            }
            {
                cashInData?.cashInRequestStatus === 'accepted' &&
                <td>
                    <span className='badge badge-success text-white badge-lg'>Accepted</span>
                </td>
            }
            {
                cashInData?.cashInRequestStatus === 'rejected' &&
                <td>
                    <span className='badge badge-error text-white badge-lg'>Rejected</span>
                </td>
            }
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