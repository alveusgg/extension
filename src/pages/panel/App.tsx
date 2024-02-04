import { useState } from "react";

import Nav from "./components/nav/Nav";
import AmbassadorPanel from "./components/ambassadorPanel/AmbassadorPanel";
import WelcomeCardOverlay from "./components/welcomeCardOverlay/WelcomeCardOverlay";

import "./App.scss";

function App() {
  const [showWelcome, setShowWelcome] = useState<boolean>(false);

  return (
    <div className="App">
      <Nav onWelcomeClick={() => setShowWelcome(true)} />
      <AmbassadorPanel />
      {showWelcome && (
        <WelcomeCardOverlay onClose={() => setShowWelcome(false)} />
      )}
    </div>
  );
}

export default App;
