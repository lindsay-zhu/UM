import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/game.css';
import './styles/scenes.css';
import './styles/refinements.css';

const root = document.getElementById('root');
if (!root) throw new Error('React mount root #root was not found');
createRoot(root).render(<App />);
