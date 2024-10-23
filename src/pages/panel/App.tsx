import { useState } from "react";

import Nav from "./components/nav/Nav";
import AmbassadorPanel from "./components/ambassadorPanel/AmbassadorPanel";
import WelcomeCardOverlay from "./components/welcomeCardOverlay/WelcomeCardOverlay";

function App() {
  const [showWelcome, setShowWelcome] = useState<boolean>(false);

  return (
    <div className="relative h-full w-full">
      <Nav onWelcomeClick={() => setShowWelcome(true)} />
      <AmbassadorPanel />
      {showWelcome && (
        <WelcomeCardOverlay onClose={() => setShowWelcome(false)} />
      )}
    </div>
  );
}

export default App;
