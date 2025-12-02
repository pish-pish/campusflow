import React from 'react';
import { Router, Route, Switch, useLocation } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { ThemeProvider } from '../context/ThemeContext';
import DashboardPage from '../components/DashboardPage';
import EventCard from '../components/EventCard';
import NotFoundPage from '../components/NotFoundPage';
import Header from '../components/Header';

export const history = createBrowserHistory();

// Page transition wrapper component
const PageWrapper = ({ children }) => {
  const location = useLocation();
  
  return (
    <div className="page-transition page-transition--enter" key={location.pathname}>
      {children}
    </div>
  );
};

// Main content with transitions
const AppContent = () => {
  const location = useLocation();
  
  return (
    <>
      <Header />
      <main className="main-content">
        <PageWrapper>
          <Switch location={location}>
            <Route path="/" component={DashboardPage} exact={true} />
            <Route path="/dashboard" component={DashboardPage} />
            <Route path="/event/:id" component={EventCard} />
            <Route component={NotFoundPage} />
          </Switch>
        </PageWrapper>
      </main>
    </>
  );
};

const AppRouter = () => (
  <ThemeProvider>
    <Router history={history}>
      <AppContent />
    </Router>
  </ThemeProvider>
);

export default AppRouter;
