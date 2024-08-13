import PropTypes from 'prop-types';


const CashOutRequestTableRow = ({ index, cashOutData, rejectCashOutRequest, acceptCashOutRequest }) => {
    const { _id, userName, userEmail, userMobileNumber, cashOutAmount, agentEmail } = cashOutData;


    return (
        <tr>
            <th>{index + 1}</th>
            <td>{userName}</td>
            <td>{userMobileNumber}</td>
            <td>{cashOutAmount}</td>
            {
                !cashOutData?.cashOutRequestStatus &&
                <td className="flex justify-center gap-2">
                    <button onClick={() => acceptCashOutRequest(_id, userEmail, agentEmail, cashOutAmount)} className="btn btn-success text-white">Accept</button>
                    <button onClick={() => rejectCashOutRequest(_id)} className="btn btn-error text-white">Reject</button>
                </td>
            }
            {
                cashOutData?.cashOutRequestStatus === 'accepted' &&
                <td>
                    <span className='badge badge-success text-white badge-lg'>Accepted</span>
                </td>
            }
            {
                cashOutData?.cashOutRequestStatus === 'rejected' &&
                <td>
                    <span className='badge badge-error text-white badge-lg'>Rejected</span>
                </td>
            }
        </tr>
    );
};

CashOutRequestTableRow.propTypes = {
    index: PropTypes.number,
    cashOutData: PropTypes.object,
    rejectCashOutRequest: PropTypes.func,
    acceptCashOutRequest: PropTypes.func
}

export default CashOutRequestTableRow;