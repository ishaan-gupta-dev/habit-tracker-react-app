import React from 'react';
import { MyNavbar as Navbar } from './Navbar';
import { NewHabitModal } from './NewHabitModal';
import { Homehabits } from './HomeHabits';
function App() {
  return (
    <div className="App">
      <Navbar />
      <NewHabitModal />
      <Homehabits />
    </div>
  );
}

export default App;
