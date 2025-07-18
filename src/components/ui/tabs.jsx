import { useState } from "react";

export function Tabs({ defaultValue, children, className = "" }) {
  const [active, setActive] = useState(defaultValue);

  return (
    <div className={className}>
      {React.Children.map(children, (child) =>
        child.type.displayName === "TabsList"
          ? React.cloneElement(child, { active, setActive })
          : child.type.displayName === "TabsContent" && child.props.value === active
          ? child
          : null
      )}
    </div>
  );
}

export function TabsList({ children, active, setActive, className = "" }) {
  return (
    <div className={className}>
      {React.Children.map(children, (child) =>
        React.cloneElement(child, { active, setActive })
      )}
    </div>
  );
}
TabsList.displayName = "TabsList";

export function TabsTrigger({ children, value, active, setActive }) {
  return (
    <button
     className={`p-2 border-b-2 ${active === value ? "border-blue-600 text-blue-600" : "border-transparent"}`}

      onClick={() => setActive(value)}
    >
      {children}
    </button>
  );
}
TabsTrigger.displayName = "TabsTrigger";

export function TabsContent({ children }) {
  return <div>{children}</div>;
}
TabsContent.displayName = "TabsContent";
