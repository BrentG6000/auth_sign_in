import AuthUserProvider from './pages/components/contexts/AuthUserProvider';
import App from './App';

const AppWrapper = () => {
  return (
    <AuthUserProvider>
      <App />
    </AuthUserProvider>
  );
};

export default AppWrapper;