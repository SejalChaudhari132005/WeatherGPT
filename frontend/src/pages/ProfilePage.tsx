import React, { useEffect, useState } from 'react';
import { LogOut, MapPin, Save, UserRound } from 'lucide-react';
import { useAuthContext } from '../context/AuthContext';
import { profileService } from '../services/profileService';
import { supabase } from '../lib/supabase';
import { UserProfile, UserRole } from '../types/user';

const ROLE_LABELS: Record<UserRole, string> = {
  citizen: 'Citizen',
  farmer: 'Farmer',
  fisherman: 'Fisherman',
  disaster_manager: 'Disaster Manager',
  aviation: 'Aviation',
  urban_planner: 'Urban Planner',
  researcher: 'Researcher',
  journalist: 'Journalist',
  transport: 'Transport',
  other: 'Other',
};

const displayValue = (value: string | number | undefined | null, fallback = 'Not set') =>
  value === undefined || value === null || value === '' ? fallback : String(value);

export const ProfilePage: React.FC = () => {
  const { userProfile, userId, handleSignOut, setErrorMessage } = useAuthContext();
  const [profile, setProfile] = useState<UserProfile | null>(userProfile);
  const [authEmail, setAuthEmail] = useState('');
  const [metadataName, setMetadataName] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState('');
  const [language, setLanguage] = useState('en');
  const [role, setRole] = useState<UserRole>('citizen');
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  useEffect(() => {
    const loadUserMetadata = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error || !data.user) return;

      const metadata = data.user.user_metadata || {};
      setAuthEmail(data.user.email || '');
      setMetadataName(metadata.full_name || metadata.name || '');
      setAvatarUrl(metadata.avatar_url || metadata.picture || '');
    };

    void loadUserMetadata();
  }, []);

  useEffect(() => {
    setProfile(userProfile);
    setUsername(userProfile?.username || '');
    setLanguage(userProfile?.preferred_language || 'en');
    setRole(userProfile?.role || 'citizen');
  }, [userProfile]);

  const handleSave = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!profile || !userId) return;

    setIsSaving(true);
    setSaveMessage('');
    try {
      const updated = await profileService.upsertProfile({
        ...profile,
        user_id: userId,
        username: username.trim(),
        preferred_language: language,
        role,
      });
      setProfile(updated);
      setUsername(updated.username);
      setLanguage(updated.preferred_language);
      setRole(updated.role);
      setIsEditing(false);
      setSaveMessage('Profile saved.');
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Unable to save your profile.');
    } finally {
      setIsSaving(false);
    }
  };

  const displayName = metadataName || profile?.username || 'WeatherGPT User';
  const initials = displayName
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="min-h-full bg-[#F4F7FC] p-4 sm:p-6 font-['Arimo']">
      <div className="space-y-5 pb-8">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Profile</h1>
          <p className="text-xs text-slate-500 mt-1 font-medium">Your WeatherGPT account and saved location</p>
        </div>

        <section className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-md flex items-center gap-4">
          {avatarUrl ? (
            <img src={avatarUrl} alt="Profile" className="w-16 h-16 rounded-2xl object-cover border border-slate-200" />
          ) : (
            <div className="w-16 h-16 rounded-2xl bg-sky-100 text-[#004aad] flex items-center justify-center text-lg font-black">
              {initials || <UserRound className="w-7 h-7" />}
            </div>
          )}
          <div className="min-w-0">
            <h2 className="text-lg font-black text-slate-900 truncate">{displayName}</h2>
            <p className="text-sm text-slate-500 truncate">{displayValue(authEmail)}</p>
          </div>
        </section>

        <form onSubmit={handleSave} className="space-y-5">
          <section className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-md space-y-4">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">Personal Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <ProfileField label="Name" value={displayName} />
              <ProfileField label="Email" value={authEmail} />
              {isEditing ? (
                <label className="space-y-1.5">
                  <span className="text-[11px] font-bold text-slate-500 uppercase">Username</span>
                  <input value={username} onChange={(event) => setUsername(event.target.value)} className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500" />
                </label>
              ) : (
                <ProfileField label="Username" value={profile?.username} />
              )}
              {isEditing ? (
                <label className="space-y-1.5">
                  <span className="text-[11px] font-bold text-slate-500 uppercase">Role</span>
                  <select value={role} onChange={(event) => setRole(event.target.value as UserRole)} className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500">
                    {Object.entries(ROLE_LABELS).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
                  </select>
                </label>
              ) : (
                <ProfileField label="Role" value={ROLE_LABELS[profile?.role || 'citizen']} />
              )}
            </div>
          </section>

          <section className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-md space-y-4">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">Preferences</h3>
            {isEditing ? (
              <label className="space-y-1.5 block max-w-sm">
                <span className="text-[11px] font-bold text-slate-500 uppercase">Language</span>
                <select value={language} onChange={(event) => setLanguage(event.target.value)} className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500">
                  <option value="en">English</option>
                  <option value="hi">Hindi</option>
                  <option value="mr">Marathi</option>
                </select>
              </label>
            ) : <ProfileField label="Language" value={profile?.preferred_language === 'hi' ? 'Hindi' : profile?.preferred_language === 'mr' ? 'Marathi' : 'English'} />}
          </section>

          <section className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-md space-y-4">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2"><MapPin className="w-4 h-4 text-sky-600" /> Location</h3>
            {profile?.city || profile?.latitude !== undefined ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <ProfileField label="City" value={profile?.city} />
                <ProfileField label="District" value={profile?.district} />
                <ProfileField label="State" value={profile?.state} />
                <ProfileField label="Country" value={profile?.country} />
                <ProfileField label="Latitude" value={profile?.latitude} />
                <ProfileField label="Longitude" value={profile?.longitude} />
                <ProfileField label="Location Source" value={profile?.location_source?.toUpperCase()} />
              </div>
            ) : <p className="text-sm font-bold text-slate-500">Location not set</p>}
          </section>

          {saveMessage && <p className="text-sm font-bold text-emerald-700 text-center">{saveMessage}</p>}
          <div className="space-y-3">
            {isEditing ? (
              <button type="submit" disabled={isSaving} className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#38b6ff] to-[#004aad] text-white font-extrabold shadow-lg shadow-blue-900/20 flex items-center justify-center gap-2 disabled:opacity-60">
                <Save className="w-4 h-4" /> {isSaving ? 'Saving...' : 'Save Profile'}
              </button>
            ) : (
              <button type="button" onClick={() => setIsEditing(true)} className="w-full py-3.5 rounded-2xl bg-[#004aad] text-white font-extrabold shadow-lg shadow-blue-900/20">Edit Profile</button>
            )}
            <button type="button" onClick={() => void handleSignOut()} className="w-full py-3.5 rounded-2xl bg-white border border-rose-200 text-rose-700 font-extrabold flex items-center justify-center gap-2"><LogOut className="w-4 h-4" /> Logout</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const ProfileField: React.FC<{ label: string; value: string | number | undefined | null }> = ({ label, value }) => (
  <div className="min-w-0 space-y-1.5">
    <div className="text-[11px] font-bold text-slate-500 uppercase">{label}</div>
    <div className="text-sm font-bold text-slate-800 break-words">{displayValue(value)}</div>
  </div>
);
