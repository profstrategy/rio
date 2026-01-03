// ActivityTableSkeleton.tsx
export const ActivityTableSkeleton = ({ rows = 10 }) => {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className="h-12 rounded-xl animate-pulse"
          style={{
            background:
              "linear-gradient(135deg, rgba(184,235,254,0.15), rgba(56,189,248,0.08))",
            border: "1px solid rgba(56,189,248,0.2)",
          }}
        />
      ))}
    </div>
  )
}
