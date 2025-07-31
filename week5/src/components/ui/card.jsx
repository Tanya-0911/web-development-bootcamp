export function Card({ className, children }) {
  return <div className={`bg-white ${className}`}>{children}</div>;
}

export function CardContent({ children }) {
  return <div className="p-4">{children}</div>;
}
