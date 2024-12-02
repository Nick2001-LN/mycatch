import React from 'react';
import { Header } from './components/Header';
import { CatchFeed } from './components/CatchFeed';
import { AddEditCatchModal } from './components/AddEditCatchModal';
import { useCatchStore } from './store/useCatchStore';

// Mock current user for demo purposes
const currentUser = {
  id: '1',
  username: 'john_doe',
  profilePicture: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
};

function App() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const { fetchCatches, addCatch } = useCatchStore();

  React.useEffect(() => {
    fetchCatches();
  }, [fetchCatches]);

  const handleAddCatch = async (data: any) => {
    await addCatch({
      ...data,
      userId: currentUser.id,
      likes: [],
      comments: [],
    });
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header onAddClick={() => setIsModalOpen(true)} />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8">
        <CatchFeed currentUser={currentUser} />
      </main>
      <AddEditCatchModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddCatch}
      />
    </div>
  );
}

export default App;