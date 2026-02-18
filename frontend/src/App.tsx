import { gql } from "@apollo/client"
import { useQuery } from "@apollo/client/react"
import { NewUserForm } from "./components/NewUserForm";

type User = {
  id: string;
  name: string;
}

export const GET_USER =  gql `
        
  query{
    users{
      id 
      name
  }
  
  }
` 
function App() {
  const {data, loading} = useQuery<{users: User[]}>(GET_USER)

  if (loading){
    return <p>Carregando...</p>
  }
  
  return(
    <div>
    <ul>
      {data?.users.map(user => <li key={user.id}>{user.name}</li>)}
    </ul>
    <NewUserForm/>
    </div>
  )
}
export default App
