import React from 'react';
import { format } from 'date-fns';
import { Heart, MessageCircle, Share2, MoreVertical, MapPin, Ruler, Scale, Fish } from 'lucide-react';
import type { Catch, User } from '../types/catch';

interface CatchCardProps {
  catch_: Catch;
  currentUser: User;
  onLike: () => void;
  onComment: (text: string) => void;
  onShare: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export function CatchCard({
  catch_,
  currentUser,
  onLike,
  onComment,
  onShare,
  onEdit,
  onDelete,
}: CatchCardProps) {
  const [isLiked, setIsLiked] = React.useState(catch_.likes.includes(currentUser.id));
  const [showComments, setShowComments] = React.useState(false);
  const [newComment, setNewComment] = React.useState('');

  const handleLike = () => {
    setIsLiked(!isLiked);
    onLike();
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      onComment(newComment);
      setNewComment('');
    }
  };

  const formatMethod = (method: Catch['method']) => {
    const formattedType = method.type.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
    return method.lure ? `${formattedType} - ${method.lure}` : formattedType;
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative">
        <img
          src={catch_.imageUrl}
          alt={`${catch_.species} catch`}
          className="w-full h-64 object-cover"
        />
        <div className="absolute top-4 right-4">
          <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100">
            <MoreVertical className="h-5 w-5 text-gray-600" />
          </button>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{catch_.species}</h3>
            <div className="flex items-center text-sm text-gray-500">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{catch_.location.name}</span>
            </div>
          </div>
          <div className="text-sm text-gray-500">
            {format(new Date(catch_.date), 'MMM d, yyyy')}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="flex items-center text-gray-700">
            <Scale className="h-4 w-4 mr-1" />
            <span>{catch_.size.value} {catch_.size.unit}</span>
          </div>
          <div className="flex items-center text-gray-700">
            <Ruler className="h-4 w-4 mr-1" />
            <span>{catch_.length.value} {catch_.length.unit}</span>
          </div>
          <div className="flex items-center text-gray-700">
            <Fish className="h-4 w-4 mr-1" />
            <span>{formatMethod(catch_.method)}</span>
          </div>
        </div>

        <p className="text-gray-700 mb-4">{catch_.description}</p>

        <div className="flex items-center justify-between mb-4">
          <div className="flex space-x-4">
            <button
              onClick={handleLike}
              className={`flex items-center space-x-1 ${
                isLiked ? 'text-red-500' : 'text-gray-500'
              }`}
            >
              <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
              <span>{catch_.likes.length}</span>
            </button>
            <button
              onClick={() => setShowComments(!showComments)}
              className="flex items-center space-x-1 text-gray-500"
            >
              <MessageCircle className="h-5 w-5" />
              <span>{catch_.comments.length}</span>
            </button>
            <button
              onClick={onShare}
              className="flex items-center space-x-1 text-gray-500"
            >
              <Share2 className="h-5 w-5" />
            </button>
          </div>
        </div>

        {showComments && (
          <div className="border-t pt-4">
            <div className="space-y-4 mb-4">
              {catch_.comments.map((comment) => (
                <div key={comment.id} className="flex space-x-2">
                  <div className="flex-1 bg-gray-50 rounded-lg p-3">
                    <p className="text-sm text-gray-900">{comment.text}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {format(new Date(comment.createdAt), 'MMM d, yyyy')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <form onSubmit={handleCommentSubmit} className="flex space-x-2">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                className="flex-1 rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Post
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}