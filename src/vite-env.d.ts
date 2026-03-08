/// <reference types="vite/client" />

declare module "*.png" {
    const src: string;
    export default src;
}

declare module "*.jpg" {
    const src: string;
    export default src;
}

declare module "*.jpeg" {
    const src: string;
    export default src;
}

// declare module "*.svg" {
//     const src: string;
//     export default src;
// }

declare module "*.svg" {
    import * as React from "react";
    const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
    export default ReactComponent;
}
