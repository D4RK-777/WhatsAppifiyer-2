import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/layout/Layout';
import Home from './components/pages/Home';
import About from './components/pages/About';

function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </Layout>
        </Router>
      </AppProvider>
    </AuthProvider>
  );
}

export default App;
