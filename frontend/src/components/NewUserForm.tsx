import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react"; 
import { useForm } from "react-hook-form";

// Mantenha o restante do código conforme as imagens 412458 e 412441
const GET_USER = gql`
  query GetUsers {
    users {
      id
      name
    }
  }
`;

const CREATE_USER = gql`
  mutation CreateUser($name: String!) {
    createUser(name: $name) {
      id
      name
    }
  }
`;

type FormData = {
  name: string;
};

export function NewUserForm() {
  const [createUser, { loading, error }] = useMutation(CREATE_USER, {
    refetchQueries: [
    { query: GET_USER } // Atualiza a lista sempre que esta mutação rodar com sucesso
  ], // Atualiza a lista da imagem 412441
  });
  
  const { register, handleSubmit, reset } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    if (!data.name) return; // Validação da imagem 4133fb

    try {
      const response = await createUser({
        variables: { name: data.name }
      });
      console.log(response.data); // Log da imagem 412458
      
      reset(); 
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input 
        {...register("name", { required: true })} 
        placeholder="Nome do usuário"
        disabled={loading}
      />
      <button type="submit" disabled={loading}>
        {loading ? "Enviando..." : "Enviar"}
      </button>
      {error && <p style={{color: 'orange'}}>Erro ao salvar</p>}
    </form>
  );
}