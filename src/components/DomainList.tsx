interface DomainListProps {
  id: string;
  title: string;
  domains: string[];
  onDomainClick: () => void;
}

export default function DomainList({ id, title, domains, onDomainClick }: DomainListProps) {
  return (
    <section id={id} className="domain-list">
      <h5><span>{title}</span></h5>
      <hr />
      <ul>
        {domains.map((domain, index) => (
          <li key={index} onClick={onDomainClick}>
            {domain}
          </li>
        ))}
      </ul>
    </section>
  );
}
