import { useEffect, useRef } from 'react';
import markup from './assets/marvatel-markup.html?raw';
import { initMarvatelUI } from './legacy-ui';
import './styles.css';

/**
 * Komponen React utama.
 * Markup prototipe dipasang ke root React, lalu interaksi UI diinisialisasi
 * setelah elemen tersedia di DOM. Bagian API backend dipisahkan di services/api.js.
 */
export default function App() {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    initMarvatelUI();
  }, []);

  return <main className="react-app" dangerouslySetInnerHTML={{ __html: markup }} />;
}
