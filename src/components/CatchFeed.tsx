import React from 'react';
import { CatchCard } from './CatchCard';
import { useCatchStore } from '../store/useCatchStore';
import type { User } from '../types/catch';

interface CatchFeedProps {
  currentUser: User;
}

export function CatchFeed({ currentUser }: CatchFeedProps) {
  const { catches, toggleLike, addComment } = useCatchStore();

  return (
    <div className="max-w-2xl mx-auto space-y-6 py-6">
      {catches.map((catch_) => (
        <CatchCard
          key={catch_.id}
          catch_={catch_}
          currentUser={currentUser}
          onLike={() => toggleLike(catch_.id, currentUser.id)}
          onComment={(text) =>
            addComment(catch_.id, { userId: currentUser.id, text })
          }
          onShare={() => {
            // TODO: Implement share functionality
            console.log('Share catch:', catch_.id);
          }}
          onEdit={() => {
            // TODO: Implement edit functionality
            console.log('Edit catch:', catch_.id);
          }}
          onDelete={() => {
            // TODO: Implement delete functionality
            console.log('Delete catch:', catch_.id);
          }}
        />
      ))}
    </div>
  );
}