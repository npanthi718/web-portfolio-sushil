import React, { Suspense, lazy } from 'react';
import Layout from './components/Layout/Layout';
import './styles/global.css';

const Home = lazy(() => import('./pages/Home/Home'));

function App() {
    return (
        <Layout>
            <Suspense fallback={<div className="appLoading">Loading portfolio...</div>}>
                <Home />
            </Suspense>
        </Layout>
    );
}

export default App;
