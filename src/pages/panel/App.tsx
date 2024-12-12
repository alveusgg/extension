import { AmbassadorsProvider } from "../../hooks/useAmbassadors";

import Nav from "./components/Nav";
import Ambassadors from "./components/Ambassadors";

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
