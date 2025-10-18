import "./Profile.css";
export default function Profile({ user, handleProfileChange }) {
  return (
    <div className="tab">
      <h1>Edit Profile</h1>
      <form className="profile-form" onSubmit={(e) => e.preventDefault()}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleProfileChange}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleProfileChange}
          />
        </label>
        <button>Save Changes</button>
      </form>
    </div>
  );
}
