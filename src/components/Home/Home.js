import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Spinners from '../Spinners/Spinners';
import ActiveToDoTable from './ActiveToDoTable';
import AddTodoModal from './AddTodoModal';

const Home = () => {
    const [allIetms, setAllItems] = useState([]);

    useEffect(() => {
        async function getItems() {
            try {
                const response = await axios.get('http://localhost:5000/todolist');
                setAllItems(response.data);
            }
            catch (error) {
                // console.log(error);
                toast.error(error.message, { id: 'error-message' })
            }
        }
        getItems();
    }, [allIetms]);
    if (allIetms.length === 0) {
        return <Spinners></Spinners>
    }

    return (
        <div>
            <h1 className='text-purple-500 text-2xl font-bold my-2'>Welcome to your To-Do List Manager</h1>
            <label htmlFor="add-to-do-modal" className="btn modal-button my-5">Add new To-do</label>
            <AddTodoModal></AddTodoModal>
            <div className='my-3 mx-4'>
                <div>
                    <h1 className='text-green-500 font-bold my-3'>Current Active To-do List</h1>
                    <div class="overflow-x-auto">
                        <table class="table w-full text-center">
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

export default Home;