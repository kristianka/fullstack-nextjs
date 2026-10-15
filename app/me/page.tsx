import { getMe } from "../services/users";
import GenerateTokenButton from "../components/GenerateTokenButton";

const Me = async () => {
    const user = await getMe();

    return (
        <div className="max-w-2xl mx-auto p-6 mt-10 shadow rounded-xl">
            <h2 className="text-2xl font-bold mb-3">My Profile</h2>
            <p>Name: {user.name}</p>
            <p>Username: {user.username}</p>

            <h3 className="text-xl font-bold mt-10">API Token</h3>
            <div className="">
                <div className="bg-gray-100 mt-3 p-3 rounded-xl">
                    <p>Current token:</p>
                    <div className="bg-gray-200 mt-3 p-3 rounded-xl">
                        {user.token ? <p>{user.token}</p> : <p>No token yet</p>}
                    </div>
                </div>
                <GenerateTokenButton />
            </div>
        </div>
    );
};

export default Me;
