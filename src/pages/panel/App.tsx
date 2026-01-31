import { AmbassadorsProvider } from "../../hooks/useAmbassadors";

import Ambassadors from "./components/Ambassadors";
import Nav from "./components/Nav";

function App() {
  return (
    <AmbassadorsProvider>
      <div className="relative h-full w-full">
        <Nav />
        <Ambassadors />
      </div>
    </AmbassadorsProvider>
  );
}

export default App;
