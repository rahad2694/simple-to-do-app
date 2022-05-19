import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import toast from 'react-hot-toast';
import auth from '../../firebase.init';
import ActiveToDoTable from '../Home/ActiveToDoTable';
import AddTodoModal from '../Home/AddTodoModal';

const DashBoard = () => {
    const [allIetms, setAllItems] = useState([]);
    const [user] = useAuthState(auth);

    useEffect(() => {
        async function getItems() {
            const headers = {
                'email': `${user?.email}`
            }
            try {
                const response = await axios.get(`https://simple-to-do-app-server.herokuapp.com/todolist`, { headers: headers });
                setAllItems(response.data);
            }
            catch (error) {
                toast.error(error.message, { id: 'error-message' })
            }
        }
        getItems();
    }, [allIetms]);

    return (
        <div>
            <h1 className='text-purple-500 text-2xl font-bold my-2'>Your Dashboard</h1>
            <label htmlFor="add-to-do-modal" className="btn modal-button my-5">Add new To-do</label>
            <AddTodoModal></AddTodoModal>
            <div className='my-3 mx-4'>
                <div>
                    {allIetms.length ===0?<h1 className='text-red-500 font-bold my-3'>No To-do added by you yet</h1>: <h1 className='text-green-500 font-bold my-3'>Your Current To-do List</h1>}
                    <div className="overflow-x-auto">
                        <table className="table mx-auto w-1/4 md:w-2/4 lg:w-11/12 text-center">
                            <thead>
                                <tr>
                                    <th className='hidden md:table-cell'></th>
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