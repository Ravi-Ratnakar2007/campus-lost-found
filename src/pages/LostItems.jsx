import { useEffect, useState } from "react";
import { collection, onSnapshot, query, where, orderBy } from "firebase/firestore";
import { db } from "../firebase";
import ItemCard from "../components/ItemCard";
import { Link } from "react-router-dom";

function LostItems() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(
      collection(db, "items"),
      where("status", "==", "lost"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setItems(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="container">
      <div className="page-header">
        <h1>Lost Items</h1>
        <p className="subtitle">Items reported as lost on campus</p>
      </div>

      {loading ? (
        <p className="empty">Loading lost items...</p>
      ) : items.length === 0 ? (
        <div className="empty-state">
          <p>🔍 No lost items</p>
          <span>Looks like no one has reported a loss yet</span>
          <Link to="/post" className="empty-cta">
            Report a lost item
          </Link>
        </div>
      ) : (
        <div className="grid">
          {items.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}

export default LostItems;
