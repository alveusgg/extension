import { useState } from "react";

import alveus from "../../../assets/alveus.png";

import IconInfo from "../../../components/icons/IconInfo";
import Welcome from "../../../components/Welcome";

import Overlay from "./Overlay";

export default function Nav() {
  const [showWelcome, setShowWelcome] = useState<boolean>(false);

  return (
    <nav className="fixed inset-x-0 top-0 z-10 flex h-12 w-full items-center justify-start gap-3 bg-alveus-green/85 px-4 shadow-lg backdrop-blur-sm sm:justify-center">
      <img className="h-8 w-auto" src={alveus} alt="Alveus Logo" />
      <h1 className="text-lg">Alveus Ambassadors</h1>
      <button
        className="group -mr-2 ml-auto rounded-full p-2 sm:absolute sm:right-4 sm:ml-0"
        onClick={() => setShowWelcome(true)}
        title="Info"
      >
        <IconInfo
          size={20}
          className="rounded-full outline-highlight transition-[outline] group-hover:outline"
        />
      </button>

      <Overlay show={showWelcome} onClose={() => setShowWelcome(false)}>
        <Welcome />
      </Overlay>
    </nav>
  );
}
