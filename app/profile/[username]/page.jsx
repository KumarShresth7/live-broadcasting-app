// app/profile/[username]/page.tsx
export default function ProfilePage({ params }) {
    const { username } = params;

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold">Profile: {username}</h1>
            {/* <ProfileInfo username={username} /> */}
        </div>
    );
}
