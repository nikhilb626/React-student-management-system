import React,{createContext,useReducer,useEffect} from "react";
import AppReducer from "./appReducer";



// initial state
const initialState={
    studentData:[]
} 


// create context
export const GlobalContext=createContext(initialState);


// provider component
export const GlobalProvider=({children})=>{
    const [state,dispatch]=useReducer(AppReducer,initialState,()=>{
        const localData=localStorage.getItem("student");
        return localData?JSON.parse(localData):[];
    });

    useEffect(()=>{
        localStorage.setItem("student",JSON.stringify(state));
    },[state]);


    function addStudent(student){
        dispatch({
            type:"ADD_STUDENT",
            payload:student
        });
    }

    function updateStudent(student){
        dispatch({
            type:"UPDATE_STUDENT",
            payload:student
        });
    }


    function deleteStudent(id){
        dispatch({
            type:"DELETE_STUDENT",
            payload:id
        })
    }


    return(
        <GlobalContext.Provider value={{studentData:state.studentData,addStudent,deleteStudent,updateStudent}}>
            {children}
        </GlobalContext.Provider>
    )


}



