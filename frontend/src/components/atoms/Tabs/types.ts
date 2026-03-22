export type TabsVariant = "horizontal" | "vertical";

export type TabsProps<T extends string> = {
    tabs: Record<T, string>;
    activeTab: T;
    onChange: (tab: T) => void;
    variant?: TabsVariant;
}