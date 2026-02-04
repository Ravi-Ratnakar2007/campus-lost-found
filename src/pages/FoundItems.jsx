import { useEffect, useState } from "react";
import { collection, onSnapshot, query, where, orderBy } from "firebase/firestore";
import { db } from "../firebase";
import ItemCard from "../components/ItemCard";
import { Link } from "react-router-dom";

function FoundItems() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(
      collection(db, "items"),
      where("status", "==", "found"),
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
        <h1>Found Items</h1>
        <p className="subtitle">Items found and reported on campus</p>
      </div>

      {loading ? (
        <p className="empty">Loading found items...</p>
      ) : items.length === 0 ? (
        <div className="empty-state">
          <p>🎉 No found items yet</p>
          <span>Be the first to report a found item</span>
          <Link to="/post" className="empty-cta">
            Report a found item
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

export default FoundItems;
