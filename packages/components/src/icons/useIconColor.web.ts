// CSS resolves `currentColor` from the surrounding text color; .native can't.
export function useIconColor(color: string | undefined): string {
  return color ?? 'currentColor'
}
