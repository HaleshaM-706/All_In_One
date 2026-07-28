import { AppLayout } from './layouts/AppLayout';
import { HomePage } from './pages/HomePage';
import { PremiumProvider } from './context/PremiumContext';
import { AdProvider } from './ads/provider/AdProvider';
import { AnalyticsProvider } from './analytics/AnalyticsProvider';
import './App.css';

function App() {
  return (
    <PremiumProvider>
      <AdProvider>
        <AnalyticsProvider>
          <AppLayout>
            <HomePage />
          </AppLayout>
        </AnalyticsProvider>
      </AdProvider>
    </PremiumProvider>
  );
}

export default App;
