import { getMe } from "../services/users";
import GenerateTokenButton from "../components/GenerateTokenButton";
import Link from "next/link";
import { updateReadingList } from "../actions/readingList";

const Me = async () => {
    const user = await getMe();
    const readingList = user.readingList || [];

    const readList = readingList.filter((item) => item.read);
    const unreadList = readingList.filter((item) => !item.read);

    return (
        <div className="max-w-2xl mx-auto p-6 mt-10 shadow rounded-xl" data-testid="user-profile">
            <h2 className="text-2xl font-bold mb-3">My Profile</h2>
            <p data-testid="user-name">Name: {user.name}</p>
            <p data-testid="user-username">Username: {user.username}</p>

            <div className="mt-3" data-testid="reading-list-section">
                <h3 className="text-xl font-bold mt-10">Reading List</h3>

                <div data-testid="unread-section">
                    <h4 className="text-lg font-bold mt-4 mb-2">
                        Unread
                        {unreadList.length > 0 && <span>({unreadList.length})</span>}
                    </h4>
                    {unreadList && unreadList.length > 0 ? (
                        <ul>
                            {unreadList.map((entry) => (
                                <li key={entry.id} className="bg-yellow-50 my-2 p-3 rounded-lg">
                                    <div className="flex">
                                        <Link
                                            href={`/blogs/${entry.blog.id}`}
                                            className="hover:underline hover:text-blue-400 text-blue-600"
                                        >
                                            {entry.blog.title}
                                        </Link>

                                        <div className="ml-auto">
                                            <form action={updateReadingList}>
                                                <input
                                                    type="hidden"
                                                    name="id"
                                                    value={entry.blog.id}
                                                />
                                                <button
                                                    className="mt-3 bg-blue-500 text-white rounded-xl p-2.5 px-5 hover:bg-blue-600 "
                                                    data-testid={`mark-read-${entry.blog.id}`}
                                                >
                                                    Mark as read
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p data-testid="no-unread-blogs">No unread blogs! Good job!</p>
                    )}
                </div>

                <div>
                    <h4 className="text-lg font-bold mt-4 mb-2">
                        Read
                        {readList.length > 0 && <span>({readList.length})</span>}
                    </h4>
                    {readList && readList.length > 0 ? (
                        <ul>
                            {readList.map((entry) => (
                                <li key={entry.id} className="bg-green-50 my-2 p-3 rounded-lg">
                                    <div className="flex">
                                        <Link
                                            href={`/blogs/${entry.blog.id}`}
                                            className="hover:underline hover:text-blue-400 text-blue-600"
                                        >
                                            {entry.blog.title}
                                        </Link>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No read blogs</p>
                    )}
                </div>
            </div>

            <h3 className="text-xl font-bold mt-10">API Token</h3>
            <div className="" data-testid="api-token-section">
                <div className="bg-gray-100 mt-3 p-3 rounded-xl">
                    <p>Current token:</p>
                    <div className="bg-gray-200 mt-3 p-3 rounded-xl" data-testid="token-display">
                        {user.token ? (
                            <p data-testid="api-token">{user.token}</p>
                        ) : (
                            <p data-testid="no-token-message">No token yet</p>
                        )}
                    </div>
                </div>
                <GenerateTokenButton />
            </div>
        </div>
    );
};

export default Me;
