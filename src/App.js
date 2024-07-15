
import './App.css';

import { CryptoContextProvider } from './context/ctypto-context';
import AppLoyout from './components/layout/AppLayout';


export default function App() {
  return (
    <CryptoContextProvider>
      <AppLoyout />
    </CryptoContextProvider>
  );
}


