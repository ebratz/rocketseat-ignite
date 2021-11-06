interface RepositoryItemProps {
  repository: {
    name: string;
    full_name: string;
    html_url: string;
  }
}

export function RepositoryItem(props: RepositoryItemProps) {
  return(
    <li>
      <strong>{props?.repository.name ?? 'default'}</strong>
      <p>{props?.repository.full_name}</p>
      <a href={props?.repository.html_url}>Acessar Repositório</a>
    </li>
  )
}