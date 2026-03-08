import "./Settings.css";

export default function Settings() {
    return (
        <div className="settings-page">

            {/* Header */}
            <div className="settings-header">
                <h1>Settings</h1>
                <p>Manage your account and preferences</p>
            </div>

            {/* Profile Section */}
            <div className="settings-card">
                <h2>Profile</h2>
                <form className="settings-form">

                    <div className="form-group">
                        <label>Profile Picture</label>
                        <div className="avatar-upload">
                            <img src="https://via.placeholder.com/80" alt="Avatar" className="avatar"/>
                            <input type="file"/>
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Name</label>
                        <input type="text" placeholder="John Doe"/>
                    </div>

                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" placeholder="john@email.com"/>
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" placeholder="••••••••"/>
                    </div>

                    <button className="save-btn">Save Changes</button>
                </form>
            </div>

            {/* Notifications Section */}
            <div className="settings-card">
                <h2>Notifications</h2>
                <div className="form-group toggle">
                    <label>Email Notifications</label>
                    <input type="checkbox"/>
                </div>
                <div className="form-group toggle">
                    <label>Push Notifications</label>
                    <input type="checkbox"/>
                </div>
                <div className="form-group toggle">
                    <label>SMS Notifications</label>
                    <input type="checkbox"/>
                </div>
            </div>

            {/* Account Section */}
            <div className="settings-card">
                <h2>Account</h2>
                <button className="danger-btn">Delete Account</button>
            </div>

        </div>
    );
}