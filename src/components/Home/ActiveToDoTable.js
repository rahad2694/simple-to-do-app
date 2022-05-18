import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

const ActiveToDoTable = ({item,index}) => {
    const {taskName,taskDescription,email,_id,completed} = item;

    const handleDelete = (id) => {
        const proceed = window.confirm("Are you sure to delete?");
        if (proceed) {
            axios.delete(`http://localhost:5000/ietm/${id}`)
                .then(response => {
                    console.log(response);
                    toast.success('Successfully Deleted', { id: 'deleted' })
                })
                .catch(error => {
                    // console.log(error);
                    toast.error(error.message, { id: 'delete-error' });
                })
        } else {
            toast.success('Attempt Terminated', { id: 'delete-cancel' })
        }
    }
    const updateItemToDB = async (updatedItem) => {
        try {
            let id = _id;
            const response = await axios.put(`http://localhost:5000/updateinfo/${id}`, updatedItem);
            // console.log(response);
            if (response.status === 200) {
                toast.success('Marked As Completed', { id: 'Success' });
            }
        } catch (error) {
            // console.log(error);
            toast.error(error.message, { id: 'update-error' });
        }
    }
    const handleStrikeThrough=(id)=>{
        const updatedItem = {taskName,taskDescription,email,completed:true};
        updateItemToDB(updatedItem);
    }

    return (
        <tr>
            <th>{index+1}</th>
            <td>{completed?<s>{taskName}</s>:<p>{taskName}</p>}</td>
            <td>{completed?<s>{taskDescription}</s>:<p>{taskDescription}</p>}</td>
            <td><button onClick={()=>handleStrikeThrough(_id)} className='btn text-white'>Mark Complete</button></td>
            <td><button onClick={()=>handleDelete(_id)} className='btn bg-blue-500 text-white'>Delete</button></td>
        </tr>
    );
};

export default ActiveToDoTable;