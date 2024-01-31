import Nav from "./components/nav/Nav";
import AmbassadorPanel from "./components/ambassadorPanel/AmbassadorPanel";

import "./App.scss";
import { useState } from "react";
import WelcomeCardOverlay from "./components/welcomeCardOverlay/WelcomeCardOverlay";

function App() {
  const [shouldShowWelcomeCardOverlay, setShouldShowWelcomeCardOverlay] =
    useState<boolean>(false);

  return (
    <div className="App">
      <Nav
        onShowWelcomeCardClicked={() => setShouldShowWelcomeCardOverlay(true)}
      />
      <AmbassadorPanel />
      {shouldShowWelcomeCardOverlay && (
        <WelcomeCardOverlay
          onClose={() => setShouldShowWelcomeCardOverlay(false)}
        />
      )}
    </div>
  );
}

export default App;
