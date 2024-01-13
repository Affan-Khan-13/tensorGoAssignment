import Layout from './components/layout';
import Main from './components/main';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './components/login';
import Profile from './components/profile';
import Billing from './components/billing';
import Invoices from './components/invoices';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={
            <Layout>
              <Main />
            </Layout>
          } />
          <Route path="/billing" element={
            <Layout>
              <Billing />
            </Layout>
          } />
          <Route path="/invoices" element={
            <Layout>
              <Invoices />
            </Layout>
          } />
          <Route path="/profile" element={
            <Layout>
              <Profile />
            </Layout>
          } />
          <Route path="/login" element={
              <Login/>
          } />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
