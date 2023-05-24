import { gql } from "@apollo/client";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import { type ActionFunction } from "@remix-run/node";
import { useActionData } from "@remix-run/react";
import { client } from "~/lib/apollo";

const mutation = gql`
  mutation ($senha: String!, $usuario: String!) {
    Login(senha: $senha, usuario: $usuario) {
      mensagem
      token
    }
  }
`;

export const action: ActionFunction = async ({ request }) => {
  const params = Object.fromEntries(await request.formData());

  const { data: loginData } = await client.mutate({
    mutation,
    variables: {
      usuario: params.login,
      senha: params.password,
    }
  })

  return loginData?.Login;
}

export default function AuthMessage() {
  const data = useActionData();
  return (
    <form method="post" style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', gap: '15px', alignItems: "center", justifyContent: "center" }}>
      <div>
        <TextField id="txtLogin-basic" label="Login" variant="outlined" type="text" name="login" />
      </div>
      <div>
        <TextField id="txtPassword" label="Senha" variant="outlined" type="text" name="password" />
      </div>
      <Button type="submit" variant="outlined">Logar</Button>
      <div>
        <p>{!data?.token ? "Login não efetuado" : "Login realizado com sucesso!"}</p>
      </div>
    </form>
  );
}