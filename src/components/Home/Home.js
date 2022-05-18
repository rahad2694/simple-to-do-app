import React from 'react';
import AddTodoModal from './AddTodoModal';

const Home = () => {
    return (
        <div>
            <h1 className='text-purple-500 text-2xl font-bold'>Welcome to your To-Do List Manager</h1>
            <label htmlFor="add-to-do-modal" className="btn modal-button mt-5">Add new To-do</label>
            <AddTodoModal></AddTodoModal>
        </div>
    );
};

export default Home;