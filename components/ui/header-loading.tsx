import Logo from './logo';

export default function HeaderLoading() {
  return (
    <header className="fixed top-2 z-30 w-full md:top-6">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="relative flex h-14 items-center justify-between gap-3 rounded-2xl bg-white/90 px-3 shadow-lg shadow-black/[0.03] backdrop-blur-sm before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(var(--color-gray-100),var(--color-gray-200))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)]">
          
          {/* Logo */}
          <div className="flex items-center">
            <Logo />
          </div>

          {/* Skeleton Navigation */}
          <nav className="hidden md:flex items-center gap-1 rounded-xl bg-gray-50/50 p-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <div 
                key={i} 
                className="h-9 w-20 animate-pulse rounded-lg bg-gray-200"
              />
            ))}
          </nav>

          {/* Skeleton Actions */}
          <div className="flex items-center gap-2">
            <div className="hidden md:block h-9 w-16 animate-pulse rounded-lg bg-gray-200" />
            <div className="h-9 w-20 animate-pulse rounded-lg bg-gray-200" />
          </div>
        </div>
      </div>
    </header>
  );
}