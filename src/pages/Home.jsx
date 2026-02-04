import { useEffect, useState } from "react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "../firebase";
import ItemCard from "../components/ItemCard";
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [category, setCategory] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(
      collection(db, "items"),
      orderBy("createdAt", "desc") 
    );

    const unsub = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setItems(data);
      setLoading(false);
    });

    return () => unsub();
  }, []);

  const filteredItems = items.filter((item) => {
    const name = (item.name || "").toLowerCase();
    const searchValue = (search || "").toLowerCase();

    const matchesSearch = name.includes(searchValue);
    const matchesStatus = status === "all" || item.status === status;
    const matchesCategory =
      category === "all" || item.category === category;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  return (
    <div className="home">
      {/* HERO / TITLE SECTION */}
      <div className="home-header">
        <div className="home-title">
          <h1>Campus Lost & Found</h1>
          <p className="subtitle">
            Report any lost or found item across campus
          </p>
        </div>

        <div className="home-actions">
          <Link to="/post" className="report-btn">
            + Report an Item
          </Link>
        </div>
      </div>



      <div className="filters">
        <input
          placeholder="Search items..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="all">All Categories</option>
          <option value="Electronics">Electronics</option>
          <option value="Accessories">Accessories</option>
          <option value="Documents">Documents</option>
          <option value="Books">Books</option>
        </select>

        <div className="status-toggle">
          <button onClick={() => setStatus("all")}>All</button>
          <button onClick={() => setStatus("lost")}>Lost</button>
          <button onClick={() => setStatus("found")}>Found</button>
        </div>
      </div>

      <div className="grid">
        {loading ? (
          <p>Loading...</p>
        ) : filteredItems.length === 0 ? (
          <p>No items found</p>
        ) : (
          filteredItems.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))
        )}
      </div>

      <Link to="/post" className="fab">➕ Post Item</Link>
    </div>
  );
}

export default Home;
