import PropTypes from 'prop-types';
import { FcApprove, FcDisapprove } from 'react-icons/fc';
import { GoDotFill } from 'react-icons/go';

const TableRows = ({ singleUser, index, handleUserApprove }) => {
    const { _id, name, email, role, status } = singleUser;

    return (
        <tr className='hover font-medium'>
            <th>{index + 1}</th>
            <td className='capitalize'>{name}</td>
            <td>{email}</td>
            <td className='capitalize'>{role}</td>


            {/* status show */}
            <td className='capitalize'>
                {
                    status === 'active' &&
                    <span>
                        {status} < GoDotFill className='text-success inline' />
                    </span>
                }
                {
                    status === 'pending' &&
                    <span>
                        {status}<GoDotFill className='text-warning inline' />
                    </span>
                }
                {
                    status === 'blocked' &&
                    <span>
                        {status}<GoDotFill className='text-error inline' />
                    </span>
                }
            </td>



            {/* status update buttons */}
            <td>
                {
                    (status === 'pending' || status === 'blocked') &&
                    <td>
                        <button onClick={() => handleUserApprove(_id)} className='btn btn-success text-white capitalize flex gap-1'>Activate<FcApprove className='text-lg' /></button>
                    </td>
                }
                {
                    status === 'active' &&
                    <td>
                        <button className='btn btn-error text-white capitalize flex gap-1'>block<FcDisapprove className='text-lg' /></button>
                    </td>
                }
            </td>

        </tr>
    );
};

TableRows.propTypes = {
    singleUser: PropTypes.object,
    index: PropTypes.number,
    handleUserApprove: PropTypes.func
}

export default TableRows;