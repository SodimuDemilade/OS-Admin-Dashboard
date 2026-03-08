export type AppConfig = {
    baseUrlDev: string;
    baseUrlProd: string;
    stage: "Dev" | "Prod",
}
export const appConfig: AppConfig = {
    baseUrlDev: 'https://jsonplaceholder.typicode.com',
    baseUrlProd: 'https://jsonplaceholder.typicode.com',
    stage: "Dev",
}
