import React,{useState,useContext} from 'react';
import {GlobalContext} from "../context/students/globalState";
import {Link,useNavigate} from 'react-router-dom';

const Home = () => {


    let navigate=useNavigate();


    const [name,setName]=useState("");
    const [roll,setRoll]=useState("");
    const [email,setEmail]=useState("");
    const [year,setYear]=useState("");
    const [search,setSearch]=useState("");
    const [editMode,setEditMode]=useState(false);
    const [url,setUrl]=useState("");



    // message state
    const [error,setError]=useState("error");
    const [updatemsg,setUpdatemsg]=useState("updateclose");
    const [addmsg,setAddmsg]=useState("addclose");



    const {addStudent}=useContext(GlobalContext);
    const {studentData}=useContext(GlobalContext);
    const {deleteStudent}=useContext(GlobalContext);
    const {updateStudent}=useContext(GlobalContext);

    const handleSubmit=(e)=>{
        e.preventDefault();

        if(url!==""){

            const changedStudent={
                id:url,
                name,
                roll,
                email,
                year
            }
    
    
            if(name==="" || roll==="" || email==="" || year===""){
                setError("error open");
            }else{
            updateStudent(changedStudent);
            setEditMode(false);
            setUpdatemsg("updateclose open");

            setName("");
            setRoll("");
            setEmail("");
            setYear("");
            setError("error");
            setUrl("");

            navigate("/");
            }

        }else{
            const newStudent={
                id:Math.floor(Math.random()*1000000),
                name,
                roll,
                email,
                year
            }
    
    
            if(name==="" || roll==="" || email==="" || year===""){
                setError("error open")
            }else{
            addStudent(newStudent);
            setAddmsg("addclose open");

            setName("");
            setRoll("");
            setEmail("");
            setYear("");
            setError("error");
            }
    
        }

     

      
        
    }


    const handleUpdate=(id)=>{
            const std=studentData.filter((std)=>{
                return std.id===id;
            })

            console.log(std);
            setName(std[0].name);
            setRoll(std[0].roll);
            setEmail(std[0].email);
            setYear(std[0].year);

        setEditMode(true);
        setUrl(id);
        
    }


    const closeHandle=()=>{
            setError("error");
    }


    const closeHandle1=()=>{
        setAddmsg("addclose")
}

const closeHandle2=()=>{
    setUpdatemsg("updateclose");
}
 



  




    return (
        <div className="container">
        <div className="message_container">
            <div className={error}>please fill all the value first <span onClick={closeHandle}>X</span></div>
            <div className={addmsg}>student successfully added <span onClick={closeHandle1}>X</span></div>
            <div className={updatemsg}>data successfully updated <span onClick={closeHandle2}>X</span></div>
        </div>
           <h1>student management system</h1>
            <div className="search_container">
                <input type="text" placeholder="Search Student by name" value={search} onChange={(e)=>setSearch(e.target.value)} />
            </div>
                       <table  id="customers">
                           <tbody>
                               <tr>
                                   <th>Student</th>
                                   <th>Roll No.</th>
                                   <th>Email</th>
                                   <th>year</th>
                                   <th>Actions</th>
                               </tr>

                            <tr>
                               <td> <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter name" /></td>
                               <td> <input type="text" value={roll} onChange={(e) => setRoll(e.target.value)} placeholder="Enter roll number" /></td>
                               <td> <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter student email" /></td>
                              <td>  <input type="text" value={year} onChange={(e) => setYear(e.target.value)} placeholder="Enter batch year" /></td>
                              <td><button className="btn" onClick={handleSubmit}>{editMode?"update":"add student"}</button></td>
                            </tr>
                            {
                                studentData.filter((val)=>{
                                    if(search===""){
                                        return val
                                    }else if(val.name.toLowerCase().includes(search.toLowerCase())){
                                        return val
                                    }
                                }).map(std=>{
                                    return(
                                        <tr>
                                        <td>{std.name}</td>
                                        <td>{std.roll}</td>
                                        <td>{std.email}</td>
                                        <td>{std.year}</td>
                                        <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        <Link to={`/edit/${std.id}`}>
                                    <button className="info" onClick={()=>handleUpdate(std.id)} ><i class="fas fa-edit"></i></button></Link>&nbsp;&nbsp;<button className="danger" onClick={()=>deleteStudent(std.id)} ><i class="fas fa-trash-alt"></i></button></td>
                                        </tr>
                                    )
                                })
                            }

                       
                           </tbody>
                       </table>
        </div>
    )
}

export default Home;
