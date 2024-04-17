import Routes from "./routers";
import { AuthProvider } from "./contexts/authContext";
import { AudioProvider } from "./contexts/AudioContext";

const App = () => {
  return (
    <AudioProvider>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </AudioProvider>
  );
};

export default App;
