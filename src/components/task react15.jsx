import  { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; 

function App() {
  const [data, setData] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 
  const [expanded, setExpanded] = useState({}); 

  
  const fetchData = () => {
    setLoading(true);
    setError(null);

    fetch("https://jsonplaceholder.typicode.com/photos?_limit=6") 
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData(); 
  }, []);

  const handleDelete = (id) => {
    const filteredData = data.filter((item) => item.id !== id);
    setData(filteredData);
  };

  const toggleReadMore = (id) => {
    setExpanded((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  if (loading)
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="alert alert-danger text-center mt-5">
        Error: {error}
      </div>
    );

  return (
    <div className="container mt-5">
    
      <header className="text-center mb-4">
        <h1 className="fw-bold text-dark">Our Tours</h1>
      </header>

      <div className="row justify-content-center">
        {data.length === 0 ? (
          
          <div className="text-center mt-4">
            <button onClick={fetchData} className="btn btn-primary">
              Refresh
            </button>
          </div>
        ) : (
          data.map((item) => (
            <div key={item.id} className="col-md-4 mb-4 d-flex">
              <div className="card shadow-lg border-0 p-3 w-100" style={{ height: "100%" }}>
                <div className="position-relative">

                  <img
                    src={item.url || item.thumbnailUrl}
                    className="card-img-top rounded"
                    alt={item.title}
                    style={{ height: "300px", objectFit: "cover" }}
                    onError={(e) =>
                      (e.target.src =
                        "https://via.placeholder.com/600/92c952") 
                    }
                  />
                
                  <span
                    className="badge bg-success position-absolute top-0 end-0 m-2 p-2"
                    style={{
                      fontSize: "14px",
                      borderRadius: "10px",
                    }}
                  >
                    ${Math.floor(Math.random() * 4000) + 1000}
                  </span>
                </div>

                <div className="card-body text-center">
                  
                  <h5 className="card-title text-dark fw-bold fs-3">
                    {item.title.length > 30
                      ? item.title.substring(0, 30) + "..."
                      : item.title}
                  </h5>

                  <p className="card-text text-muted">
                    {expanded[item.id]
                      ? "Paris is synonymous with the finest things that culture can offer – art, fashion, food, literature, and ideas. This tour will immerse you in the heart of the city, visiting famous landmarks, exquisite restaurants, and hidden gems that only locals know."
                      : "Paris is synonymous with the finest things that culture can offer – art, fashion, food, literature, and ideas..."}
                    <span
                      className="text-success fw-bold"
                      style={{ cursor: "pointer" }}
                      onClick={() => toggleReadMore(item.id)}
                    >
                      {expanded[item.id] ? " Show Less" : " Read More"}
                    </span>
                  </p>

                  <button
                    onClick={() => handleDelete(item.id)}
                    className="btn btn-danger w-100 py-2"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
