import { gql } from "@apollo/client";
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { client } from "~/lib/apollo";

type Authentication = {
  status: string;
};

type LoaderData = {
  data: Authentication;
};

const query = gql`
  query {
    Authentication(token: "f163701e-b614-48b9-87fa-1f3a624b8153") {
      status
    }
  }
`;

export const loader: LoaderFunction = async ({ request, params }) => {
  const { data } = await client.query({
    query,
  });

  return json<LoaderData>({ data: data.Authentication });
};

export default function AuthMessage() {
  const { data } = useLoaderData();
  const { status } = data;

  console.log("teste ", JSON.stringify(data.status))
  return (
    <main>
      {
        status === 200 && "Usuário autenticado"
      }
      {
        status !== 200 && "Usuário não autenticado"
      }
    </main>
  );
}