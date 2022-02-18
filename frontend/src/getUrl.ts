export default function getUrl(): string {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
        return "http://localhost:8080";
    } else {
        return "";
    }
}
