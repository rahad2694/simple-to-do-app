import React from 'react';
import AddTodoModal from './AddTodoModal';

const Home = () => {
    return (
        <div>
            <h1 className='text-purple-500 text-2xl font-bold'>Welcome to your To-Do List Manager</h1>
            <label for="add-to-do-modal" class="btn modal-button mt-5">Add new To-do</label>
            <AddTodoModal></AddTodoModal>
        </div>
    );
};

export default Home;