export function RepositoryItem(props) {
  return(
    <li>
      <strong>{props?.repository.name ?? 'default'}</strong>
      <p>{props?.repository.full_name}</p>
      <a href={props?.repository.html_url}>Acessar Repositório</a>
    </li>
  )
}