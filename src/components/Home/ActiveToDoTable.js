import axios from 'axios';
import React from 'react';
import toast from 'react-hot-toast';

const ActiveToDoTable = ({ item, index }) => {
    const { taskName, taskDescription, email, _id, completed } = item;

    const handleDelete = (id) => {
        const proceed = window.confirm("Are you sure to delete?");
        if (proceed) {
            axios.delete(`https://simple-to-do-app-server.herokuapp.com/ietm/${id}`)
                .then(response => {
                    console.log(response);
                    toast.success('Successfully Deleted', { id: 'deleted' })
                })
                .catch(error => {
                    toast.error(error.message, { id: 'delete-error' });
                })
        } else {
            toast.success('Attempt Terminated', { id: 'delete-cancel' })
        }
    }
    const updateItemToDB = async (updatedItem) => {
        try {
            let id = _id;
            const response = await axios.put(`https://simple-to-do-app-server.herokuapp.com/updateinfo/${id}`, updatedItem);
            if (response.status === 200) {
                toast.success('Marked As Completed', { id: 'Success' });
            }
        } catch (error) {
            toast.error(error.message, { id: 'update-error' });
        }
    }
    const handleStrikeThrough = (id) => {
        const updatedItem = { taskName, taskDescription, email, completed: true };
        updateItemToDB(updatedItem);
    }

    return (
        <tr>
            <th>{index + 1}</th>
            <td>{completed ? <s>{taskName}</s> : <p>{taskName}</p>}</td>
            <td>{completed ? <s>{taskDescription}</s> : <p>{taskDescription}</p>}</td>
            <td><button onClick={() => handleStrikeThrough(_id)} className='btn text-white hidden md:block'>Mark Complete</button><button onClick={() => handleStrikeThrough(_id)} className='btn text-white md:hidden'>Ok</button></td>
            <td><button onClick={() => handleDelete(_id)} className='btn bg-blue-500 text-white hidden md:block'>Delete</button><button onClick={() => handleDelete(_id)} className='btn bg-blue-500 text-white md:hidden'>X</button></td>
        </tr>
    );
};

export default ActiveToDoTable;