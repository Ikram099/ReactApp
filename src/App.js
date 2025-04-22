import React, { useEffect, useState } from 'react';
import { getProductSpecifications } from './servicenow';

function App() {
  const [specs, setSpecs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProductSpecifications();
        setSpecs(data || []);
      } catch (err) {
        console.error("Erreur lors du chargement:", err);
        setError("Une erreur s'est produite");
      } finally {
        setLoading(false);
      }
    };

    // Appel initial
    fetchData();

    // ⏱ Rafraîchir toutes les 5 secondes
    const interval = setInterval(fetchData, 5000);

    // Nettoyage du setInterval si le composant est démonté
    return () => clearInterval(interval);
  }, []);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur: {error}</p>;
  if (!specs || specs.length === 0) return <p>Aucune specification publiée</p>;

  return (
    <div>
      <h1>Product Specifications </h1>
      <ul>
        {specs.map((spec) => (
          <li key={spec.sys_id}>
            {spec.name} - {spec.display_name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
