import React from 'react';
import AddToDo from './AddToDo';

const AddTodoModal = () => {
    return (
        <div>
            <input type="checkbox" id="add-to-do-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="add-to-do-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold">Want to Add New To-Do?</h3>
                    <AddToDo></AddToDo>
                </div>
            </div>
        </div >
    );
};

export default AddTodoModal;