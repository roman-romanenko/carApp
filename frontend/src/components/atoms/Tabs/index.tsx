import { useMemo } from "react";
import type {TabsProps} from "./types.ts";
import Button from "../Button";

const Tabs = <T extends string>({
    tabs,
    activeTab,
    onChange,
    variant = "horizontal"
}: TabsProps<T>) => {
    const entries = Object.entries(tabs) as [T, string][];

    const activeIndex = useMemo(
        () => entries.findIndex(([key]) => key === activeTab),
        [activeTab, entries]
    );

    return (
        <div className={`tabs tabs-${variant}`}>
            {entries.map(([tab, label]) => (
                <Button
                    key={tab}
                    className={activeTab === tab ? "active" : ""}
                    onClick={() => onChange(tab)}
                    text={label}
                />
            ))}

            <div
                className="tab-indicator"
                style={
                    variant === "horizontal"
                        ? { transform: `translateX(${activeIndex * 100}%)`, width: `calc(100% / ${entries.length}` }
                        : { transform: `translateY(${activeIndex * 100}%)`, height: `calc(100% / ${entries.length}` }
                }
            />
        </div>
    );
};

export default Tabs;
