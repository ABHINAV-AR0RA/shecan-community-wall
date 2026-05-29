import { useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { likeMessage } from '../api/messages';

function timeAgo(dateString) {
  const now = new Date();
  const date = new Date(dateString);
  const seconds = Math.floor((now - date) / 1000);

  if (seconds < 10) return 'Just now';
  if (seconds < 60) return `${seconds}s ago`;

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;

  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;

  const weeks = Math.floor(days / 7);
  if (weeks < 5) return `${weeks}w ago`;

  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo ago`;

  return `${Math.floor(months / 12)}y ago`;
}

function getAvatarColor(name) {
  const colors = [
    '#FF5A36', '#E5482A', '#FF7A5E', '#050A30',
    '#0B1456', '#101C6E', '#6366F1', '#8B5CF6',
    '#EC4899', '#F43F5E', '#14B8A6', '#059669',
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
}

function getInitials(name) {
  return name
    .split(' ')
    .filter(Boolean)
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

export default function MessageCard({ message }) {
  const [likes, setLikes] = useState(message.likes || 0);
  const [liked, setLiked] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleLike = async () => {
    // Optimistic update
    setLiked(!liked);
    setLikes((prev) => (liked ? prev - 1 : prev + 1));
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);

    try {
      const data = await likeMessage(message._id);
      if (data && typeof data.likes === 'number') {
        setLikes(data.likes);
      }
    } catch (err) {
      // Revert on error
      setLiked(liked);
      setLikes(message.likes || 0);
    }
  };

  const avatarColor = getAvatarColor(message.name || 'A');
  const initials = getInitials(message.name || 'Anonymous');

  return (
    <div className="group bg-white rounded-2xl p-6 card-shadow hover:card-shadow-hover border border-soft-peach/20 hover:border-coral/10 transition-all duration-500 hover:-translate-y-1">
      {/* Header: avatar + name + time */}
      <div className="flex items-start gap-3.5 mb-4">
        <div
          className="w-11 h-11 rounded-full flex items-center justify-center shrink-0 text-white font-body font-bold text-sm shadow-sm"
          style={{ backgroundColor: avatarColor }}
        >
          {initials}
        </div>
        <div className="min-w-0 flex-1">
          <h4 className="font-body font-semibold text-navy text-sm truncate">
            {message.name || 'Anonymous'}
          </h4>
          <p className="text-navy/40 font-body text-xs mt-0.5">
            {timeAgo(message.createdAt || new Date().toISOString())}
          </p>
        </div>
      </div>

      {/* Message body */}
      <p className="text-navy/70 font-body text-sm leading-relaxed mb-5">
        {message.message}
      </p>

      {/* Footer: like button */}
      <div className="flex items-center justify-between pt-3 border-t border-soft-peach/30">
        <button
          onClick={handleLike}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all duration-300 ${
            liked
              ? 'text-coral bg-coral/5'
              : 'text-navy/30 hover:text-coral hover:bg-coral/5'
          }`}
        >
          <span
            className={`transition-transform duration-300 ${
              isAnimating ? 'scale-125' : 'scale-100'
            }`}
            style={isAnimating ? { animation: 'heart-beat 0.3s ease-in-out' } : {}}
          >
            {liked ? <FaHeart size={14} /> : <FaRegHeart size={14} />}
          </span>
          <span className="text-xs font-body font-medium">{likes}</span>
        </button>
        <span className="text-navy/20 text-xs font-body">❤️ Spread the love</span>
      </div>
    </div>
  );
}
