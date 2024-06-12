import { ReactNode } from "react";

export interface MainLayoutProps {
    children: ReactNode;
}

export interface TncProps {
    // open: boolean,
    onAccept: (e: React.MouseEvent<HTMLElement>) => void
}
