import { useEffect, useState } from "react";
import "./Card.css";
import db from "../../store/firesbase.service";

const Card = ({ employee }) => {
  const [userData, setUserData] = useState([]);
  const [newReview, setNewReview] = useState("");
  const [error, setError] = useState(null);
  const [user, setUser] = useState(false);
  const [editReview, setEditReview] = useState(null);

  useEffect(() => {
    const fetchLoginData = async () => {
      try {
        const snapshot = await db.collection("login").get();
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUserData(data);
      } catch (error) {
        console.error("Error fetching data: ", error);
        setError("Error fetching data: " + error.message);
      }
    };
    setUser(localStorage.getItem("userEmail") !== "admin@gmail.com");
    fetchLoginData();
  }, []);

  const handleAddReview = async (id) => {
    try {
      if (!newReview.trim()) {
        setError("Review cannot be blank");
        return;
      }
      const snapshot = await db
        .collection("login")
        .where("email", "==", id)
        .get();

      if (!snapshot.empty) {
        const companyDoc = snapshot.docs[0];
        const companyRef = db.collection("login").doc(companyDoc.id);
        const companyData = companyDoc.data();

        let newHistory = companyData.reviews || [];
        newHistory.push(newReview);

        await companyRef.set({ reviews: newHistory }, { merge: true });
        window.location.reload();

        setNewReview(""); // Clear input field after adding review
      } else {
        setError("No document found with the specified email.");
      }
    } catch (error) {
      setError("Error updating review: " + error.message);
    }
  };

  const handleDeleteReview = async (id, reviewToDelete) => {
    try {
      const snapshot = await db
        .collection("login")
        .where("email", "==", id)
        .get();

      if (!snapshot.empty) {
        const companyDoc = snapshot.docs[0];
        const companyRef = db.collection("login").doc(companyDoc.id);
        let companyData = companyDoc.data().reviews || [];
        companyData = companyData.filter((review) => review !== reviewToDelete);

        await companyRef.set({ reviews: companyData }, { merge: true });
        window.location.reload();
      }
    } catch (error) {
      setError("Error deleting review: " + error.message);
    }
  };
  // const handleEditReview = async (id, reviewToEdit) => {
  //   try {
  //     const snapshot = await db
  //       .collection("login")
  //       .where("email", "==", id)
  //       .get();

  //     if (!snapshot.empty) {
  //       const companyDoc = snapshot.docs[0];
  //       const companyRef = db.collection("login").doc(companyDoc.id);
  //       let companyData = companyDoc.data().reviews || [];

  //       // Find the index of the review to edit
  //       const index = companyData.findIndex(
  //         (review) => review === reviewToEdit
  //       );

  //       if (index !== -1) {
  //         // Set edit mode for this review
  //         setEditReview({ index, review: reviewToEdit });
  //       } else {
  //         setError("Review not found for editing.");
  //       }
  //     } else {
  //       setError("No document found with the specified email.");
  //     }
  //   } catch (error) {
  //     setError("Error editing review: " + error.message);
  //   }
  // };
  return (
    <div className="employee-card">
      <div className="employee-avatar">
        <img
          src="https://media.licdn.com/dms/image/D4E03AQFuJudYH0sz6g/profile-displayphoto-shrink_400_400/0/1696803675263?e=2147483647&v=beta&t=V2BUfLYIztWSzucBDGYQEMH4yRIxzpFB8fDyEQiYDeE"
          alt={employee.name}
          className="image-icon"
        />
        <div>⭐⭐⭐</div>
      </div>
      <div className="employee-info">
        <h2>{employee.name}</h2>
        <div className="review-feedback">
          <h3>Performance Review</h3>
          <div>
            {employee.reviews &&
              employee.reviews.map((review, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    margin: "3px",
                  }}
                >
                  <p>{review}</p>
                  {!user && (
                    <div>
                      <button
                        onClick={() => handleEditReview(employee.email, review)}
                        className="btn-edit"
                      >
                        🖊️
                      </button>
                      <button
                        onClick={() =>
                          handleDeleteReview(employee.email, review)
                        }
                        className="btn-delete"
                      >
                        🗑️
                      </button>
                    </div>
                  )}
                </div>
              ))}
          </div>
          <h3>Feedback</h3>
          <p>{employee.feedback}</p>
          <div className="input-review-fields">
            {!user && (
              <input
                className="input-review"
                type="text"
                value={newReview}
                onChange={(e) => setNewReview(e.target.value)}
                placeholder="Add review"
              />
            )}

            {!user && (
              <button
                className="btn-review"
                onClick={() => handleAddReview(employee.email)}
              >
                Add Review
              </button>
            )}
          </div>
          <span style={{ color: "red" }}>{error}</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
