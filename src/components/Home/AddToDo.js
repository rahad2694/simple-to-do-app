import React from 'react';

const AddToDo = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        const taskName = e.target.name.value;
        const taskDescription = e.target.description.value;
        const data = {taskName,taskDescription};
        console.log(data);
    }
    return (
        <div>
            <form onSubmit={handleSubmit} className='py-4 flex flex-col items-center'>
                
                <input type="text" placeholder="Task Name"
                    name="name" className="input input-bordered w-full max-w-lg mb-4" />
                <textarea type="text" placeholder="Task Description"
                    name="description" className="input input-bordered w-full max-w-lg mb-4" />
                
                <input type="submit" value="Add" className="btn btn-active input input-bordered w-full max-w-lg" />
            </form>
        </div>
    );
};

export default AddToDo;