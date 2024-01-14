import http from "./index";

const login = (data)=> {
    
return http.post("/",data);}

const saveScore = (id,data) => {
    // Envoyer le score à l'API pour sauvegarde
    console.log('Saving score to the database:', );
    console.log('Calling saveScore with userId:', id, 'and data:', data);

    return http.put(`/${id}`, data);
  };
const deleteUser=(id)=> {
    return http.delete(`/${id}`);
}
const UserService ={
    login,    
    saveScore, 
    deleteUser
};

export default UserService;
