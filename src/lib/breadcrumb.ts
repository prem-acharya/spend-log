import { usePathname } from "next/navigation";
import { useMemo } from "react";

interface BreadcrumbItem {
  label: string;
  path: string;
  isCurrentPage?: boolean;
  isLoading?: boolean;
}

const dynamicLabelsCache: Record<string, string> = {};

export const setDynamicLabel = (segment: string, id: string, label: string) => {
  dynamicLabelsCache[`${segment}/${id}`] = label;
};

export function useBreadcrumb(): BreadcrumbItem[] {
  const pathname = usePathname();

  const segments = useMemo(
    () => pathname.split("/").filter(Boolean),
    [pathname]
  );

  return useMemo(() => {
    return segments.reduce<BreadcrumbItem[]>((acc, segment, index) => {
      const path = `/${segments.slice(0, index + 1).join("/")}`;
      const pathSegment = segments.slice(0, index + 1).join("/");
      let label = segment.charAt(0).toUpperCase() + segment.slice(1);
      let isLoading = false;

      const employeeMatch = pathSegment.match(/^employee\/([^/]+)$/);
      if (employeeMatch) {
        const id = employeeMatch[1];
        const cachedLabel = dynamicLabelsCache[`employee/${id}`];
        if (cachedLabel) {
          label = cachedLabel;
        } else {
          isLoading = true;
        }
      }

      acc.push({
        label,
        path,
        isCurrentPage: index === segments.length - 1,
        isLoading,
      });

      return acc;
    }, []);
  }, [segments]);
}
