import { useState } from "react";
import Formexam from "./components/task react15";



function App() {
    const [users, setUsers] = useState([]);

    const addUser = (user) => {
        setUsers([...users, { ...user, id: users.length + 1 }]);
        console.log("User Registered:", user);
    };

    return (
        <div className="container-fluid mt-5">
            <div className="row justify-content-center">
                <div className="col-12"> 
                  <Formexam onSubmit={addUser}/>
                </div>
            </div>
        </div>
    );
}

export default App;
