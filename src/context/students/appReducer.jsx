export default (state,action)=>{
    switch(action.type){

    case "ADD_STUDENT":
        return {
            ...state,
            studentData:[action.payload,...state.studentData]
        }
    case "DELETE_STUDENT":
        return{
            ...state,
            studentData:state.studentData.filter(studentData=>studentData.id!==action.payload)
        }
    case "UPDATE_STUDENT":
        const updatedData=action.payload;

        const updatedStudents=state.studentData.map(
            student=>{
                if(student.id===updatedData.id){
                    return updatedData;
                }
                return student;
            }
        );

        return{
            ...state,
            studentData:updatedStudents
        };
  
        default:
            return state;
    }
}