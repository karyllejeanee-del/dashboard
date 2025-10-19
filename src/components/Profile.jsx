import "./Profile.css";

import { useState } from "react";
import "./Profile.css";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    dob: "1990-05-15",
    location: "San Francisco, CA",
    bloodType: "O+",
    height: "5'10\"",
    weight: "165 lbs",
    emergencyContact: "Jane Doe - +1 (555) 987-6543",
  });

  const [conditions, setConditions] = useState([
    "Hypertension",
    "Anxiety",
    "Asthma",
  ]);
  const [newCondition, setNewCondition] = useState("");

  const [goals] = useState([
    { title: "Maintain resting heart rate below 70 bpm", progress: 85 },
    { title: "Reduce daily stress by 20%", progress: 60 },
    { title: "Exercise 30 minutes daily", progress: 92 },
  ]);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleAddCondition = () => {
    if (newCondition && !conditions.includes(newCondition)) {
      setConditions([...conditions, newCondition]);
      setNewCondition("");
    }
  };

  const handleSave = () => {
    setIsEditing(false);
    alert("Profile saved successfully ✅");
  };

  return (
    <div className="profile-root">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Profile</h2>
        <button
          onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
          className={`profile-btn ${isEditing ? "save" : ""}`}
        >
          {isEditing ? "Save Profile" : "Edit Profile"}
        </button>
      </div>

      <p className="text-gray-400 mb-4">
        Manage your personal and health information
      </p>

      {/* Top Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        {/* Left Card */}
        <div className="profile-card flex flex-col items-center text-center">
          <div className="profile-avatar">{profile.name.charAt(0)}</div>
          <h3 className="text-lg font-semibold">{profile.name}</h3>
          <p className="text-gray-400">{profile.email}</p>

          <div className="flex gap-2 mt-2">
            <span className="badge green">Active User</span>
            <span className="badge blue">Premium</span>
          </div>

          <div className="mt-4 text-gray-400 text-sm space-y-1">
            <p>📍 {profile.location}</p>
            <p>🎂 Born {new Date(profile.dob).toLocaleDateString()}</p>
          </div>
        </div>

        {/* Right Card */}
        <div className="profile-card">
          <h3 className="mb-2 text-gray-300">Personal Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="text-sm text-gray-400">Full Name</label>
              <input
                type="text"
                name="name"
                disabled={!isEditing}
                value={profile.name}
                onChange={handleChange}
                className="profile-input"
              />
            </div>
            <div>
              <label className="text-sm text-gray-400">Email Address</label>
              <input
                type="email"
                name="email"
                disabled={!isEditing}
                value={profile.email}
                onChange={handleChange}
                className="profile-input"
              />
            </div>
            <div>
              <label className="text-sm text-gray-400">Phone Number</label>
              <input
                type="text"
                name="phone"
                disabled={!isEditing}
                value={profile.phone}
                onChange={handleChange}
                className="profile-input"
              />
            </div>
            <div>
              <label className="text-sm text-gray-400">Date of Birth</label>
              <input
                type="date"
                name="dob"
                disabled={!isEditing}
                value={profile.dob}
                onChange={handleChange}
                className="profile-input"
              />
            </div>
            <div className="md:col-span-2">
              <label className="text-sm text-gray-400">Location</label>
              <input
                type="text"
                name="location"
                disabled={!isEditing}
                value={profile.location}
                onChange={handleChange}
                className="profile-input"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Medical Information */}
      <div className="profile-card mb-4">
        <h3 className="mb-2 text-gray-300">Medical Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <div>
            <label className="text-sm text-gray-400">Blood Type</label>
            <input
              type="text"
              name="bloodType"
              disabled={!isEditing}
              value={profile.bloodType}
              onChange={handleChange}
              className="profile-input"
            />
          </div>
          <div>
            <label className="text-sm text-gray-400">Height</label>
            <input
              type="text"
              name="height"
              disabled={!isEditing}
              value={profile.height}
              onChange={handleChange}
              className="profile-input"
            />
          </div>
          <div>
            <label className="text-sm text-gray-400">Weight</label>
            <input
              type="text"
              name="weight"
              disabled={!isEditing}
              value={profile.weight}
              onChange={handleChange}
              className="profile-input"
            />
          </div>
          <div>
            <label className="text-sm text-gray-400">Emergency Contact</label>
            <input
              type="text"
              name="emergencyContact"
              disabled={!isEditing}
              value={profile.emergencyContact}
              onChange={handleChange}
              className="profile-input"
            />
          </div>
        </div>
      </div>

      {/* Health Conditions */}
      <div className="profile-card mb-4">
        <h3 className="text-gray-300 mb-2">Health Conditions</h3>
        <div className="space-y-2">
          {conditions.map((cond, index) => (
            <div
              key={index}
              className="text-sm bg-gray-800 p-2 rounded-md border border-gray-700"
            >
              {cond}
            </div>
          ))}
          {isEditing && (
            <div className="flex gap-2 mt-2">
              <input
                type="text"
                placeholder="Add condition or Other..."
                value={newCondition}
                onChange={(e) => setNewCondition(e.target.value)}
                className="profile-input flex-1"
              />
              <button
                onClick={handleAddCondition}
                className="profile-btn px-4 py-2"
              >
                Add
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Health Goals */}
      <div className="profile-card">
        <h3 className="text-gray-300 mb-2">Health Goals</h3>
        <p className="text-gray-400 text-sm mb-4">
          Track your progress towards your health objectives
        </p>

        {goals.map((goal, index) => (
          <div key={index} className="mb-3">
            <div className="flex justify-between mb-1">
              <span className="text-sm">{goal.title}</span>
              <span className="text-xs text-gray-400">{goal.progress}%</span>
            </div>
            <div className="goal-bar-bg">
              <div
                className="goal-bar-fill"
                style={{
                  width: `${goal.progress}%`,
                  background:
                    goal.progress > 80
                      ? "#16a34a"
                      : goal.progress > 50
                      ? "#eab308"
                      : "#ef4444",
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
