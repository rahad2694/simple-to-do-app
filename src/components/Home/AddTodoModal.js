import React from 'react';
import AddToDo from './AddToDo';

const AddTodoModal = () => {
    return (
        <div>
            <input type="checkbox" id="add-to-do-modal" class="modal-toggle" />
            <div class="modal">
                <div class="modal-box relative">
                    <label for="add-to-do-modal" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 class="text-lg font-bold">Want to Add New To-Do?</h3>
                    <AddToDo></AddToDo>
                </div>
            </div>
        </div >
    );
};

export default AddTodoModal;