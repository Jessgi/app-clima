import { useState } from "react";
import { Search } from "lucide-react";

interface SearchBarProps {
  onSearch: (city: string) => void;
  isLoading: boolean;
}

const SearchBar = ({ onSearch, isLoading }: SearchBarProps) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
      <div className="glass-card flex items-center gap-3 rounded-full px-5 py-3 transition-all focus-within:ring-2 focus-within:ring-primary/50 focus-within:glow-accent">
        <Search className="w-5 h-5 text-muted-foreground shrink-0" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar cidade... ex: Olinda"
          className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground font-body"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !query.trim()}
          className="bg-primary text-primary-foreground px-4 py-1.5 rounded-full text-sm font-medium font-display transition-all hover:brightness-110 disabled:opacity-50"
        >
          {isLoading ? "..." : "Buscar"}
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
