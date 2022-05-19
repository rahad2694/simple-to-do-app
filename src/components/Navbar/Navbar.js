import { signOut } from 'firebase/auth';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import auth from '../../firebase.init';

const Navbar = () => {
    const [user] = useAuthState(auth);
    // console.log(user);
    return (
        <div className="navbar bg-base-100">
            <div className="flex-1">
                <Link to="/" className="btn btn-ghost normal-case text-xl ml-3">To-Do Manager</Link>
            </div>
            <div className="flex-none">
                
                {user?.uid? <div className="dropdown dropdown-end mx-6">
                    <label tabIndex="0" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img alt='' src={user?.uid?user.photoURL:`https://www.unoreads.com/user_profile_pic/demo-user.png`} />
                        </div>
                    </label>
                    <ul tabIndex="0" className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        <li>
                            <button className="justify-between">
                                Profile
                                <span className="badge">New</span>
                            </button>
                        </li>
                        <li><button onClick={() => {
                                        signOut(auth);
                                        toast.success('Successfully Logged Out', { id: 'logout' });
                                    }}>Logout</button></li>
                    </ul>
                </div>:
                <Link className='mx-2 btn btn-ghost' to="/login">Log in</Link>}
            </div>
        </div>
    );
};

export default Navbar;