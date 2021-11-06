import { RepositoryItem } from "./RepositoryItem";

import '../styles/repositories.scss'
import { useEffect, useState } from "react";

interface Repository {
  name: string;
  full_name: string;
  html_url: string;
}

export function RepositoryList() {
  const [repositories, setRepositories] = useState<Repository[]>([]);

  useEffect(() => {
    fetch('https://api.github.com/users/ebratz/repos')
      .then(response => response.json())
      .then(data => setRepositories(data))
  },[])

  return (
    <section className="repository-list">
      <h1>Lista de Repositórios</h1>
      <ul>
        {repositories.map(repository => (
        <RepositoryItem key={repository.name} repository={repository} />
        ))}
      </ul>
    </section>
  )
}