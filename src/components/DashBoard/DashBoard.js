import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import toast from 'react-hot-toast';
import auth from '../../firebase.init';
import Spinners from '../Spinners/Spinners';
import ActiveToDoTable from '../Home/ActiveToDoTable';
import AddTodoModal from '../Home/AddTodoModal';

const DashBoard = () => {
    const [allIetms, setAllItems] = useState([]);
    const [user] = useAuthState(auth);

    useEffect(() => {
        async function getItems() {
            const headers ={
                'email':`${user?.email}`
            }
            try {
                const response = await axios.get(`http://localhost:5000/todolist`,{ headers: headers});
                setAllItems(response.data);
            }
            catch (error) {
                // console.log(error);
                toast.error(error.message, { id: 'error-message' })
            }
        }
        getItems();
    }, [allIetms]);
    // if (allIetms.length === 0) {
    //     return <Spinners></Spinners>
    // }

    return (
        <div>
            <h1 className='text-purple-500 text-2xl font-bold my-2'>Welcome to your To-Do List Manager</h1>
            <label htmlFor="add-to-do-modal" className="btn modal-button my-5">Add new To-do</label>
            <AddTodoModal></AddTodoModal>
            <div className='my-3 mx-4'>
                <div>
                    <h1 className='text-green-500 font-bold my-3'>Current Active To-do List</h1>
                    <div className="overflow-x-auto">
                        <table className="table w-full text-center">
                            {/* <!-- head --> */}
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Task Name</th>
                                    <th>Task Description</th>
                                    <th>Action</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    allIetms.map((item, index) => <ActiveToDoTable index={index} key={item._id} item={item}></ActiveToDoTable>)
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashBoard;