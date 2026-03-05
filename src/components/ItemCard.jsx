import { Link } from "react-router-dom";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useState } from "react";

import electronicsImg from "../assets/electronics.png";
import accessoriesImg from "../assets/accessories.png";
import documentsImg from "../assets/documents.png";
import keysImg from "../assets/keys.png";
import defaultImg from "../assets/default.png";

const categoryImages = {
  Electronics: electronicsImg,
  Accessories: accessoriesImg,
  Documents: documentsImg,
  Keys: keysImg
};

function ItemCard({ item }) {
  const [showModal, setShowModal] = useState(false);

  if (!item) return null;

  const {
    id,
    name = "Unnamed Item",
    category,
    location = "Unknown location",
    status = "lost"
  } = item;

  const imageSrc = categoryImages[category] || defaultImg;

  const confirmDelete = async () => {
    try {
      await deleteDoc(doc(db, "items", id));
      setShowModal(false);
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  return (
    <>
      <div className="item-card">
        <div className="item-image">
          <img src={imageSrc} alt={name} />

          <span className={`badge ${status}`}>
            {status === "lost" ? "LOST" : "FOUND"}
          </span>
        </div>

        <div className="item-body">
          <h3>{name}</h3>
          <p className="location">📍 {location}</p>
          <p className="category">{category}</p>
        </div>

        <div className="card-actions">
          <Link to={`/item/${id}`} className="btn view">
            View
          </Link>

          <Link to={`/edit/${id}`} className="btn edit">
            Edit
          </Link>

          <button
            onClick={() => setShowModal(true)}
            className="btn delete"
          >
            Delete
          </button>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Delete Item?</h3>
            <p>This action cannot be undone.</p>

            <div className="modal-actions">
              <button onClick={() => setShowModal(false)}>
                Cancel
              </button>

              <button onClick={confirmDelete} className="danger">
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ItemCard;