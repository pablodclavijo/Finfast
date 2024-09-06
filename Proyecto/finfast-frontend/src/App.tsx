import React from 'react';
import logo from './logo.svg';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import './App.css';
import PersonasPagina from './Components/PersonaTabla/PersonasPagina';

const queryClient = new QueryClient()

function App() {
  return (
    <div className="App">
    <QueryClientProvider client={queryClient} contextSharing = {true}>
      <PersonasPagina/>
    </QueryClientProvider>
    </div>

  );
}

export default App;
