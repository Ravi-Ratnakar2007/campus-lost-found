import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

function ItemDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const docRef = doc(db, "items", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setItem({ id: docSnap.id, ...docSnap.data() });
        } else {
          setError("Item not found");
        }
      } catch (err) {
        console.error("Error fetching item:", err);
        setError("Failed to load item");
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  if (loading) {
    return <div className="center">Loading item...</div>;
  }

  if (error) {
    return <div className="center">{error}</div>;
  }

  const {
    name = "Unnamed Item",
    image,
    status = "lost",
    category = "Unknown",
    location = "Unknown",
    description = "No description provided",
    contact = "Not provided",
  } = item || {};

  return (
    <div className="container">
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className="details-card">
        <img
          src={image || "/placeholder.png"}
          alt={name}
          className="details-image"
        />

        <div className="details-content">
          <h1>{name}</h1>

          <span className={`status-badge ${status}`}>
            {status === "lost" ? "LOST" : "FOUND"}
          </span>

          <p><strong>Category:</strong> {category}</p>
          <p><strong>Location:</strong> {location}</p>
          <p><strong>Description:</strong> {description}</p>
          <p><strong>Contact:</strong> {contact}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemDetails;
