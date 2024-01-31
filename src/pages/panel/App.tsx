import Nav from "./components/nav/Nav";
import AmbassadorPanel from "./components/ambassadorPanel/AmbassadorPanel";

import "./App.scss";
import { useState } from "react";
import WelcomeCard from "./components/welcomeCard/WelcomeCard";

function App() {
  const [shouldShowWelcomeCard, setShouldShowWelcomeCard] =
    useState<boolean>(false);

  return (
    <div className="App">
      <Nav onShowWelcomeCardClicked={() => setShouldShowWelcomeCard(true)} />
      <AmbassadorPanel />
      {shouldShowWelcomeCard && (
        <WelcomeCard onClose={() => setShouldShowWelcomeCard(false)} />
      )}
    </div>
  );
}

export default App;
