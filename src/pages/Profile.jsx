import ProfileHeader from '../components/Profileheader';
import ProfileBody from '../components/Profilebody';
import TransactionBody from '../components/Transactionbody';
import { useState } from 'react';
// import { useGetProfileMutation } from '../rtk/ApiSlice';
// import { useEffect } from 'react';

export default function Profile(){

	const [viewTransactions, setViewTransactions] = useState(false); // State to track viewing transactions

	// const [getProfile] = useGetProfileMutation();

    // useEffect(() => {
    //     getProfile();
    // }, [getProfile]);

    return (
		<main>
			<div className="main bg-dark">
				{viewTransactions ? null : <ProfileHeader />}
				
				{viewTransactions ? <TransactionBody /> : <ProfileBody setViewTransactions={setViewTransactions} />}
			</div>
		</main>
      );
}