import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from './ThemeContext';
import Landing from './pages/Landing';
import Home from './Home';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Database from './pages/Database';
import Query from './pages/Query';
import BareActs from './pages/BareActs';
import Download from './pages/Download';
import Team from './pages/Team';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Accessibility from './pages/Accessibility';
import TermsAndConditions from './pages/TermsAndConditions';
function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/home" element={<Landing />} />
            <Route path="/home/settings" element={<Settings />} />
            <Route path="/home/login" element={<Login />} />
            <Route path="/home/database" element={<Database />} />
            <Route path="/home/query" element={<Query />} />
            <Route path="/bareacts" element={<BareActs />} />
            <Route path="/download" element={<Download />} />
            <Route path="/team" element={<Team />} />
            <Route path="/privacypolicy" element={<PrivacyPolicy />} />
            <Route path="/accessibility" element={<Accessibility />} />
            <Route path="/terms" element={<TermsAndConditions />} />
            {/* Add a catch-all route for 404 handling */}
            <Route path="*" element={<div>404 Not Found</div>} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
