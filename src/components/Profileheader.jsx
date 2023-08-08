import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useUpdateUsernameMutation } from '../rtk/ApiSlice';
import { setUser } from '../rtk/AuthSlice';

export default function ProfilePage() {
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();

    const [isEditing, setIsEditing] = useState(false);
    const [userName, setUserName] = useState(user.userName);
    const [updateUsername] = useUpdateUsernameMutation();

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleCancelClick = () => {
        setIsEditing(false);
        setUserName(user.userName);
    };

    const handleSaveClick = () => {
        updateUsername(userName);
        dispatch(setUser({ ...user, userName: userName }));
        setIsEditing(false);
    };

    return (
        <div className="header">
            {isEditing ? (
                <form onSubmit={(e) => { e.preventDefault(); handleSaveClick(); }}>
                    <div>
                        User Name <input value={userName} onChange={(e) => setUserName(e.target.value)} />
                    </div>
                    <div>
                        First Name <input value={user.firstName} disabled />
                    </div>
                    <div>
                        Last Name <input value={user.lastName} disabled />
                    </div>
                    <div>
                        <button className="edit-button" type='submit'>Save</button>
                        <button className="edit-button" onClick={(e) => { e.preventDefault(); handleCancelClick(); }}>Cancel</button>
                    </div>
                </form>
            ) : (
                <>
                    <h1>
                        Welcome back<br />
                        {user.firstName} {user.lastName}
                    </h1>
                    <button className="edit-button" onClick={handleEditClick}>Edit Name</button>
                </>
            )}
        </div>
    );
}