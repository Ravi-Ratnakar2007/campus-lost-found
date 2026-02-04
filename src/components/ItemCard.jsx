import { Link } from "react-router-dom";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";

function ItemCard({ item }) {
  if (!item) return null;

  const {
    id,
    name = "Unnamed Item",
    image,
    location = "Unknown location",
    status = "lost",
  } = item;

  const handleDelete = async (e) => {
    e.stopPropagation();

    const confirmDelete = window.confirm("Delete this item?");
    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, "items", id));
    } catch (err) {
      console.error("Delete failed", err);
      alert("Failed to delete item. Try again.");
    }
  };

  return (
    <div className="item-card">
      {/* IMAGE + STATUS */}
      <div className="item-image">
        <img
          src={image || "/placeholder.png"}
          alt={name}
          loading="lazy"
        />

        <span className={`badge ${status}`}>
          {status === "lost" ? "LOST" : "FOUND"}
        </span>
      </div>

      {/* BODY */}
      <div className="item-body">
        <h3 title={name}>{name}</h3>
        <p className="location">📍 {location}</p>
      </div>

      {/* ACTIONS */}
      <div className="card-actions">
        <Link to={`/item/${id}`} className="btn view">
          View
        </Link>

        <Link to={`/edit/${id}`} className="btn edit">
          Edit
        </Link>

        <button onClick={handleDelete} className="btn delete">
          Delete
        </button>
      </div>
    </div>
  );
}

export default ItemCard;
