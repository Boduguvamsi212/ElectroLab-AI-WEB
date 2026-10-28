import React, { useState, useEffect } from "react";
import { FaUserCircle, FaIdCard, FaBuilding, FaKey } from "react-icons/fa";
import apiService from "../api/apiService";

function ProfileScreen() {
  const [profile, setProfile] = useState(null);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [institution, setInstitution] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState("");
  const [showKey, setShowKey] = useState(false);

  useEffect(() => {
    async function loadProfile() {
      try {
        const data = await apiService.getProfile();
        setProfile(data);
        setName(data.name || "");
        setRole(data.role || "");
        setInstitution(data.institution || "");
      } catch (err) {
        console.error("Failed to load profile", err);
      } finally {
        setLoading(false);
      }
    }
    loadProfile();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSuccess("");
    try {
      const updated = await apiService.updateProfile({ name, role, institution });
      setProfile(updated);
      setSuccess("Profile successfully updated!");
      window.dispatchEvent(new Event("user-updated"));
      // Reload page to propagate name updates to Navbar
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (err) {
      console.error("Failed to update profile", err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 text-cyan-400">
        <span className="animate-spin text-2xl mr-2">⚛</span> Loading Researcher Profile...
      </div>
    );
  }

  const token = localStorage.getItem("token") || "mock_developer_access_token_jwt_90214";

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top Banner & Profile Header */}
      <div className="glass-panel p-6 flex flex-col sm:flex-row items-center gap-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl -z-10" />

        <FaUserCircle className="text-8xl text-indigo-300" />
        <div className="text-center sm:text-left space-y-1">
          <h3 className="text-2xl font-black text-gradient-cyan-purple">{profile.name}</h3>
          <p className="text-cyan-400 font-medium text-sm">{profile.role}</p>
          <p className="text-xs text-indigo-200/60">{profile.institution} • Lab 4B</p>
        </div>
      </div>

      {success && (
        <div className="bg-green-500/10 border border-green-500/20 text-green-300 text-sm p-4 rounded-xl text-center">
          {success}
        </div>
      )}

      {/* Grid details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Contact & Professional Details */}
        <form onSubmit={handleUpdate} className="glass-panel p-6 space-y-4">
          <h4 className="text-md font-bold text-cyan-400 flex items-center gap-2">
            <FaIdCard /> Edit Credentials
          </h4>
          <div className="space-y-3 text-sm">
            <div>
              <label className="text-xs text-indigo-300 block mb-1">Email Address</label>
              <input
                type="text"
                value={profile.email}
                disabled
                className="w-full bg-black/20 border border-white/5 rounded p-2 text-indigo-300 font-mono"
              />
            </div>
            <div>
              <label className="text-xs text-indigo-300 block mb-1">Researcher Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full bg-[#1b2b62] border border-cyan-400/20 rounded p-2 text-white focus:outline-none focus:border-cyan-400"
              />
            </div>
            <div>
              <label className="text-xs text-indigo-300 block mb-1">Academic Role</label>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
                className="w-full bg-[#1b2b62] border border-cyan-400/20 rounded p-2 text-white focus:outline-none focus:border-cyan-400"
              />
            </div>
            <div>
              <label className="text-xs text-indigo-300 block mb-1">Institution</label>
              <input
                type="text"
                value={institution}
                onChange={(e) => setInstitution(e.target.value)}
                required
                className="w-full bg-[#1b2b62] border border-cyan-400/20 rounded p-2 text-white focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={saving}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded font-bold text-xs transition-all disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Profile Updates"}
          </button>
        </form>

        {/* System Settings Status Info */}
        <div className="glass-panel p-6 space-y-4">
          <h4 className="text-md font-bold text-cyan-400 flex items-center gap-2">
            <FaBuilding /> Institute Authorization Details
          </h4>
          <div className="space-y-4 text-sm">
            <div>
              <span className="text-indigo-300 text-xs block">Subscription License Type</span>
              <span className="font-semibold text-cyan-300 font-mono">CORROSION-PRO-2026-X8</span>
            </div>
            <div>
              <span className="text-indigo-300 text-xs block">Access Authority Rating</span>
              <span className="font-semibold text-purple-400">Level 3 (Workstation Admin)</span>
            </div>
            <div>
              <span className="text-indigo-300 text-xs block">System Expiry Target</span>
              <span className="font-semibold text-white">December 31, 2026</span>
            </div>
          </div>
        </div>
      </div>

      {/* Developer API & Workspace keys */}
      <div className="glass-panel p-6 space-y-4">
        <h4 className="text-md font-bold text-purple-400 flex items-center gap-2">
          <FaKey /> Personal Developer Access Keys
        </h4>
        <p className="text-xs text-indigo-200">
          Use these tokens to access the **ElectroLab AI Web API** for custom python analysis scripts and batch curve integrations.
        </p>
        <div className="flex gap-2">
          <input
            type={showKey ? "text" : "password"}
            value={token}
            disabled
            className="flex-1 bg-black/25 border border-cyan-400/20 rounded p-2 text-xs font-mono text-cyan-300 focus:outline-none"
          />
          <button 
            type="button"
            onClick={() => setShowKey(!showKey)}
            className="px-4 py-2 bg-purple-500/20 border border-purple-500/40 text-purple-300 rounded font-semibold text-xs hover:bg-purple-500/30 transition-all"
          >
            {showKey ? "Hide Key" : "Show Key"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfileScreen;

